"use server";

import prisma from "@/lib/db";
import { petFormSchema, petIdSchema } from "@/lib/schemas";
import { PetEssentials } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function addPet(pet: unknown) {
  sleep(2000);

  const validationResult = petFormSchema.safeParse(pet);
  if (!validationResult.success) {
    return {
      success: false,
      message: "Invalid form data",
    };
  }

  try {
    await prisma.pet.create({
      data: validationResult.data,
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

export async function editPet(petId: unknown, pet: unknown) {
  sleep(2000);

  const validationResultId = petIdSchema.safeParse(petId);
  if (!validationResultId.success) {
    return {
      success: false,
      message: "Invalid pet ID",
    };
  }

  const validationResultPet = petFormSchema.safeParse(pet);
  if (!validationResultPet.success) {
    return {
      success: false,
      message: "Invalid form data",
    };
  }

  try {
    await prisma.pet.update({
      where: {
        id: validationResultId.data,
      },
      data: validationResultPet.data,
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

export async function deletePet(petId: unknown) {
  sleep(2000);

  const validationResult = petIdSchema.safeParse(petId);
  if (!validationResult.success) {
    return {
      success: false,
      message: "Invalid pet ID",
    };
  }

  try {
    await prisma.pet.delete({
      where: {
        id: validationResult.data,
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
