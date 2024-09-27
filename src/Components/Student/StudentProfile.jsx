import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Ip from "../../Util/Ip";

const StudentProfile = ({ setStudentProfileModal }) => {
  const { id } = useParams();
  const ref = useRef();
  const [reload, setReload] = useState(false);
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
        setProfile(response.data.body);
        setDepartment(response.data.body.department);
        setUser(response.data.body.user);
        setDisplay(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, reload]);

  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("uid", id);
    console.log(formData);
    axios
      .post(`http://${Ip}/studentprofiles`, formData)
      .then((response) => {
        console.log(response.data);
        setReload(!reload);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {display && (
        <div
          onClick={closeModal}
          ref={ref}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <div className="modal-content">
            <div className="flex flex-col items-center space-y-6 ">
              {/* Profile Image */}
              <img
                src={profile.photo}
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
                <h2 className="text-lg font-semibold">
                  {department == null
                    ? "No Department Assigned"
                    : department.name}
                </h2>
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
              <div className="flex items-center lg:gap-10 md:gap-8 justify-between w-full">
                <input
                  className="hidden"
                  type="file"
                  name="file"
                  id="file"
                  onChange={(e) => {
                    handleUpload(e.target.files[0]);
                  }}
                />
                <label
                  className="border-2 cursor-pointer text-center border-green-600 px-2 w-[35vw] rounded-md text-green-600 font-bold "
                  htmlFor="file"
                >
                  Update Image
                </label>
                <button
                  onClick={() => {
                    setStudentProfileModal(false);
                  }}
                  className="border-2 border-red-700 px-2 w-[35vw] rounded-md text-red-700 font-bold "
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-content {
          background-color: white;
          border-radius: 1rem;
          padding: 2rem;
          width: 100%;
          max-width: 24rem;
          box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
          transform: scale(0.8);
          animation: growOut 0.3s ease forwards;
        }

        @keyframes growOut {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default StudentProfile;
