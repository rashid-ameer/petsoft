import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};
function H1({ children, className }: Props) {
  return (
    <h1 className={cn("text-2xl font-medium text-white", className)}>
      {children}
    </h1>
  );
}
export default H1;
