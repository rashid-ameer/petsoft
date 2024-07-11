"use client";

import { usePetContext } from "@/lib/hooks";
import { Pet } from "@/lib/types";
import Image from "next/image";

function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className="w-full h-full">
      {selectedPet ? (
        <>
          <TopContent pet={selectedPet} />
          <BodyContent pet={selectedPet} />
          <BottomContent pet={selectedPet} />
        </>
      ) : (
        <EmptyContent />
      )}
    </section>
  );
}

export default PetDetails;

type Props = {
  pet: Pet;
};

function EmptyContent() {
  return (
    <div className="flex items-center justify-center h-full">
      <h2 className="text-2xl font-medium text-center">
        Select a pet to view details
      </h2>
    </div>
  );
}

function TopContent({ pet }: Props) {
  return (
    <div className="flex items-center gap-x-5 px-8 py-5 border-b border-black/5">
      <Image
        src={pet.imageUrl}
        alt={pet.name}
        height={75}
        width={75}
        sizes="75px"
        className="rounded-full size-[75px] object-cover"
      />

      <h2 className="text-3xl font-semibold ">{pet.name}</h2>
    </div>
  );
}

function BodyContent({ pet }: Props) {
  return (
    <div className="flex items-center justify-around text-center py-10 px-5">
      <div>
        <h3 className="text-sm font-medium uppercase text-zinc-700">
          Owner Name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{pet.ownerName}</p>
      </div>

      <div>
        <h3 className="text-sm font-medium uppercase text-zinc-700">Age</h3>
        <p className="mt-1 text-lg text-zinc-800">{pet.age}</p>
      </div>
    </div>
  );
}

function BottomContent({ pet }: Props) {
  return <section className="bg-white px-10 py-5 mt-auto">{pet.notes}</section>;
}
