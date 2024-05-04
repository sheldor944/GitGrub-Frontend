import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { Order } from '@/types';

type SalesData = {
  label: string;
  value: number;
};

const SalesChart: React.FC<{ orders: Order[] | undefined }> = ({ orders }) => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const halfWindowWidth = 1960 / 3;
  const [averageQuantityData, setAverageQuantityData] = useState<number[]>([]);
  const [mostOrderedItemData, setMostOrderedItemData] = useState<string>('');
  const [totalOrdersData, setTotalOrdersData] = useState<number>(0);
  const [averageOrderValueData, setAverageOrderValueData] = useState<number>(0);
  const [totalOrderValueData, setTotalOrderValueData] = useState<number>(0);
  const [timePeriodOrdersData, setTimePeriodOrdersData] = useState<number[]>([]);

  useEffect(() => {
    if (!orders) {
      return;
    }

    // Calculate sales data for pie chart
    const itemData: { [label: string]: number } = {};
    orders.forEach(order => {
      order.cartItems.forEach(item => {
        if (itemData[item.name]) {
          itemData[item.name] += parseInt(item.quantity);
        } else {
          itemData[item.name] = parseInt(item.quantity);
        }
      });
    });

    const pieChartData: SalesData[] = Object.entries(itemData).map(([label, value]) => ({
      label,
      value,
    }));

    // Calculate average quantity data for column chart
    const itemCounts: { [label: string]: number } = {};
    const totalQuantities: { [label: string]: number } = {};

    orders.forEach(order => {
      order.cartItems.forEach(item => {
        if (itemCounts[item.name]) {
          itemCounts[item.name]++;
          totalQuantities[item.name] += parseInt(item.quantity);
        } else {
          itemCounts[item.name] = 1;
          totalQuantities[item.name] = parseInt(item.quantity);
        }
      });
    });

    const averageQuantityChartData: number[] = Object.entries(totalQuantities).map(([label, totalQuantity]) => {
      const itemCount = itemCounts[label];
      return itemCount ? totalQuantity / itemCount : 0;
    });

    // Find most ordered item
    let mostOrderedItem = '';
    let maxQuantity = 0;
    Object.entries(itemData).forEach(([label, value]) => {
      if (value > maxQuantity) {
        maxQuantity = value;
        mostOrderedItem = label;
      }
    });

    // Calculate total orders
    const totalOrders = orders.length;

    // Calculate average order value
    const totalOrderValues = orders.reduce((acc, curr) => acc + curr.totalPrice, 0);
    const averageOrderValue = totalOrderValues / totalOrders;

    // Calculate total order value
    const totalOrderValue = totalOrderValues;

    // Calculate time period orders
    const timePeriodOrders = new Array(8).fill(0);
    orders.forEach(order => {
      const hour = new Date(order.createdAt).getHours();
      const periodIndex = Math.floor(hour / 3);
      timePeriodOrders[periodIndex]++;
    });

    setSalesData(pieChartData);
    setAverageQuantityData(averageQuantityChartData);
    setMostOrderedItemData(mostOrderedItem);
    setTotalOrdersData(totalOrders);
    setAverageOrderValueData(averageOrderValue);
    setTotalOrderValueData(totalOrderValue);
    setTimePeriodOrdersData(timePeriodOrders);
  }, [orders]);

  useEffect(() => {
    // Draw pie chart using Chart.js
    const pieCtx = document.getElementById('pieChart') as HTMLCanvasElement;
    if (!pieCtx || !salesData.length) return;

    const newPieChartInstance = new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: salesData.map(data => data.label),
        datasets: [
          {
            label: 'Items',
            data: salesData.map(data => data.value),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
            ],
          },
        ],
      },
    });

    return () => {
      newPieChartInstance.destroy();
    };
  }, [salesData]);

  useEffect(() => {
    // Draw column chart using Chart.js
    const columnCtx = document.getElementById('columnChart') as HTMLCanvasElement;
    if (!columnCtx || !averageQuantityData.length) return;

    const newColumnChartInstance = new Chart(columnCtx, {
      type: 'bar',
      data: {
        labels: salesData.map(data => data.label),
        datasets: [
          {
            label: 'Average Quantity',
            data: averageQuantityData,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Average Quantity: ${context.parsed.y}`;
              }
            }
          }
        }
      }
    });

    return () => {
      newColumnChartInstance.destroy();
    };
  }, [averageQuantityData]);

  useEffect(() => {
    // Draw additional chart using Chart.js
    const additionalCtx = document.getElementById('additionalChart') as HTMLCanvasElement;
    if (!additionalCtx) return;

    const newAdditionalChartInstance = new Chart(additionalCtx, {
      type: 'bar',
      data: {
        labels: ['Most Ordered Item', 'Total Orders', 'Average Order Value', 'Total Order Value'],
        datasets: [
          {
            label: 'Statistics',
            data: [mostOrderedItemData ? salesData.find(data => data.label === mostOrderedItemData)?.value || 0 : 0, totalOrdersData, averageOrderValueData, totalOrderValueData],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
            ],
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                if (context.parsed.x === 0) {
                  return `Most Ordered Item: ${mostOrderedItemData} - Quantity: ${context.parsed.y}`;
                } else if (context.parsed.x === 1) {
                  return `Total Orders: ${context.parsed.y}`;
                } else if (context.parsed.x === 2) {
                  return `Average Order Value: ${context.parsed.y.toFixed(2)}`;
                } else if (context.parsed.x === 3) {
                  return `Total Order Value: ${context.parsed.y.toFixed(2)}`;
                }
                return '';
              }
            }
          }
        }
      }
    });

    return () => {
      newAdditionalChartInstance.destroy();
    };
  }, [mostOrderedItemData, totalOrdersData, averageOrderValueData, totalOrderValueData]);

  useEffect(() => {
    // Draw time period orders chart using Chart.js
    const timePeriodCtx = document.getElementById('timePeriodChart') as HTMLCanvasElement;
    if (!timePeriodCtx || !timePeriodOrdersData.length) return;

    const newTimePeriodChartInstance = new Chart(timePeriodCtx, {
      type: 'bar',
      data: {
        labels: Array.from({ length: 8 }, (_, i) => `${i * 3}:00 - ${(i + 1) * 3}:00`),
        datasets: [
          {
            label: 'Orders per 3 Hours',
            data: timePeriodOrdersData,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Orders: ${context.parsed.y}`;
              }
            }
          }
        }
      }
    });

    return () => {
      newTimePeriodChartInstance.destroy();
    };
  }, [timePeriodOrdersData]);

  return (
    <div className='grid grid-cols-1 gap-20'>

      <div style={{ height: `${halfWindowWidth}px`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <canvas id="pieChart" width="300" height="300"></canvas>
      </div>
      <div style={{ height: `${halfWindowWidth / 1.5}px`, marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <canvas id="columnChart" width="300" height="150"></canvas>
      </div>
      <div style={{ height: `${halfWindowWidth }px`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <canvas id="additionalChart" width="300" height="250"></canvas>
      </div>
      <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <canvas id="timePeriodChart" width="800" height="400"></canvas>
      </div>
    </div>
  );
};

export default SalesChart;
