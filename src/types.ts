export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
  usertype: string;
  imageUrl: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  searchingKeyWord:string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

export type Order = {
  totalPrice: number;
  _id: string;
  restaurant: Restaurant;
  user: User;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    name: string;
    addressLine1: string;
    city: string;
    email: string;
  };
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  restaurantId: string;
};

export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
export type EmployeeSearchResponse = {
  data: Employee;
};
export type Review = {
  user: string;
  restaurant: string;
  email: string;
  username: string;
  message: string;
  rating: number;
  ratingTime: Date;
};
export type Items = {
  itemName: string;
  availabeQuantity: number;
};
export type Employee={
  _id: string;
  restaurant: string;
  name:string;
  gender: string;
  role: string;
  email: string;
  phone: string;
  joiningDate : Date;
  shiftDuration : string;
  resigningDate : Date|undefined;
}