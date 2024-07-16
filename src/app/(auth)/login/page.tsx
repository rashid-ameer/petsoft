import { AuthForm, H1 } from "@/components";
import Link from "next/link";

function Login() {
  return (
    <main>
      <H1 className="text-center mb-4">Login</H1>

      <AuthForm type="login" />

      <p className="text-sm text-zinc-500 mt-4">
        No account yet?
        <Link
          href="/signup"
          className="ml-2 font-medium">
          Signup
        </Link>
      </p>
    </main>
  );
}
export default Login;
