import React from "react";
import { Search, Eye } from "lucide-react";

const AdminOrders = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-1">Orders</h1>
        <p className="text-gray-400">Track and fulfill customer orders.</p>
      </div>

      <div className="p-6 rounded-xl border border-[#222] bg-[#111]">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="w-full bg-[#222] border border-[#333] rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <select className="bg-[#222] border border-[#333] rounded-md py-2 px-4 focus:outline-none focus:border-white">
              <option>All Statuses</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-[#222] rounded-t-lg">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Order ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Fulfillment</th>
                <th className="px-4 py-3 rounded-tr-lg text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222]">
              {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                <tr key={item} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="px-4 py-4 font-medium text-white">#ORD-100{item}</td>
                  <td className="px-4 py-4 text-gray-400">May {item + 10}, 2026</td>
                  <td className="px-4 py-4">
                    <div className="font-medium">Customer {item}</div>
                    <div className="text-xs text-gray-500">user{item}@example.com</div>
                  </td>
                  <td className="px-4 py-4 font-medium">${(120 * item).toFixed(2)}</td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium">
                      Paid
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item % 2 === 0 ? "bg-yellow-500/10 text-yellow-500" : "bg-blue-500/10 text-blue-500"
                    }`}>
                      {item % 2 === 0 ? "Unfulfilled" : "Shipped"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-white transition-colors inline-flex">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
