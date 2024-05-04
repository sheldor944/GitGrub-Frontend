import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetMyUser } from "@/api/MyUserApi";

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  console.log(currentUser?.usertype);
  // Wait until currentUser is defined
  if (isGetLoading || !currentUser) {
    return null; // Or any loading indicator
  }

  return (
    <>
      <Link
        to="/order-status"
        className="flex bg-white items-center font-bold hover:text-dark_color"
      >
        Order Status
      </Link>
      {currentUser.usertype === "entrepreneur" && (
        <Link
          to="/manage-restaurant"
          className="flex bg-white items-center font-bold hover:text-dark_color"
        >
          My Restaurant
        </Link>
      )}

      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-dark_color"
      >
        User Profile
      </Link>
      <Button
        onClick={() => logout()}
        className="flex items-center px-3 font-bold hover:bg-gray-500"
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;
