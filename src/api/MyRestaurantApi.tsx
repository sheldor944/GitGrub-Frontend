import { Employee, EmployeeSearchResponse, Order, Restaurant, RestaurantSearchResponse } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Items } from '@/types';
import { EmployeeSearchState } from "@/forms/employee-profile-form/EmployeeProfileForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest
  );

  return { restaurant, isLoading };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    console.log("this is in the createRestaurant Request");
    console.log(restaurantFormData);
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }

    return response.json();
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant created!");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { createRestaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    console.log("this is in the updateRestaurant Request");
    console.log(restaurantFormData);

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response) {
      throw new Error("Failed to update restaurant");
    }

    return response.json();
  };

  const {
    mutate: updateRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant Updated");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { updateRestaurant, isLoading };
};

export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    "fetchMyRestaurantOrders",
    getMyRestaurantOrdersRequest
  );

  return { orders, isLoading };
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return response.json();
  };

  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyRestaurantOrder);

  if (isSuccess) {
    toast.success("Order updated");
  }

  if (isError) {
    toast.error("Unable to update order");
    reset();
  }

  return { updateRestaurantStatus, isLoading };
};
export const useGetInventory = () => {
  const { getAccessTokenSilently } = useAuth0();

  const useGetInventory = async (): Promise<Items[]> => {
    console.log("in the getInventory ");
    const accessToken = await getAccessTokenSilently();
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/my/restaurant/getInventory`,{
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });


      if (!response.ok) {
        console.log(error);
        throw new Error('Failed to fetch Inventory');
      }
      return response.json();
    } 
    catch (error) {
      throw new Error('Failed to fetch Inventory');
    }
  };

  const {
    data: items,
    isLoading,
    error,
  } = useQuery(['fetchInventory'], () => useGetInventory());

  if (error) {
    toast.error(error.toString());
  }

  return { items, isLoading };
};

export const useAddInventory = () => {
  const { getAccessTokenSilently } = useAuth0();
  
  //console.log("in the useCreateReview " + restaurantId);
  //console.log(reviewFormData)

  const addInventoryRequest = async (
    inventoryFormData : FormData
  ): Promise<Items> => {
    const accessToken = await getAccessTokenSilently();
     console.log(inventoryFormData)
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/addInventory`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inventoryFormData),
    });
    // console.log("this is the response from useCreateReview ");
    // console.log(response);
    // console.log(response.body);

    if (!response.ok) {
      throw new Error("Failed to create review");
    }

    return response.json();
  };


  const {
    mutate: addInventory,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(addInventoryRequest);
  if(isSuccess){
    toast.success("item Aded sucessfully"); 
    window.location.reload();
  }
  if(isError){
    toast.error("Failed to add Item");
  }

  return {
    addInventory,
    isLoading,
    isError,
    isSuccess,
  };

};
export const useUpdateInventoryItem = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyInventoryItem = async (
    itemRequest:Items
  ) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/updateInventory`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemRequest),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return response.json();
  };

  const {
    mutateAsync: updateInventoryRequest,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyInventoryItem);

  if (isSuccess) {
    toast.success("Inventory updated");
  }

  if (isError) {
    toast.error("Unable to update Inventory");
    reset();
  }

  return { updateInventoryRequest, isLoading };
};



export const useAddEmployee = () => {
  const { getAccessTokenSilently } = useAuth0();
  
  //console.log("in the useCreateReview " + restaurantId);
  //console.log(reviewFormData)

  const addEmployeeRequest = async (
    employeeFormData : FormData
  ): Promise<Employee> => {
    const accessToken = await getAccessTokenSilently();
     console.log(employeeFormData)
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/addEmployee`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // "Content-Type": "application/json",
      },
      body: employeeFormData
    });
    // console.log("this is the response from useCreateReview ");
    // console.log(response);
    // console.log(response.body);

    if (!response.ok) {
      throw new Error("Failed to create employee");
    }

    return response.json();
  };

  
  const {
    mutate: addEmployee,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(addEmployeeRequest);
  if(isSuccess){
    toast.success("Employee Aded sucessfully"); 
    window.location.reload();
  }
  if(isError){
    toast.error("Failed to add Employee");
  }

  return {
    addEmployee,
    isLoading,
    isError,
    isSuccess,
  };

};
export const useSearchEmployee = (
  searchState: EmployeeSearchState,
  name?: string
) => {
  console.log(name)
  const { getAccessTokenSilently } = useAuth0();
  const createSearchRequest = async (): Promise<EmployeeSearchResponse> => {
    const accessToken = await getAccessTokenSilently();
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/searchEmployee/${name}?${params.toString()}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // "Content-Type": "application/json",
      },
    }
    );
    

    
    if (!response.ok) {
      throw new Error("Failed to get Employee");
    }

    const answer = response.json();
    return answer
  };

  const { data: result, isLoading } = useQuery(
    ["searchEmployee", searchState],
    createSearchRequest,
    { enabled: !!name }
  );

  return {
    result,
    isLoading,
  };
};