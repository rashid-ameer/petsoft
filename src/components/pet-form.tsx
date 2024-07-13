"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PetFormButton } from "@/components";
import { usePetContext } from "@/lib/hooks";
import { addPet, editPet } from "@/actions/actions";
import { toast } from "sonner";

type Props = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

function PetForm({ actionType, onFormSubmission }: Props) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  return (
    <form
      action={async (formData) => {
        onFormSubmission();

        if (actionType === "add") {
          await handleAddPet(formData);
        } else if (actionType === "edit" && selectedPet?.id) {
          handleEditPet(selectedPet.id, formData);
        }
      }}
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

      <PetFormButton actionType={actionType} />
    </form>
  );
}
export default PetForm;
