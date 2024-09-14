import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Ip from "../../Util/Ip";
import AssignDepartment from "./AssignDepartment";
import AssignYear from "./AssignYear";

const UserDetails = ({ setModal, userId }) => {
  const ref = useRef();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [departmentModal, setDepartmentModal] = useState(false);
  const [yearModal, setYearModal] = useState(false);

  const closeModal = (e) => {
    if (e.target === ref.current) setModal(false);
  };

  useEffect(() => {
    axios
      .get(`http://${Ip}/users/${userId}`)
      .then((response) => {
        setUser(response.data.body);
        if (response.data.body.role === "STUDENT") {
          axios
            .get(`http://${Ip}/studentprofiles/${userId}`)
            .then((response) => {
              setProfile(response.data.body);
              setShowImage(true);
              // console.log(profile.year==null?"Year Not Assigned":profile.year);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        if (response.data.body.role === "FACULTY") {
          axios
            .get(`http://${Ip}/facultyprofiles/${userId}`)
            .then((response) => {
              setProfile(response.data.body);
              setShowImage(true);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId, departmentModal, yearModal]);

  return (
    <>
      {departmentModal && (
        <AssignDepartment
          setDepartmentModal={setDepartmentModal}
          userId={userId}
        />
      )}
      {yearModal && <AssignYear setYearModal={setYearModal} userId={userId} />}
      <div
        onClick={closeModal}
        ref={ref}
        className="z-10 fixed  inset-0 flex flex-col items-center justify-center backdrop-blur-sm "
      >
        <div className="w-[95%] md:w-[90%] lg:w-1/2 bg-purple-600 text-white rounded-2xl px-8 py-8">
          <div className="flex flex-col gap-2 items-center lg:flex-row lg:items-start justify-evenly ">
            {showImage && (
              <img
                loading="lazy"
                className="w-80 h-80 object-cover rounded-full "
                src={profile.photo.substring(54)}
                alt="Profile"
              />
            )}
            {showImage && (
              <table className=" font-semibold ">
                <thead>
                  <tr>
                    <th
                      colSpan={2}
                      className="text-2xl px-2 bg-green-200 text-green-700 rounded-lg"
                    >
                      {user.name.length <= 20
                        ? user.name
                        : user.name.substring(0, 20) + "..."}
                    </th>
                  </tr>
                </thead>
                <tr>
                  <td>Email</td>
                  <td>: {user.email}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>: {user.phone}</td>
                </tr>
                <tr>
                  <td>Role</td>
                  <td>: {user.role}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>: {user.status}</td>
                </tr>
                <tr>
                  <td>Username</td>
                  <td>: {user.username}</td>
                </tr>
                <tr>
                  <td>Password</td>
                  <td>: {user.password}</td>
                </tr>
                {profile.user.role === "STUDENT" ? (
                  <tr className="border-b-2">
                    <td>Year</td>
                    <td>
                      :
                      {profile.year == null
                        ? " Year Not Assigned"
                        : profile.year}
                    </td>
                    <td>
                      <button
                        className="pl-6 outline-none"
                        onClick={() => {
                          setYearModal(true);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ) : (
                  <></>
                )}
                <tr className="border-b-2">
                  <td>Department</td>
                  <td>
                    :
                    {showImage && profile.department === null
                      ? " Not Assigned"
                      : " " + profile.department.name}
                  </td>
                  <td>
                    <button
                      className="pl-6 outline-none"
                      onClick={() => {
                        setDepartmentModal(true);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </table>
            )}
            {/* <div className="">
            <div className="">
              <h1>Course</h1>
            </div>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
