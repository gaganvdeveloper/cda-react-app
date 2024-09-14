import React from "react";
import { NavLink, useParams } from "react-router-dom";

const Header = () => {
  const { id } = useParams();
  return (
    <>
      <header className="bg-green-500 text-white shadow-md py-4 px-6 md:px-20 lg:px-40">
        <div className="container mx-auto flex justify-between items-center flex-wrap">
          <div className="flex items-center flex-wrap space-x-2">
            <NavLink
              to={`/administrator/${id}`}
              className="text-3xl md:text-4xl font-extrabold tracking-widest uppercase"
            >
              <span className="text-yellow-300 mx-1">C</span>
              <span className="text-white mx-1">D</span>
              <span className="text-yellow-300 mx-1">A</span>
            </NavLink>
          </div>

          <nav className="flex space-x-4 md:space-x-8 mt-4 md:mt-0">
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive
                  ? "text-sm md:text-lg font-semibold "
                  : "text-sm md:text-lg font-semibold no-underline text-gray-300"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="users"
              // className="text-sm md:text-lg font-semibold hover:text-gray-200 transition duration-200"
              className={({ isActive }) =>
                isActive
                  ? "text-sm md:text-lg font-semibold underline  underline-offset-4"
                  : "text-sm md:text-lg font-semibold no-underline text-gray-200"
              }
            >
              Users
            </NavLink>
            <NavLink
              to="department"
              // className="text-sm md:text-lg font-semibold hover:text-gray-200 transition duration-200"
              className={({ isActive }) =>
                isActive
                  ? "text-sm md:text-lg font-semibold underline  underline-offset-4"
                  : "text-sm md:text-lg font-semibold no-underline text-gray-200"
              }
            >
              Departments
            </NavLink>
            <NavLink
              to="course"
              // className="text-sm md:text-lg font-semibold hover:text-gray-200 transition duration-200"
              className={({ isActive }) =>
                isActive
                  ? "text-sm md:text-lg font-semibold underline underline-offset-4  "
                  : "text-sm md:text-lg font-semibold no-underline text-gray-200"
              }
            >
              Courses
            </NavLink>
            <NavLink
              to="/"
              className="text-sm md:text-lg font-semibold hover:text-red-700 hover:border-white px-2 hover:bg-white rounded-md border border-green-500 transition duration-200 text-gray-300"
            >
              Logout
            </NavLink>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
