import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import StudentProfile from "./StudentProfile";
import axios from "axios";
import Ip from "../../Util/Ip";

const Header = () => {
  const { id } = useParams();
  const [studentProfileModal, setStudentProfileModal] = useState(false);
  const [profile, setProfile] = useState("");

  useEffect(() => {
    axios
      .get(`http://${Ip}/studentprofiles/${id}`)
      .then((response) => {
        console.log(response.data.body.photo);
        setProfile(response.data.body.photo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, studentProfileModal]);

  return (
    <>
      {studentProfileModal && (
        <StudentProfile setStudentProfileModal={setStudentProfileModal} />
      )}
      <header className="bg-green-500 text-white shadow-md py-4 px-6 md:px-20 lg:px-40">
        <div className="container mx-auto flex justify-between items-center flex-wrap">
          <div className="flex items-center flex-wrap space-x-2">
            <NavLink
              to={`/student/${id}/course`}
              className="text-3xl md:text-4xl font-extrabold tracking-widest uppercase"
            >
              <span className="text-yellow-300 mx-1">C</span>
              <span className="text-white mx-1">D</span>
              <span className="text-yellow-300 mx-1">A</span>
            </NavLink>
          </div>

          <nav className="flex items-center space-x-4 md:space-x-8 mt-4 md:mt-0">
            <NavLink
              to="course"
              className={({ isActive }) =>
                isActive
                  ? "text-sm md:text-lg font-semibold underline  underline-offset-4"
                  : "text-sm md:text-lg font-semibold no-underline "
              }
            >
              Courses
            </NavLink>
            <NavLink
              to="search"
              className={({ isActive }) =>
                isActive
                  ? "text-sm md:text-lg font-semibold underline  underline-offset-4"
                  : "text-sm md:text-lg font-semibold no-underline "
              }
            >
              Search
            </NavLink>
            <img
              onClick={() => {
                setStudentProfileModal(true);
              }}
              src={profile}
              className="w-10 shadow-lg shadow-slate-500 h-10 rounded-full ring-1 ring-green-600 "
              alt="Profile"
            />
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
