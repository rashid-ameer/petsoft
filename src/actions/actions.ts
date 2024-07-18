"use server";

import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { authSchema, petFormSchema, petIdSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { checkAuth } from "@/lib/server-utils";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// ---- user actions ----
export async function login(prevState: unknown, formData: unknown) {
  // check if the format is valid
  if (!(formData instanceof FormData)) {
    return {
      success: false,
      message: "Invalid form data",
    };
  }

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            message: "Incorrect email or password",
          };
      }
    }

    throw error; // next.js redirect error
  }
}

export async function signup(prevState: unknown, formData: FormData) {
  // check the format of data
  if (!(formData instanceof FormData)) {
    return {
      success: false,
      message: "Invalid form data",
    };
  }

  // validate formdata
  const authData = Object.fromEntries(formData.entries());
  const validationResult = authSchema.safeParse(authData);

  if (!validationResult.success) {
    return {
      success: false,
      message: "Invalid form data",
    };
  }

  const hashedPassword = await bcrypt.hash(validationResult.data.password, 10);

  const user = {
    email: validationResult.data.email,
    hashedPassword,
  };

  try {
    await prisma.user.create({
      data: user,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          success: false,
          message: "Email already exists.",
        };
      }
    }
  }

  await signIn("credentials", validationResult.data);

  return {
    success: true,
    message: "New user created successfully",
  };
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
// ---- pet actions ----
export async function addPet(pet: unknown) {
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

// ---- payment actions ----
export async function createCheckoutSession() {
  const session = await checkAuth();

  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    line_items: [
      {
        price: "price_1PdDzhKH010y8hla4x3TWEk6",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CANONICAL_URL}/payment?success=true`,
    cancel_url: `${process.env.CANONICAL_URL}/payment?cancelled=true`,
  });

  redirect(checkoutSession.url);
}
