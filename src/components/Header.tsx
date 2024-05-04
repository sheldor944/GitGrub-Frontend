import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Header = () => {
  return (
    <div className="bg-light_color border-b-2 border-b-dark_color py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src={"/logo.png"} className="max-h-20 max-w-auto relative justify-content " ></img>
          <Link
            to="/"
            className="text-5xl font-bold tracking-tight text-dark_color"
            // style={{ marginTop: '20px', marginLeft: '10px' }}
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
