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
      <div ref={ref} onClick={closeModal} className="modal-backdrop">
        <div className="modal-content ">
          <div className="overflow-y-auto flex-1 pt-10 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enrollments.map((e, index) => (
                <div key={index} className="course-card">
                  <h1 className="course-title">Course: {e.course.title}</h1>
                  <h2>Department: {e.course.department.name}</h2>
                  <h2 className="course-faculty">
                    Faculty: {e.course.faculty.user.name}
                  </h2>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => setEnrollmentModal(true)}
            className="enroll-button"
          >
            Enroll Now
          </button>
        </div>
      </div>

      <style jsx>{`
        .modal-backdrop {
          z-index: 30;
          position: fixed;
          inset: 0;
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: fadeIn 0.3s ease-in-out;
        }

        .modal-content {
          position: relative;
          background-color: #374151;
          color: white;
          padding: 1.5rem;
          border-radius: 0.5rem;
          width: 100%;
          max-width: 1200px;
          height: 75%;
          display: flex;
          flex-direction: column;
          animation: slideIn 0.5s ease-out;
        }

        .course-card {
          background-color: #4b5563;
          border-radius: 0.5rem;
          padding: 1rem;
        }

        .course-title {
          font-size: 1.125rem;
          font-weight: 600;
        }

        .course-faculty {
          font-size: 1.125rem;
          font-weight: 600;
        }

        .enroll-button {
          position: absolute;
          right: 1rem;
          top: 10px;
          background-color: #10b981;
          color: white;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          transition: background-color 0.3s ease;
          z-index: 10;
          animation: buttonPop 0.3s ease-in-out;
        }

        .enroll-button:hover {
          background-color: #059669;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            transform: translateY(10%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes buttonPop {
          from {
            transform: scale(0.9);
          }
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default CourseDetails;
