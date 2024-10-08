import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Ip from "../../Util/Ip";
import { CircleXIcon } from "lucide-react";

const StudentProfile = ({ setStudentProfileModal }) => {
  const { id } = useParams();
  const ref = useRef();
  const [reload, setReload] = useState(false);
  const [display, setDisplay] = useState(false);
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const [department, setDepartment] = useState();
  const nav = useNavigate();
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
            <div className="flex flex-col items-center space-y-4 ">
              <img
                src={profile.photo}
                alt="Profile"
                className="h-40 w-40 rounded-full object-cover ring-4 ring-green-300 shadow-md"
              />
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-left">
                    <th className="py-3 px-4">Field</th>
                    <th className="py-3 px-4">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold">Name</td>
                    <td className="py-2 px-4">{user.name}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold">Email</td>
                    <td className="py-2 px-4">{user.email}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold">Phone</td>
                    <td className="py-2 px-4">{user.phone}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-semibold">Department</td>
                    <td className="py-2 px-4">
                      {department == null ? "" : department.name}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-semibold">Year</td>
                    <td className="py-2 px-4">{profile.year}</td>
                  </tr>
                </tbody>
              </table>

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
                    nav("/");
                  }}
                  className="border-2 border-red-700 px-2 w-[35vw] rounded-md text-red-700 font-bold "
                >
                  Logout
                </button>
              </div>
              <CircleXIcon
                onClick={() => {
                  setStudentProfileModal(false);
                }}
                size={20}
                color="red"
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-content {
          background-color: white;
          border-radius: 1rem;
          padding-left: 2rem;
          padding-right: 2rem;
          padding-top: 1rem;
          padding-bottom: 0.5rem;
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
