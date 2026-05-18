import React from "react";
import { ArrowUpRight, ArrowDownRight, DollarSign, Package, ShoppingCart, Users } from "lucide-react";

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
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400">Overview of your store's performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$45,231.89" change="20.1" isPositive={true} icon={DollarSign} />
        <StatCard title="Orders" value="+2,350" change="10.5" isPositive={true} icon={ShoppingCart} />
        <StatCard title="Active Users" value="+12,234" change="4.25" isPositive={true} icon={Users} />
        <StatCard title="Product Views" value="452.3k" change="2.4" isPositive={false} icon={Package} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders Table (Mock) */}
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
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} className="hover:bg-[#1a1a1a] transition-colors">
                    <td className="px-4 py-4 font-medium">#ORD-00{item}</td>
                    <td className="px-4 py-4 text-gray-300">User {item}</td>
                    <td className="px-4 py-4 text-gray-400">Today, 10:23 AM</td>
                    <td className="px-4 py-4">$129.99</td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products (Mock) */}
        <div className="p-6 rounded-xl border border-[#222] bg-[#111]">
          <h2 className="text-xl font-bold mb-4">Top Selling</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#222] rounded-md"></div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">Aitherios Hoodie</h4>
                  <p className="text-xs text-gray-400">45 Sales</p>
                </div>
                <div className="font-medium text-sm">$3,825</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
