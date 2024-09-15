import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const UsersHeader = () => {
  return (
    <div className="w-full py-4 bg-green-100 min-h-screen">
      <nav className="flex flex-col sm:flex-row items-center justify-evenly bg-green-300 mx-4 sm:mx-8 md:mx-16 lg:mx-40 rounded-lg py-4 shadow-lg shadow-green-600 gap-4 sm:gap-0">
        <NavLink
          to="create"
          className="w-full sm:w-auto text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 font-bold shadow-lg rounded-lg transition-all duration-300"
        >
          Create User
        </NavLink>
        <NavLink
          to=""
          className="w-full sm:w-auto text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 font-bold shadow-lg rounded-lg transition-all duration-300"
        >
          All Users
        </NavLink>
      </nav>
      <div className="px-4 sm:px-8 md:px-16 lg:px-40 mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default UsersHeader;
