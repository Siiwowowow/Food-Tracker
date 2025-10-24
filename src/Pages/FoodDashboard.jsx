import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const FoodDashboard = () => {
  // Fetch all foods data using TanStack Query
  const { data: foods = [], isLoading, isError } = useQuery({
    queryKey: ['dashboardFoods'],
    queryFn: async () => {
      const response = await axios.get('https://foodtracker-server-2.onrender.com/foods', {
        withCredentials: true
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  // Fetch expiring soon foods
  const { data: expiringFoods = [] } = useQuery({
    queryKey: ['expiringFoods'],
    queryFn: async () => {
      const response = await axios.get('https://foodtracker-server-2.onrender.com/foods/expiring-soon');
      return response.data;
    },
  });

  // Fetch expired foods
  const { data: expiredFoods = [] } = useQuery({
    queryKey: ['expiredFoods'],
    queryFn: async () => {
      const response = await axios.get('https://foodtracker-server-2.onrender.com/foods/expired');
      return response.data;
    },
  });

  // Calculate chart data based on API data
  const calculateChartData = () => {
    const today = new Date();

    // Category distribution
    const categoryCount = {};
    foods.forEach(food => {
      const category = food.category || 'Uncategorized';
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    // Expiry status distribution
    const statusData = {
      fresh: foods.filter(food => new Date(food.expiryDate) > today).length,
      expiring: expiringFoods.length,
      expired: expiredFoods.length,
    };

    // Weekly expiry trend (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const dailyExpiryCount = last7Days.map(date => {
      return foods.filter(food => {
        const foodDate = new Date(food.expiryDate).toISOString().split('T')[0];
        return foodDate === date;
      }).length;
    });

    return {
      categoryData: {
        labels: Object.keys(categoryCount),
        datasets: [
          {
            label: 'Items by Category',
            data: Object.values(categoryCount),
            backgroundColor: [
              '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
              '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
            ],
          },
        ],
      },
      statusData: {
        labels: ['Fresh', 'Expiring Soon', 'Expired'],
        datasets: [
          {
            label: 'Food Status',
            data: [statusData.fresh, statusData.expiring, statusData.expired],
            backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
          },
        ],
      },
      trendData: {
        labels: last7Days.map(date => {
          const d = new Date(date);
          return `${d.getDate()}/${d.getMonth() + 1}`;
        }),
        datasets: [
          {
            label: 'Items Expiring',
            data: dailyExpiryCount,
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      stats: {
        totalItems: foods.length,
        freshItems: statusData.fresh,
        expiringItems: statusData.expiring,
        expiredItems: statusData.expired,
        categories: Object.keys(categoryCount).length,
      },
    };
  };

  const chartData = calculateChartData();

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        
      },
    },
  };

  const doughnutOptions = {
    ...chartOptions,
    cutout: '60%',
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Failed to load dashboard data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📊 Food Analytics Dashboard</h1>
        <p className="text-gray-600">Comprehensive insights into your food inventory and expiry patterns</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">{chartData.stats.totalItems}</div>
          <div className="text-gray-600">Total Items</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-2xl font-bold text-green-600">{chartData.stats.freshItems}</div>
          <div className="text-gray-600">Fresh Items</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-2xl font-bold text-orange-600">{chartData.stats.expiringItems}</div>
          <div className="text-gray-600">Expiring Soon</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-2xl font-bold text-red-600">{chartData.stats.expiredItems}</div>
          <div className="text-gray-600">Expired Items</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Category Distribution - Doughnut Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📦 Category Distribution</h3>
          <div className="h-64">
            <Doughnut data={chartData.categoryData} options={doughnutOptions} />
          </div>
        </div>

        {/* Food Status - Bar Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Food Status Overview</h3>
          <div className="h-64">
            <Bar data={chartData.statusData} options={chartOptions} />
          </div>
        </div>

        {/* Expiry Trend - Line Chart */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📈 7-Day Expiry Trend</h3>
          <div className="h-64">
            <Line data={chartData.trendData} options={chartOptions} />
          </div>
        </div>

      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">⚡ Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full btn btn-primary btn-outline">
              View Expiring Items
            </button>
            <button className="w-full btn btn-secondary btn-outline">
              Generate Shopping List
            </button>
            <button className="w-full btn btn-accent btn-outline">
              Export Analytics
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🕒 Recent Activity</h3>
          <div className="space-y-3">
            {foods.slice(0, 3).map((food) => (
              <div key={food._id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <div className="font-medium">{food.foodTitle}</div>
                  <div className="text-sm text-gray-500">{food.category}</div>
                </div>
                <div className={`badge ${
                  new Date(food.expiryDate) < new Date() ? 'badge-error' : 
                  new Date(food.expiryDate) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) ? 'badge-warning' : 'badge-success'
                }`}>
                  {new Date(food.expiryDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FoodDashboard;