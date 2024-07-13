"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

type Props = {
  actionType: "add" | "edit";
};
function PetFormButton({ actionType }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      className="flex ml-auto">
      {actionType === "add" ? "Add a new Pet" : "Submit"}
    </Button>
  );
}
export default PetFormButton;
