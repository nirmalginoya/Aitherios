import React from "react";
import { Plus, Search, MoreHorizontal, Edit, Trash2 } from "lucide-react";

const AdminProducts = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Products</h1>
          <p className="text-gray-400">Manage your store's inventory.</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors">
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <div className="p-6 rounded-xl border border-[#222] bg-[#111]">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-[#222] border border-[#333] rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <select className="bg-[#222] border border-[#333] rounded-md py-2 px-4 focus:outline-none focus:border-white">
              <option>All Categories</option>
              <option>Hoodies</option>
              <option>T-Shirts</option>
              <option>Accessories</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-[#222] rounded-t-lg">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg w-12">
                  <input type="checkbox" className="rounded border-gray-600 bg-[#333]" />
                </th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-tr-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222]">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <tr key={item} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="rounded border-gray-600 bg-[#333]" />
                  </td>
                  <td className="px-4 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#333] rounded-md shrink-0"></div>
                    <div>
                      <div className="font-medium">Aitherios Signature Hoodie</div>
                      <div className="text-xs text-gray-500">SKU: AITH-HD-{item}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-400">Apparel</td>
                  <td className="px-4 py-4 font-medium">$85.00</td>
                  <td className="px-4 py-4">
                    <span className={item % 3 === 0 ? "text-red-400" : "text-gray-300"}>
                      {item % 3 === 0 ? "Out of Stock" : "124 in stock"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium border border-green-500/20">
                      Active
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
          <div>Showing 1 to 6 of 24 products</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded bg-[#222] hover:bg-[#333] transition-colors disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 rounded bg-[#222] hover:bg-[#333] transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
