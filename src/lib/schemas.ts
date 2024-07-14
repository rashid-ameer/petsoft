import { z } from "zod";
import { DEFAULT_PET_IMAGE_URL } from "./constants";

export const petIdSchema = z.string().cuid();

export const petFormSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Name is required" }).max(50),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: "Owner Name is required" })
      .max(50),
    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({ message: "Invalid URL" }),
    ]),
    age: z.coerce
      .number()
      .int()
      .positive({ message: "Age must be greater than 0" })
      .max(999),
    notes: z.union([z.literal(""), z.string().trim().max(500)]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE_URL,
  }));
