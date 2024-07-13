"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import PetForm from "./pet-form";
import { useState } from "react";

type Props = {
  children?: React.ReactNode;
  actionType: "add" | "edit" | "checkout";
  className?: string;
  onClick?: () => void;
};
function PetButton({ children, actionType, className, onClick }: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  if (actionType === "checkout") {
    return (
      <Button
        variant="secondary"
        className={cn(className)}
        onClick={onClick}>
        {children}
      </Button>
    );
  }

  return (
    <Dialog
      open={isFormOpen}
      onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button
            size="icon"
            className={cn(className)}>
            <PlusIcon className="size-6" />
          </Button>
        ) : (
          <Button variant="secondary">Edit</Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "add" ? "Add a new Pet" : "Edit Pet"}
          </DialogTitle>
        </DialogHeader>

        <DialogDescription>
          {actionType === "add"
            ? "Fill the form below to add a new pet"
            : "Fill the form below to edit the pet details"}
        </DialogDescription>

        <PetForm
          actionType={actionType}
          onFormSubmission={() => setIsFormOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
export default PetButton;
