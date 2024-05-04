import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useGetMyUser } from "@/api/MyUserApi";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();
  const { currentUser} = useGetMyUser();
  console.log(currentUser?.usertype);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-dark_color gap-2">
        <CircleUserRound className="text-dark_color" />
        {user?.name}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
        {currentUser?.usertype === "entrepreneur" && (
        <Link
          to="/manage-restaurant"
          className="flex bg-white items-center font-bold hover:text-dark_color"
        >
          My Restaurant
        </Link>
      )}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/user-profile" className="font-bold hover:text-dark_color">
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            className="flex flex-1 font-bold bg-dark_color"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
