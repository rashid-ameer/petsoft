import { Logo } from "@/components";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4 min-h-screen">
      <Logo />
      {children}
    </div>
  );
}
export default AuthLayout;
