"use client";
import { logout } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

function SignoutButton() {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await logout();
        })
      }>
      Signout
    </Button>
  );
}
export default SignoutButton;
