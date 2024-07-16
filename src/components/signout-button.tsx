"use client";
import { logout } from "@/actions/actions";
import { Button } from "@/components/ui/button";

function SignoutButton() {
  return <Button onClick={async () => await logout()}>Signout</Button>;
}
export default SignoutButton;
