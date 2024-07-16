"use client";
import { addPet, deletePet, editPet } from "@/actions/actions";
import { Pet, PetEssentials, SelectedPetId } from "@/lib/types";
import { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

type ContextProps = {
  pets: Pet[];
  selectedPetId: SelectedPetId;
  selectedPet: Pet | undefined;
  noOfPets: number;
  handleSelectedPetId: (id: string) => void;
  handleCheckoutPet: (id: string) => Promise<void>;
  handleAddPet: (petData: PetEssentials) => Promise<void>;
  handleEditPet: (id: string, petData: PetEssentials) => Promise<void>;
};

type ProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

export const PetContext = createContext<ContextProps | null>(null);

function PetContextProvider({ data, children }: ProviderProps) {
  // state
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "ADD":
          return [...state, payload.pet];
        case "EDIT":
          return state.map((pet) =>
            pet.id === payload.id ? { ...pet, ...payload.pet } : pet
          );
        case "DELETE":
          return state.filter((pet) => pet.id !== payload.id);
        default:
          return state;
      }
    }
  );

  const [selectedPetId, setSelectedPetId] = useState<SelectedPetId>(null);

  // derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const noOfPets = optimisticPets.length;

  // event handlers
  const handleSelectedPetId = (petId: string) => {
    setSelectedPetId(petId);
  };

  const handleCheckoutPet = async (petId: string) => {
    setOptimisticPets({ action: "DELETE", payload: { id: petId } });
    await deletePet(petId);
    setSelectedPetId(null);
  };

  const handleAddPet = async (petData: PetEssentials) => {
    const pet = { id: Date.now().toString(), ...petData };

    setOptimisticPets({ action: "ADD", payload: { pet } });

    const result = await addPet(petData);
    if (!result.success) {
      toast.error(result.message);
    }
  };

  const handleEditPet = async (petId: string, petData: PetEssentials) => {
    setOptimisticPets({ action: "EDIT", payload: { id: petId, pet: petData } });
    const result = await editPet(petId, petData);
    if (!result.success) {
      toast.error(result.message);
    }
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        selectedPet,
        noOfPets,
        handleSelectedPetId,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
      }}>
      {children}
    </PetContext.Provider>
  );
}
export default PetContextProvider;
