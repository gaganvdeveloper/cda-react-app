import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Ip from "../../Util/Ip";
import CourseEnrollment from "./CourseEnrollment";

const CourseDetails = ({ setCourseModal, userId }) => {
  const ref = useRef();
  const [enrollmentModal, setEnrollmentModal] = useState(false);
  const [enrollments, setEnrollments] = useState([]);
  const closeModal = (e) => {
    if (e.target === ref.current) setCourseModal(false);
  };

  useEffect(() => {
    axios
      .get(`http://${Ip}/enrollments/user/${userId}`)
      .then((response) => {
        console.log(response.data);
        setEnrollments(response.data.body);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId, enrollmentModal]);

  return (
    <>
      {enrollmentModal && (
        <CourseEnrollment
          userId={userId}
          setEnrollmentModal={setEnrollmentModal}
        />
      )}
      <div
        ref={ref}
        onClick={closeModal}
        className="z-30 fixed inset-0 backdrop-blur-md flex flex-col items-center justify-center "
      >
        <div className=" my-10 overflow-y-auto rounded-md bg-slate-600 text-white px-8 py-6">
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                setEnrollmentModal(true);
              }}
              className=" float-right font-semibold bg-green-500 px-2 rounded-md"
            >
              Enrol Now
            </button>
            <div className="grid grid-cols-2 gap-4">
              {enrollments.map((e, index) => {
                return (
                  <div key={index} className="bg-slate-500 rounded-lg px-4 py-4 ">
                    <h1 className="font-semibold">Course : {e.course.title}</h1>
                    <h1>Department : {e.course.department.name}</h1>
                    <h1 className="font-semibold">Faculty : {e.course.faculty.user.name}</h1>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
