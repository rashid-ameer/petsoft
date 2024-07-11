"use client";
import { usePetContext } from "@/lib/hooks";

function Stats() {
  const { noOfPets } = usePetContext();
  return (
    <section className="text-center">
      <p className="text-2xl font-bold">{noOfPets}</p>
      <p className="opacity-80">Current Guests</p>
    </section>
  );
}
export default Stats;
