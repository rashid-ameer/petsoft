import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function extractFormDataAndFormat(formData: FormData): PetEssentials {
//   const pet = {
//     name: formData.get("name") as string,
//     ownerName: formData.get("ownerName") as string,
//     imageUrl:
//       (formData.get("imageUrl") as string) ||
//       "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
//     age: parseInt(formData.get("age") as string),
//     notes: formData.get("notes") as string,
//   };

//   return pet;
// }

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
