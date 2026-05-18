import React from "react";
import { ArrowUpRight, ArrowDownRight, DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { admin } from "../../lib/api";

const StatCard = ({ title, value, change, isPositive, icon: Icon }) => (
  <div className="p-6 rounded-xl border border-[#222] bg-[#111] flex flex-col gap-4">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-400 mb-1">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
      </div>
      <div className="p-3 rounded-lg bg-[#222] text-white">
        <Icon size={20} />
      </div>
    </div>
    <div className={`flex items-center text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
      {isPositive ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
      {change}% from last month
    </div>
  </div>
);

const AdminDashboard = () => {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await admin.getStats();
      return res.data;
    }
  });

  const stats = statsData || {
    revenue: 0, orders: 0, users: 0, views: 0,
    recentOrders: [], topProducts: []
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-400">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400">Overview of your store's performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`$${(stats.revenue || 0).toLocaleString()}`} change="20.1" isPositive={true} icon={DollarSign} />
        <StatCard title="Orders" value={stats.orders || 0} change="10.5" isPositive={true} icon={ShoppingCart} />
        <StatCard title="Active Users" value={stats.users || 0} change="4.25" isPositive={true} icon={Users} />
        <StatCard title="Product Views" value={stats.views || 0} change="2.4" isPositive={false} icon={Package} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <div className="xl:col-span-2 p-6 rounded-xl border border-[#222] bg-[#111]">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-[#222] rounded-t-lg">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Order ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3 rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222]">
                {stats.recentOrders && stats.recentOrders.length > 0 ? (
                  stats.recentOrders.map((item) => (
                    <tr key={item.id} className="hover:bg-[#1a1a1a] transition-colors">
                      <td className="px-4 py-4 font-medium">#{item.id}</td>
                      <td className="px-4 py-4 text-gray-300">{item.user?.firstName || 'User'}</td>
                      <td className="px-4 py-4 text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-4">${item.total?.toFixed(2)}</td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium">
                          {item.status || 'Completed'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">No recent orders</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="p-6 rounded-xl border border-[#222] bg-[#111]">
          <h2 className="text-xl font-bold mb-4">Top Selling</h2>
          <div className="space-y-4">
            {stats.topProducts && stats.topProducts.length > 0 ? (
              stats.topProducts.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#222] rounded-md overflow-hidden flex-shrink-0">
                    {item.images?.[0] ? <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" /> : null}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-400">{item.salesCount || 0} Sales</p>
                  </div>
                  <div className="font-medium text-sm">${((item.price || 0) * (item.salesCount || 0)).toLocaleString()}</div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">No products data</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
