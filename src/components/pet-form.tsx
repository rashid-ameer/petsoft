"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePetContext } from "@/lib/hooks";

type Props = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

function PetForm({ actionType, onFormSubmission }: Props) {
  const { handleAddPet, selectedPetId, selectedPet, handleEditPet } =
    usePetContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    if (actionType === "add") {
      handleAddPet(formData);
    } else if (actionType === "edit" && selectedPetId) {
      handleEditPet(selectedPetId, formData);
    }

    onFormSubmission();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          required
          defaultValue={actionType === "add" ? "" : selectedPet?.name}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="name">Owner Name</Label>
        <Input
          id="ownerName"
          type="text"
          name="ownerName"
          required
          defaultValue={actionType === "add" ? "" : selectedPet?.ownerName}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="name">Image Url</Label>
        <Input
          id="imageUrl"
          type="text"
          name="imageUrl"
          defaultValue={actionType === "add" ? "" : selectedPet?.imageUrl}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="name">Age</Label>
        <Input
          id="age"
          type="number"
          name="age"
          required
          defaultValue={actionType === "add" ? "" : selectedPet?.age}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          rows={3}
          name="notes"
          required
          defaultValue={actionType === "add" ? "" : selectedPet?.notes}
        />
      </div>

      <Button
        type="submit"
        className="flex ml-auto">
        {actionType === "add" ? "Add a new Pet" : "Submit"}
      </Button>
    </form>
  );
}
export default PetForm;
