"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { login, signup } from "@/actions/actions";
import { AuthFormButton } from "@/components";
import { useFormState } from "react-dom";

type Props = {
  type: "login" | "signup";
};

function AuthForm({ type }: Props) {
  const [signupError, dispatchSignup] = useFormState(signup, undefined);
  const [loginError, dispatchLogin] = useFormState(login, undefined);

  return (
    <form
      action={type === "login" ? dispatchLogin : dispatchSignup}
      className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          required
          maxLength={50}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          name="password"
          required
          maxLength={20}
        />
      </div>
      {signupError && (
        <p className="text-red-500 text-sm">{signupError.message}</p>
      )}
      {loginError && (
        <p className="text-red-500 text-sm">{loginError.message}</p>
      )}

      <AuthFormButton type={type} />
    </form>
  );
}
export default AuthForm;
