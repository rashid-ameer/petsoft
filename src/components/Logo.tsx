import Image from "next/image";
import logo from "../../public/logo.svg";
function Logo() {
  return (
    <Image
      src={logo}
      alt=""
      priority
    />
  );
}
export default Logo;
