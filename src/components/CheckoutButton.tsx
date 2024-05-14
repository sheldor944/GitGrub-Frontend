import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";
import { useState, useEffect } from 'react';
import React from "react";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

const dummy: UserFormData = {
  name: "John Doe",
  addressLine1: "Dine-In",
  city: "dine-In",
  usertype : "User",
  country: "Country",
  email: "john@example.com"
};

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

  // Ensure dummy data is set when currentUser is loaded
  useEffect(() => {
    if (currentUser) {
      dummy.name = currentUser.name || currentUser.email || "John Doe";
      dummy.email = currentUser.email || "john@example.com";
    }
  }, [currentUser]);

  const [deliveryOption, setDeliveryOption] = useState("dineIn");

  const handleDeliveryOptionChange = (event) => {
    setDeliveryOption(event.target.value);
  };

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="bg-dark_color flex-1">
        Log in to check out
      </Button>
    );
  }

  if (isAuthLoading || isGetUserLoading || isLoading) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-dark_color flex-1">
          Go to checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <div>
          <p className="mb-4">Select an option:</p>
          <div className="flex mb-4">
            <input
              type="radio"
              id="dineIn"
              name="deliveryOption"
              value="dineIn"
              checked={deliveryOption === "dineIn"}
              onChange={handleDeliveryOptionChange}
            />
            <label htmlFor="dineIn" className="ml-2 mr-4">
              Dine-In
            </label>
            <input
              type="radio"
              id="delivery"
              name="deliveryOption"
              value="delivery"
              checked={deliveryOption === "delivery"}
              onChange={handleDeliveryOptionChange}
            />
            <label htmlFor="delivery" className="ml-2">
              Delivery
            </label>
          </div>
        </div>
        {deliveryOption === "delivery" ? (
          <UserProfileForm
            isDelivery={true}
            currentUser={currentUser}
            onSave={onCheckout}
            isLoading={isGetUserLoading}
            title="Confirm Delivery Details"
            buttonText="Continue to payment"
          />
        ) : (
          <Button type="submit" className="bg-dark_color" onClick={() => onCheckout(dummy)}>
            Continue to Payment
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;

// import { useAuth0 } from "@auth0/auth0-react";
// import { useLocation } from "react-router-dom";
// import { Button } from "./ui/button";
// import LoadingButton from "./LoadingButton";
// import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
// import UserProfileForm, {
//   UserFormData,
// } from "@/forms/user-profile-form/UserProfileForm";
// import { useGetMyUser } from "@/api/MyUserApi";

// type Props = {
//   onCheckout: (userFormData: UserFormData) => void;
//   disabled: boolean;
//   isLoading: boolean;
// };

// const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
//   const {
//     isAuthenticated,
//     isLoading: isAuthLoading,
//     loginWithRedirect,
//   } = useAuth0();

//   const { pathname } = useLocation();

//   const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

//   const onLogin = async () => {
//     await loginWithRedirect({
//       appState: {
//         returnTo: pathname,
//       },
//     });
//   };

//   if (!isAuthenticated) {
//     return (
//       <Button onClick={onLogin} className="bg-orange-500 flex-1">
//         Log in to check out
//       </Button>
//     );
//   }

//   if (isAuthLoading || !currentUser || isLoading) {
//     return <LoadingButton />;
//   }

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button disabled={disabled} className="bg-orange-500 flex-1">
//           Go to checkout
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
//         <UserProfileForm
//           currentUser={currentUser}
//           onSave={onCheckout}
//           isLoading={isGetUserLoading}
//           title="Confirm Deliery Details"
//           buttonText="Continue to payment"
//         />
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CheckoutButton;