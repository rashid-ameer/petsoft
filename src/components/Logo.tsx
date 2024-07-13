import Image from "next/image";
function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt=""
      width={50}
      height={50}
      priority
    />
  );
}
export default Logo;
