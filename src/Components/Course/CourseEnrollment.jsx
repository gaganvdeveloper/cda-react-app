import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Ip from "../../Util/Ip";

const CourseEnrollment = ({ userId, setEnrollmentModal }) => {
  const ref = useRef();
  const [courses, setCourses] = useState([]);
  const closeModal = (e) => {
    if (e.target === ref.current) setEnrollmentModal(false);
  };

  const handleEnrollment = (cid) => {
    console.log(userId);
    console.log(cid);
    axios
      .post(`http://${Ip}/enrollments/${userId}/${cid}`)
      .then((response) => {
        console.log(response.data);
        setEnrollmentModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://${Ip}/courses`)
      .then((response) => {
        setCourses(response.data.body);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  return (
    <div
      ref={ref}
      onClick={closeModal}
      className="z-40 fixed inset-0 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div className="h-96 w-full max-w-lg bg-slate-700 text-white px-8 py-6 rounded-xl shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105">
        {courses.map((c, index) => (
          <div
            key={index}
            className="flex items-center gap-4 font-semibold py-2"
          >
            <input
              type="checkbox"
              name={c.id}
              id={c.id}
              className="h-6 w-6 rounded-md border-gray-300 text-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform duration-300 ease-in-out transform hover:scale-110"
              onChange={() => {
                handleEnrollment(c.id);
              }}
            />
            <label htmlFor={c.id} className="cursor-pointer select-none">
              {c.title}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseEnrollment;
