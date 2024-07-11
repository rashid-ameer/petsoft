"use client";
import { Pet, SelectedPetId } from "@/lib/types";
import { createContext, useState } from "react";

type ContextProps = {
  pets: Pet[];
  selectedPetId: SelectedPetId;
  selectedPet: Pet | undefined;
  noOfPets: number;
  handleSelectedPetId: (id: string) => void;
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

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        handleSelectedPetId,
        selectedPet,
        noOfPets,
      }}>
      {children}
    </PetContext.Provider>
  );
}
export default PetContextProvider;
