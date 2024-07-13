"use client";
import { Pet, SelectedPetId } from "@/lib/types";
import { extractFormDataAndFormat } from "@/lib/utils";
import { createContext, useState } from "react";

type ContextProps = {
  pets: Pet[];
  selectedPetId: SelectedPetId;
  selectedPet: Pet | undefined;
  noOfPets: number;
  handleSelectedPetId: (id: string) => void;
  handleCheckoutPet: (id: string) => void;
  handleAddPet: (formData: FormData) => void;
  handleEditPet: (id: string, formData: FormData) => void;
};

type ProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

export const PetContext = createContext<ContextProps | null>(null);

function PetContextProvider({ data, children }: ProviderProps) {
  // state
  const [pets, setPets] = useState<Pet[]>(data || []);
  const [selectedPetId, setSelectedPetId] = useState<SelectedPetId>(null);

  // derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const noOfPets = pets.length;

  // event handlers
  const handleSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  const handleCheckoutPet = (id: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== selectedPetId));
    setSelectedPetId(null);
  };

  const handleAddPet = (formData: FormData) => {
    const petData = extractFormDataAndFormat(formData);
    const newPet: Pet = { id: Date.now().toString(), ...petData };

    setPets((prev) => [...prev, newPet]);
  };

  const handleEditPet = (id: string, formData: FormData) => {
    const petData = extractFormDataAndFormat(formData);
    const updatedPet: Pet = { id, ...petData };

    setPets((prev) => prev.map((pet) => (pet.id === id ? updatedPet : pet)));
  };

  return (
    <PetContext.Provider
      value={{
        pets,
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
