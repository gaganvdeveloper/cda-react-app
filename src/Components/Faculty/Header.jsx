import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Ip from "../../Util/Ip";

const Header = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [profile, setProfile] = useState("");
  useEffect(() => {
    axios
      .get(`http://${Ip}/facultyprofiles/${id}`)
      .then((response) => {
        setProfile(response.data.body.photo);
      })
      .catch((error) => {
        console.log(error);
      });
    nav("classes");
  }, [id, nav]);
  return (
    <>
      <header className="bg-green-500 text-white shadow-md py-4 px-6 md:px-20 lg:px-40">
        <div className="container mx-auto flex justify-between items-center flex-wrap">
          <div className="flex items-center flex-wrap space-x-2">
            <NavLink
              to={`/faculty/${id}`}
              className="text-3xl md:text-4xl font-extrabold tracking-widest uppercase"
            >
              <span className="text-yellow-300 mx-1">C</span>
              <span className="text-white mx-1">D</span>
              <span className="text-yellow-300 mx-1">A</span>
            </NavLink>
          </div>

          <nav className="flex space-x-4 md:space-x-8 mt-4 md:mt-0">
            <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive
                  ? " underline underline-offset-4 text-sm md:text-lg font-semibold hover:text-gray-200 transition duration-200"
                  : "text-sm md:text-lg font-semibold hover:text-gray-200 transition duration-200"
              }
            >
              <img
                src={profile}
                className="w-10 h-10 ring-1 ring-slate-200 rounded-full shadow-lg shadow-slate-500"
                alt="Profile"
              />
            </NavLink>
            <NavLink
              to="classes"
              className={({ isActive }) =>
                isActive
                  ? " underline underline-offset-4 text-sm md:text-lg font-semibold hover:text-gray-200 transition duration-200"
                  : "text-sm md:text-lg font-semibold hover:text-gray-200 transition duration-200"
              }
            >
              Classes
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? " underline text-sm md:text-lg hover:bg-white px-2 rounded-md font-semibold hover:text-red-400 transition duration-200"
                  : "text-sm md:text-lg hover:bg-white  justify-center items-center px-2 rounded-md font-semibold hover:text-red-400 transition duration-200"
              }
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
