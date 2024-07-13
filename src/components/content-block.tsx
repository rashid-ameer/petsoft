import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};
function ContentBlock({ children, className }: Props) {
  return (
    <div
      className={cn(
        "bg-[#f7f8fa] shadow-sm rounded-md overflow-hidden w-full h-full",
        className
      )}>
      {children}
    </div>
  );
}
export default ContentBlock;
