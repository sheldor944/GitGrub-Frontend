import React, { useEffect, useState } from 'react';
import { Items } from '@/types';
import { useGetInventory } from '@/api/MyRestaurantApi';

const InventoryTable = () => {
    const [items, setReviews] = useState<Items[]>([]);
  const { items: fetchedReviews, isLoading } = useGetInventory();

  useEffect(() => {
    if (!isLoading && fetchedReviews) {
      setReviews(fetchedReviews);
    }
  }, [isLoading, fetchedReviews]);
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (Kg)</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {items.map((item, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">{item.itemName}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.availabeQuantity} Kg</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
