import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Pet } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractFormDataAndFormat(formData: FormData) {
  const pet = {
    name: formData.get("name") as string,
    ownerName: formData.get("ownerName") as string,
    imageUrl:
      (formData.get("imageUrl") as string) ||
      "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
    age: parseInt(formData.get("age") as string),
    notes: formData.get("notes") as string,
  };

  return pet;
}
