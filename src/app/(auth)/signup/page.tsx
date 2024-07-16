import { AuthForm, H1 } from "@/components";
import Link from "next/link";

function Signup() {
  return (
    <main>
      <H1 className="text-center mb-4">Signup</H1>

      <AuthForm type="signup" />

      <p className="text-sm text-zinc-500 mt-4">
        Already have an account?
        <Link
          href="/login"
          className="ml-2 font-medium">
          Login
        </Link>
      </p>
    </main>
  );
}
export default Signup;
