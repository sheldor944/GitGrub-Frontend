import React, { useEffect, useRef, useState } from 'react';
import { Items } from '@/types';
import { useGetInventory, useUpdateInventoryItem } from '@/api/MyRestaurantApi';
import { Button } from './ui/button';
import { toast } from 'sonner';

const InventoryTable = () => {
  const [items, setItems] = useState<Items[]>([]);
  const { items: fetchedItems, isLoading } = useGetInventory();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [amountToAdd, setAmountToAdd] = useState(0);
  const { updateInventoryRequest } = useUpdateInventoryItem();
  const popupRef = useRef(null);

  useEffect(() => {
    if (!isLoading && fetchedItems) {
      setItems(fetchedItems);
    }
  }, [isLoading, fetchedItems]);

  const handleAdd = (index: number) => {
    setSelectedIndex(index);
    setPopupVisible(true);
  };

  const handleConfirm = async (isAdd: boolean) => {
    if (selectedIndex !== null && items[selectedIndex]) {
      const updatedItems = [...items];
      const amount = isAdd ? amountToAdd : -amountToAdd;
      updatedItems[selectedIndex].availabeQuantity += amount;
      if (updatedItems[selectedIndex].availabeQuantity < 0) {
        updatedItems[selectedIndex].availabeQuantity -= amount;
        toast.error('Cannot have negative quantity');
        return;
      }

      await updateInventoryRequest(updatedItems[selectedIndex]);
      setItems(updatedItems);
    }
    setPopupVisible(false);
    setAmountToAdd(0);
    setSelectedIndex(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (Kg)</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item, index) => (
            <tr key={index}>
              <td className="pl-3 py-4 whitespace-nowrap">{item.itemName}</td>
              <td className="pl-3 py-4 whitespace-nowrap">{item.availabeQuantity} Kg</td>
              <td className="pl-3 py-4 whitespace-nowrap">
                <Button onClick={() => handleAdd(index)} className="mr-2 px-2 rounded-md text-sm">Update</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div ref={popupRef} className="bg-white p-4 rounded-lg">
            <input
              type="number"
              value={amountToAdd}
              onChange={(e) => setAmountToAdd(parseFloat(e.target.value))}
              className="border border-gray-300 p-2 rounded-md mr-2"
            />
            <Button onClick={() => handleConfirm(true)} className="mr-2 bg-customgreen text-white px-2 rounded-md">Add</Button>
            <Button onClick={() => handleConfirm(false)} className="bg-customred text-white px-1 rounded-md">Remove</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;
