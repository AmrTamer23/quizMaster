import { userAuth } from "@/app/context/UserContext";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { MdKeyboardArrowDown } from "react-icons/md";
import UserDropDownMenu from "./ui/UserDropDown";

const NavBar = () => {
  const { user, userPoints, logOut } = userAuth();

  return (
    <div className="flex bg-gray-200 justify-between p-3 items-center">
      <span className="flex items-center gap-3">
        <Image src={logo} alt="logo" width={50} height={50} />
        <h3 className="text-2xl font-medium">Trivia Time</h3>
      </span>
      <UserDropDownMenu
        logOut={logOut}
        children={
          <span className="flex gap-3 items-center hover:cursor-pointer relative">
            <img
              src={user.photoURL}
              alt=""
              width={40}
              height={10}
              className="rounded-full h-fit"
            />
            <h3 className="text-lg font-medium">{user.displayName}</h3>
            <MdKeyboardArrowDown size={25} />
          </span>
        }
      />
    </div>
  );
};

export default NavBar;
