"use server";

import prisma from "@/lib/db";
import { PetEssentials } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function addPet(pet: PetEssentials) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    await prisma.pet.create({
      data: pet,
    });
  } catch (err) {
    return {
      success: false,
      message: "Could not add pet",
    };
  }

  revalidatePath("/app", "layout");
  return {
    success: true,
    message: "Added pet successfully",
  };
}

export async function editPet(petId: string, pet: PetEssentials) {
  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: pet,
    });
  } catch (err) {
    return {
      success: false,
      message: "Could not edit pet",
    };
  }

  revalidatePath("/app", "layout");
  return {
    success: true,
    message: "Updated pet successfully",
  };
}

export async function deletePet(petId: string) {
  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });
  } catch (err) {
    return {
      success: false,
      message: "Could not delete pet",
    };
  }

  revalidatePath("/app", "layout");
  return {
    success: true,
    message: "Deleted pet successfully",
  };
}
