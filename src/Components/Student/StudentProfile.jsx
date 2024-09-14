import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Ip from "../../Util/Ip";

const StudentProfile = ({ setStudentProfileModal }) => {
  const { id } = useParams();
  const ref = useRef();
  const [display, setDisplay] = useState(false);
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const [department, setDepartment] = useState();
  const closeModal = (e) => {
    if (e.target === ref.current) setStudentProfileModal(false);
  };
  useEffect(() => {
    axios
      .get(`http://${Ip}/studentprofiles/${id}`)
      .then((response) => {
        console.log(response.data.body);
        setProfile(response.data.body);
        setDepartment(response.data.body.department);
        setUser(response.data.body.user);

        setDisplay(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      {display && (
        <div
          onClick={closeModal}
          ref={ref}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md transform transition-all duration-300 ease-in-out hover:scale-105">
            <div className="flex flex-col items-center space-y-6">
              {/* Profile Image */}
              <img
                src={profile.photo.substring(54)}
                alt="Profile"
                className="h-40 w-40 rounded-full object-cover ring-4 ring-green-300 shadow-md"
              />

              {/* User Information */}
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600">{user.phone}</p>
              </div>

              {/* Department and Year */}
              <div className="bg-green-100 px-4 py-2 rounded-lg shadow-sm text-green-700">
                <h2 className="text-lg font-semibold">{department.name}</h2>
                <p className="text-sm">{profile.year} Year</p>
              </div>

              {/* Username and Password */}
              <div className="w-full space-y-2 text-center">
                <div className="text-sm text-gray-600">
                  <strong>Username:</strong> {user.username}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Password:</strong> {user.password}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentProfile;
