"use client";
import { createCheckoutSession } from "@/actions/actions";
import { Button } from "./ui/button";
import { useTransition } from "react";

function PaymentButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await createCheckoutSession();
        })
      }>
      Get Access for $299
    </Button>
  );
}
export default PaymentButton;
