import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";
import { useState } from 'react';
import React from "react";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();
  // adding dine in option
  const [deliveryOption, setDeliveryOption] = useState("Dine-In");

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
      <Button onClick={onLogin} className="bg-orange-500 flex-1">
        Log in to check out
      </Button>
    );
  }

  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton />;
  }




  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-orange-500 flex-1">
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
      {deliveryOption === "delivery" && (
        <UserProfileForm
          isDelivery = {true} 
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          title="Confirm Delivery Details"
          buttonText="Continue to payment"
        />
      )}
      {deliveryOption !== "delivery" && (
          <Button type="submit" className="bg-orange-500" >
          { "Continue to Payment" }
        </Button>
      )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
