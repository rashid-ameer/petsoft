import "server-only";

import { auth } from "@/lib/auth-edge";
import { redirect } from "next/navigation";

export async function checkAuth() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return session;
}
