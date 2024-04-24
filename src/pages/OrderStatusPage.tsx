import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();
  console.log("these are my orders at order status page ");
  if (orders && orders.length > 0) {
    console.log("got some order");
    const restaurantId = orders[0]['restaurant']['_id'];
    console.log(restaurantId);
    
    sessionStorage.removeItem(`cartItems-${restaurantId}`);

    // console.log(orders[0]);
  } else {
    console.log("No orders available.");
  }
  // const restaurantId = orders.restaurantId;

  if (isLoading) {
    return "Loading...";
  }

  if (!orders || orders.length === 0) {
    return "No orders found";
  }

  return (
    <div className="space-y-10">
      {orders.map((order) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
