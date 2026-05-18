import React from "react";
import { Search, UserCog, Mail } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { admin } from "../../lib/api";

const AdminUsers = () => {
  const { data: usersData, isLoading, isError } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const res = await admin.getUsers();
      return res.data;
    }
  });

  const users = usersData || [];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-1">Users</h1>
        <p className="text-gray-400">Manage registered customers and admins.</p>
      </div>

      <div className="p-6 rounded-xl border border-[#222] bg-[#111]">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="w-full bg-[#222] border border-[#333] rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <select className="bg-[#222] border border-[#333] rounded-md py-2 px-4 focus:outline-none focus:border-white">
              <option>All Roles</option>
              <option>Customer</option>
              <option>Admin</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-[#222] rounded-t-lg">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Total Spent</th>
                <th className="px-4 py-3 rounded-tr-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222]">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-400">Loading users...</td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-red-500">Failed to load users.</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-400">No users found.</td>
                </tr>
              ) : (
                users.map((item) => (
                  <tr key={item.id} className="hover:bg-[#1a1a1a] transition-colors">
                    <td className="px-4 py-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full shrink-0 flex items-center justify-center font-bold text-white uppercase">
                        {(item.firstName?.[0] || 'U')}
                      </div>
                      <div>
                        <div className="font-medium text-white">{item.firstName} {item.lastName}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Mail size={10} />
                          {item.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        item.role === "admin" 
                          ? "bg-purple-500/10 text-purple-400 border-purple-500/20" 
                          : "bg-[#222] text-gray-300 border-[#333]"
                      }`}>
                        {item.role === "admin" ? "Admin" : "Customer"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-4 font-medium">${(item.totalSpent || 0).toFixed(2)}</td>
                    <td className="px-4 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-white transition-colors inline-flex">
                        <UserCog size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
