import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full px-40 py-1 bg-green-100 h-screen">
      <nav className="flex bg-green-300 rounded-lg py-2 shadow-lg shadow-green-600  items-center justify-evenly">
        <NavLink
          to="create"
          className=" text-center bg-green-600 hover:bg-green-700 text-white px-3 py-1 font-bold shadow-lg rounded-lg"
        >
          Create Department
        </NavLink>
        <NavLink
          to=""
          className=" text-center bg-green-600 hover:bg-green-700 text-white px-3 py-1 font-bold shadow-lg rounded-lg"
        >
          All Departments
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default Header;
