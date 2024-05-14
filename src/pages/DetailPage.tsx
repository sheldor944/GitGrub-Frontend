import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import CheckoutButton from "@/components/CheckoutButton";
import ReviewForm from "@/forms/manage-restaurant-form/ReviewForm";
import ReviewItems from "@/components/ReviewItems";
import { useCreateReview } from "@/api/ReviewApi";
import { useCreateCheckoutSession } from "@/api/OrderApi";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Usage
async function example() {
  console.log('Start');
  await sleep(2000); // Sleep for 2 seconds
  console.log('End');
}

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading: restaurantIsLoading } = useGetRestaurant(restaurantId);
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession();
  const { createReview, isLoading } = useCreateReview(restaurantId);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];

  });

  // Animation for review form
  const { ref: refReviewForm, inView: inViewReviewForm } = useInView();
  const reviewFormVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5 } }
  };
  const { ref: refmenuItems, inView: inViewmenuItems } = useInView();
  const menuItemvairents = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } }
  };

  // Animation for review items
  const { ref: refReviewItems, inView: inViewReviewItems } = useInView();
  const reviewItemsVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 10, y: 0, transition: { duration: 1.5 } }
  };

  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }


    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };
    console.log(cartItems);
    const data = await createCheckoutSession(checkoutData);
    console.log(data);
    // example();
    window.location.href = data.url;
    //trying to remove clear cart item after checkout 
    // console.log("This is the cart Items");
    // console.log(cartItems);
  };

  if (restaurantIsLoading || !restaurant) {
    return 'Loading...';
  }


  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <div className="flex flex-col gap-4" ref={refmenuItems}>
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
              <motion.div
                variants={menuItemvairents}
                initial="hidden"
                animate={inViewmenuItems ? "visible" : "hidden"}
              >
                <MenuItem
                  key={menuItem._id}
                  menuItem={menuItem}
                  addToCart={() => addToCart(menuItem)}
                />
              </motion.div>
          ))}
          </div>
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
      <div ref={refReviewForm}>
        {/* Review Form Component */}
        <motion.div
          variants={reviewFormVariants}
          initial="hidden"
          animate={inViewReviewForm ? "visible" : "hidden"}
        >
          <ReviewForm
            currentuser={currentUser}
            onSave={createReview}
            isLoading={isLoading} // You need to define isLoading state in your component
            restaurantId={restaurantId || ''}
          />
        </motion.div>
      </div>
      <div ref={refReviewItems} className="bg-gray-50 rounded-lg">
        {/* Review Items Component */}
        <h2 className='text-2xl font-bold pl-3'>Reviews</h2>
        <motion.div
          variants={reviewItemsVariants}
          initial="hidden"
          animate={inViewReviewItems ? "visible" : "hidden"}
        >
          <ReviewItems restaurantId={restaurantId || ''} />
        </motion.div>
      </div>
    </div>
  );
};

export default DetailPage;