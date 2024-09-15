import axios from "axios";
import React, { useEffect, useState } from "react";
import Ip from "../../Util/Ip";
import AssignFaculty from "./AssignFaculty";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [courseId, setcourseId] = useState();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://${Ip}/courses`)
      .then((response) => {
        setCourses(response.data.body);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [modal]);

  const handleDelete = (id) => {
    axios
      .delete(`http://${Ip}/courses/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
  };

  return (
    <>
      {modal && <AssignFaculty setModal={setModal} cid={courseId} />}
      <div className="flex flex-col gap-6 my-4 sm:px-4 lg:px-8">
        <h1 className="text-center text-2xl sm:text-3xl font-bold text-green-700 tracking-widest underline mb-4">
          All Courses
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((c) => {
            return (
              <div key={c.id} className="flex justify-center">
                <div className="bg-green-300 text-green-800 p-3 w-full max-w-full sm:max-w-xs flex flex-col justify-between rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                  <div>
                    <h1 className="text-md sm:text-lg font-bold mb-2">
                      <span className="text-md sm:text-xl font-bold bg-yellow-300 px-2 py-1 tracking-wide text-center rounded-lg block">
                        {c.title}
                      </span>
                    </h1>
                    <p className="text-sm sm:text-base mb-2">
                      <strong>Description: </strong>
                      {c.description}
                    </p>
                    <p className="text-sm sm:text-base font-bold mb-2">
                      <strong>Department: </strong>
                      {c.department == null
                        ? "Department Not Assigned"
                        : c.department.name}
                    </p>
                    <p className="text-sm sm:text-base font-bold mb-4">
                      <strong>Faculty: </strong>
                      {c.faculty == null
                        ? "Faculty Not Assigned"
                        : c.faculty.user.name}
                    </p>
                  </div>
                  <div className="flex lg:flex-row  sm:flex-col gap-2 justify-between lg:*:px-2 *:w-32 sm:gap-4">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className=" text-red-700 bg-white border-red-700 transition-all hover:bg-red-700 hover:text-white border-2 rounded-md text-bold sm:text-base"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setcourseId(c.id);
                        setModal(true);
                      }}
                      className=" bg-white text-green-700 border-green-700 transition-all hover:bg-green-700 hover:text-white border-2 rounded-md text-bold  sm:text-base"
                    >
                      Update Faculty
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AllCourses;
