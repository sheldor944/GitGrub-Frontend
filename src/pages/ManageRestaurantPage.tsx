import { useGetInventory } from "@/api/InventoryApi";
import {
  useAddEmployee,
  useAddInventory,
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import InventoryTable from "@/components/InventoryTable";
import OrderItemCard from "@/components/OrderItemCard";
import SalesChart from "@/components/SalesChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmployeeProfileForm from "@/forms/employee-profile-form/EmployeeProfileForm";
import ManageInvetory from "@/forms/manage-restaurant-form/ManageInvetory";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();
  const { orders } = useGetMyRestaurantOrders();
  const { addInventory, isLoading } = useAddInventory();
  const { addEmployee, isLoading: isEmployeeLoading } = useAddEmployee();

  const isEditing = !!restaurant;

  return (
    <Tabs defaultValue="orders"  >
      <div className="bg-gray-50 rounded-lg">
        <TabsList className="grid-container h-auto px-2">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
          <TabsTrigger value="manage-inventory">Manage Inventory</TabsTrigger>
          <TabsTrigger value="employee-profile">Manage Employees</TabsTrigger>
          <TabsTrigger value="reports">Sales Report</TabsTrigger>

        </TabsList>
      </div>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
      <TabsContent value="manage-inventory" className="space-y-5 bg-gray-50 p-10 rounded-lg">
        <ManageInvetory
          onAdd={addInventory}
          isLoading={isLoading}
          buttonText="Add Item"
        >

        </ManageInvetory>
        <InventoryTable>

        </InventoryTable>
      </TabsContent>
      <TabsContent value="employee-profile" className="space-y-5 bg-gray-50 p-10 rounded-lg" >
        <EmployeeProfileForm 
          onSave={addEmployee}
          isLoading={isEmployeeLoading}
        />
      </TabsContent>
      <TabsContent value="reports" className="space-y-5 bg-gray-50 p-10 rounded-lg">
        <SalesChart
        
        orders={orders}>

        </SalesChart>
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;