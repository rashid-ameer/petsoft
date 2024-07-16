"use server";

import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { petFormSchema, petIdSchema } from "@/lib/schemas";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { checkAuth } from "@/lib/server-utils";

// ---- user actions ----
export async function login(formData: FormData) {
  const authData = Object.fromEntries(formData.entries());

  await signIn("credentials", authData);
}

export async function signup(formData: FormData) {
  const hashedPassword = await bcrypt.hash(
    formData.get("password") as string,
    10
  );

  const user = {
    email: formData.get("email") as string,
    hashedPassword,
  };

  await prisma.user.create({
    data: user,
  });

  await signIn("credentials", formData);
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
// ---- pet actions ----
export async function addPet(pet: unknown) {
  sleep(2000);

  const session = await checkAuth();

  const validationResult = petFormSchema.safeParse(pet);

  if (!validationResult.success) {
    return {
      success: false,
      message: "Invalid form data",
    };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validationResult.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
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

  // authentication check
  const session = await checkAuth();

  // validation check
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

  // authorization check (user own pets)
  const petData = await prisma.pet.findUnique({
    where: {
      id: validationResultId.data,
    },
  });

  if (!petData) {
    return {
      success: false,
      message: "Pet not found!",
    };
  }

  if (petData.userId !== session.user.id) {
    return {
      success: false,
      message: "You are not authorized to edit this pet",
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

  // authentication check
  const session = await checkAuth();

  // validation check
  const validationResult = petIdSchema.safeParse(petId);
  if (!validationResult.success) {
    return {
      success: false,
      message: "Invalid pet ID",
    };
  }

  // authorization check (user own pets)
  const pet = await prisma.pet.findUnique({
    where: {
      id: validationResult.data,
    },
  });

  if (!pet) {
    return {
      success: "false",
      message: "Pet not found!",
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      success: false,
      message: "You are not authorized to delete this pet",
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
