import { Pet } from "@prisma/client";

export type { Pet };

export type PetEssentials = Omit<
  Pet,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

export type SelectedPetId = string | null;
