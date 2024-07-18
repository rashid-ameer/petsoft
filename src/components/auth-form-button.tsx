"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

type Props = {
  type: "login" | "signup";
};

function AuthFormButton({ type }: Props) {
  const { pending } = useFormStatus();
  return (
    <Button
      className="!mt-5"
      disabled={pending}>
      {type === "login" ? "Login" : "Sign Up"}
    </Button>
  );
}
export default AuthFormButton;
