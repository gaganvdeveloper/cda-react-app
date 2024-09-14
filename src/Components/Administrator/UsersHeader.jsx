import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const UsersHeader = () => {
  return (
    <div className="w-full py-1 bg-green-100 min-h-screen">
      <nav className="flex flex-col md:flex-row items-center justify-evenly bg-green-300 mx-4 sm:mx-8 md:mx-16 lg:mx-40 rounded-lg py-2 shadow-lg shadow-green-600">
        <NavLink
          to="create"
          className="text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 mb-2 md:mb-0 font-bold shadow-lg rounded-lg w-full md:w-auto"
        >
          Create User
        </NavLink>
        <NavLink
          to=""
          className="text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 font-bold shadow-lg rounded-lg w-full md:w-auto"
        >
          All Users
        </NavLink>
      </nav>
      <div className="px-4 sm:px-8 md:px-16 lg:px-40">
        <Outlet />
      </div>
    </div>
  );
};

export default UsersHeader;
