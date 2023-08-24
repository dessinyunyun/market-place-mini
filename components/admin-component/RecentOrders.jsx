import React from "react";
import { data } from "../../data/data.js";
import { FaShoppingBag } from "react-icons/fa";

const RecentOrders = () => {
  return (
    <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border border-primary rounded-lg bg-black overflow-scroll">
      <h1 className="text-green-100">Recent Orders</h1>
      <ul>
        {data.map((order, id) => (
          <li key={id} className="bg-primarydark hover:bg-primary hover:text-white rounded-lg my-3 p-2 flex items-center cursor-pointer">
            <div className="bg-purple-100 rounded-lg p-3">
              <FaShoppingBag className="text-primary" />
            </div>
            <div className="pl-4">
              <p className="text-white hover:text-white font-bold">${order.total}</p>
              <p className="text-green-100 hover:text-white text-sm">{order.name.first}</p>
            </div>
            <p className="lg:flex md:hidden absolute right-6 text-sm text-green-100">{order.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentOrders;
