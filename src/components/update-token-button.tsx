"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function UpdateTokenButton() {
  const { data: session, update, status } = useSession();
  const router = useRouter();

  return (
    <Button
      disabled={status === "loading" || session?.user.hasAccess}
      onClick={async () => {
        await update(true);
        router.push("/app/dashboard");
      }}>
      Access Petsoft
    </Button>
  );
}
export default UpdateTokenButton;
