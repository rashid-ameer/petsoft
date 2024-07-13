"use client";
import { usePetContext, useSearchContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";

function PetList() {
  const { pets, handleSelectedPetId, selectedPetId } = usePetContext();
  const { searchQuery } = useSearchContext();

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ul className="bg-white border-b border-black/5">
      {filteredPets.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => handleSelectedPetId(pet.id)}
            className={cn(
              "flex h-[70px] w-full items-center gap-3 px-5 hover:bg-[#eff1f2] focus-visible:bg-[#eff1f2] transition focus:outline-none",
              {
                "bg-[#eff1f2]": selectedPetId === pet.id,
              }
            )}>
            <Image
              src={pet.imageUrl}
              alt={pet.name}
              width={45}
              height={45}
              className="size-[45px] rounded-full object-cover"
            />
            <p>{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
export default PetList;
