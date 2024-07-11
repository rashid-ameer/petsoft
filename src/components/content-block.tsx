type Props = {
  children: React.ReactNode;
};
function ContentBlock({ children }: Props) {
  return (
    <div className="bg-[#f7f8fa] shadow-sm rounded-md overflow-hidden w-full h-full">
      {children}
    </div>
  );
}
export default ContentBlock;
