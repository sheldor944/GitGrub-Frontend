import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";


const Header = () => {
  return (
    <div className="border-b-2 border-b-orange-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src={"/logo.png"} className="max-h-9 max-w-auto relative justify-content " ></img>
          <Link
            to="/"
            className="text-3xl font-bold tracking-tight text-orange-500 "
          >
            GitGrub
          </Link>
        </div>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
