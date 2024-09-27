import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Ip from "../../Util/Ip";
import AssignDepartment from "./AssignDepartment";
import AssignYear from "./AssignYear";
import CourseDetails from "../Course/CourseDetails";

const UserDetails = ({ setModal, userId }) => {
  const ref = useRef();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [departmentModal, setDepartmentModal] = useState(false);
  const [yearModal, setYearModal] = useState(false);
  const [courseModal, setCourseModal] = useState(false);

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
      {courseModal && (
        <CourseDetails setCourseModal={setCourseModal} userId={userId} />
      )}
      <div
        onClick={closeModal}
        ref={ref}
        style={{
          position: "fixed",
          inset: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "90%", // Adjust width for smaller screens
            maxWidth: "1200px", // Max width for larger screens
            backgroundColor: "#64748b",
            color: "white",
            borderRadius: "1rem",
            padding: "1.5rem",
            opacity: 0,
            transform: "scale(0.9)",
            animation: "slide-up 0.3s ease-in-out forwards",
          }}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-8 items-center lg:items-start justify-center lg:justify-between">
            {showImage && (
              <img
                loading="lazy"
                className="w-48 h-48 object-cover rounded-full"
                src={profile.photo}
                alt="Profile"
              />
            )}
            {showImage && (
              <div className="flex-grow">
                <table className="w-full text-left font-semibold text-sm md:text-base">
                  <thead>
                    <tr>
                      <th
                        colSpan={2}
                        className="text-xl md:text-2xl px-2 bg-green-200 text-green-700 rounded-lg"
                      >
                        {user.name.length <= 20
                          ? user.name
                          : user.name.substring(0, 20) + "..."}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
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
                    {profile.user.role === "STUDENT" && (
                      <tr className="border-b-2">
                        <td>Year</td>
                        <td>
                          :{" "}
                          {profile.year == null
                            ? "Year Not Assigned"
                            : profile.year}
                        </td>
                        <td>
                          <button
                            className="text-green-300 hover:text-green-600"
                            onClick={() => {
                              setYearModal(true);
                            }}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    )}
                    <tr className="border-b-2">
                      <td>Department</td>
                      <td>
                        :{" "}
                        {profile.department === null
                          ? "Not Assigned"
                          : profile.department.name}
                      </td>
                      <td>
                        <button
                          className="text-green-300 hover:text-green-600"
                          onClick={() => {
                            setDepartmentModal(true);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                    {profile.user.role === "STUDENT" && (
                      <tr>
                        <td colSpan={3} className="py-2 text-right">
                          <button
                            onClick={() => {
                              setCourseModal(true);
                            }}
                            className="py-1 px-2 hover:text-green-600 rounded-lg hover:bg-white transition-all"
                          >
                            Course Details
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes slide-up {
          0% {
            transform: translateY(20px) scale(0.9);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default UserDetails;
