"use client";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PetFormButton } from "@/components";
import { usePetContext } from "@/lib/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petFormSchema } from "@/lib/schemas";
import { DEFAULT_PET_IMAGE_URL } from "@/lib/constants";

type Props = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

type ReactHookFormFields = z.infer<typeof petFormSchema>;

function PetForm({ actionType, onFormSubmission }: Props) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<ReactHookFormFields>({
    resolver: zodResolver(petFormSchema),
    defaultValues:
      actionType === "edit"
        ? {
            name: selectedPet?.name,
            ownerName: selectedPet?.ownerName,
            imageUrl: selectedPet?.imageUrl,
            age: selectedPet?.age,
            notes: selectedPet?.notes,
          }
        : {},
  });

  const formAction = async () => {
    const isValidForm = await trigger();
    if (!isValidForm) return;

    onFormSubmission();

    let data = getValues();
    data.imageUrl = data.imageUrl || DEFAULT_PET_IMAGE_URL;

    if (actionType === "add") {
      await handleAddPet(data);
    } else if (actionType === "edit" && selectedPet?.id) {
      handleEditPet(selectedPet.id, data);
    }
  };

  return (
    <form
      action={formAction}
      className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="name">Owner Name</Label>
        <Input
          id="ownerName"
          {...register("ownerName")}
        />
        {errors.ownerName && (
          <p className="text-xs text-red-500">{errors.ownerName.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="name">Image Url</Label>
        <Input
          id="imageUrl"
          {...register("imageUrl")}
        />
        {errors.imageUrl && (
          <p className="text-xs text-red-500">{errors.imageUrl.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="name">Age</Label>
        <Input
          id="age"
          {...register("age")}
        />
        {errors.age && (
          <p className="text-xs text-red-500">{errors.age.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          {...register("notes")}
        />
        {errors.notes && (
          <p className="text-xs text-red-500">{errors.notes.message}</p>
        )}
      </div>

      <PetFormButton actionType={actionType} />
    </form>
  );
}
export default PetForm;
