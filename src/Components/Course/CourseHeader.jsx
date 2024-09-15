import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const CourseHeader = () => {
  return (
    <div className="w-full px-4 sm:px-10 md:px-20 lg:px-40 py-4 bg-green-100 min-h-screen">
      <nav className="flex flex-col sm:flex-row bg-green-300 rounded-lg py-4 shadow-lg shadow-green-600 items-center justify-evenly gap-4 sm:gap-0">
        <NavLink
          to="create"
          className="w-full sm:w-auto text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 font-bold shadow-lg rounded-lg transition-all duration-300"
        >
          Create Course
        </NavLink>
        <NavLink
          to=""
          className="w-full sm:w-auto text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 font-bold shadow-lg rounded-lg transition-all duration-300"
        >
          All Courses
        </NavLink>
      </nav>
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default CourseHeader;
