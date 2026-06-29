import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/Mumburi_logo.png";
import Order_Icon from "../../public/Order_Icon.png";
import "../globals.css";

const Navber = () => {
  return (
    <>
      <div className="w-full h-20 border-b-2 flex justify-between flex-row p-1">
        <div className="h-full w-[16%] flex justify-center items-center">
          <Link href={"/"}>
            <Image
              src={Logo}
              alt="MumburiLogo"
              priority
              className="h-[80%] w-14 rounded-full object-cover bg-center bg-no-repeat cursor-pointer"
            />
          </Link>
        </div>
        <ul className="hidden md:flex gap-6 justify-center items-end pb-2 navsupport">
          <li className="transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110">
            Home
          </li>
          <li className="transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110">
            Stack
          </li>
          <li className="transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110">
            Our Story
          </li>
          <li className="transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110">
            Our Craft
          </li>
          <li className="transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110">
            Stories
          </li>
          <li className="transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110">
            Contact
          </li>
        </ul>
        <div className="h-full w-[15%] flex justify-center items-center">
          <Link href={"/order"}>
            <Image
              src={Order_Icon}
              alt="orderIcon"
              priority
              className="object-cover bg-center bg-no-repeat cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navber;
