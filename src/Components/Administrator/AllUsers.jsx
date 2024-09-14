import axios from "axios";
import React, { useEffect, useState } from "react";
import Ip from "../../Util/Ip";
import UserDetails from "./UserDetails";

const AllUsers = () => {
  const [students, setStudents] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [userId, setUserId] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://${Ip}/studentprofiles`)
      .then((response) => {
        setStudents(response.data.body);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://${Ip}/facultyprofiles`)
      .then((response) => {
        setFaculties(response.data.body);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [modal]);

  return (
    <>
      {modal && <UserDetails setModal={setModal} userId={userId} />}
      <div className="flex flex-col  lg:flex-row  md:flex-col justify-evenly px-2 md:px-2 lg:px-2 py-10 gap-4">
        {/* Students Section */}
        <div className="flex flex-col gap-6 bg-green-100 w-full px-6 py-6 rounded-2xl shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-green-600 text-center tracking-widest underline">
            Students
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            {students.map((s, index) => (
              <div
                key={index}
                className="bg-green-300 w-full rounded-xl p-6 shadow-lg"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={s.photo.substring(54)}
                    alt="Profile"
                    className="object-cover w-32 h-32 rounded-full"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="text-lg font-bold text-green-700">
                    {s.user.name.length <= 12
                      ? s.user.name
                      : s.user.name.substring(0, 12) + "..."}
                  </h1>
                  <h1 className="text-sm">
                    {s.user.email.substring(0, 20)}...
                  </h1>
                  <h1 className="text-sm">+91 {s.user.phone}</h1>
                  <h1 className="text-sm">
                    {s.department
                      ? s.department.name
                      : "Department Not Assigned"}
                  </h1>
                </div>
                <button
                  onClick={() => {
                    setUserId(s.id);
                    setModal(true);
                  }}
                  className="-mt-24 -mr-5 font-semibold underline text-indigo-500  px-2 float-right"
                >
                  Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Faculties Section */}
        <div className="flex flex-col gap-6 w-full bg-green-100 px-6 py-6 rounded-2xl shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-green-600 text-center tracking-widest underline">
            Faculties
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {faculties.map((f, index) => (
              <div
                key={index}
                className="bg-green-300 w-full rounded-xl p-6 shadow-lg"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={f.photo.substring(54)}
                    alt="Profile"
                    className="object-cover w-32 h-32 rounded-full"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="text-lg font-bold text-green-700">
                    {f.user.name.length <= 12
                      ? f.user.name
                      : f.user.name.substring(0, 12) + "..."}
                  </h1>
                  <h1 className="text-sm">
                    {f.user.email.length <= 29
                      ? f.user.email
                      : f.user.email.substring(0, 29) + "..."}
                  </h1>
                  <h1 className="text-sm">+91 {f.user.phone}</h1>
                  <h1 className="text-sm">
                    {f.department
                      ? f.department.name
                      : "Department Not Assigned"}
                  </h1>
                </div>
                <button
                  onClick={() => {
                    setUserId(f.id);
                    setModal(true);
                  }}
                  className="-mt-24 -mr-5 font-semibold underline text-indigo-500  px-2 float-right"
                >
                  Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
