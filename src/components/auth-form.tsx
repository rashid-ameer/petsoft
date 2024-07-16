import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login, signup } from "@/actions/actions";

type Props = {
  type: "login" | "signup";
};

function AuthForm({ type }: Props) {
  return (
    <form
      action={type === "login" ? login : signup}
      className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          name="password"
        />
      </div>

      <Button className="!mt-5">
        {type === "login" ? "Login" : "Sign Up"}
      </Button>
    </form>
  );
}
export default AuthForm;
