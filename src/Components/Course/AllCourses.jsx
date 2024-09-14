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
      <div className=" flex flex-col gap-4 my-4">
        <h1 className="text-center text-3xl font-bold text-green-700 tracking-widest underline ">
          All Courses
        </h1>
        <div className=" grid grid-cols-3 gap-6">
          {courses.map((c, index) => {
            return (
              <div key={c.id}>
                <div className="bg-green-300 text-green-800 px-6 py-4 flex flex-col justify-between min-h-60 rounded-lg shadow-lg ">
                  <div>
                    <h1 className="my-2 px-6 text-lg font-bold">
                      <span className="text-xl font-bold bg-yellow-300 px-2 tracking-wide text-center rounded-lg block">
                        {c.title}
                      </span>
                    </h1>
                    <h1 className="px-6">Desc : {c.description}</h1>
                    <h1 className="my-2 px-6 text-lg font-bold">
                      Dept :{" "}
                      {c.department == null
                        ? "Department Not Assigned"
                        : c.department.name}
                    </h1>
                    <h1 className="my-2 px-6 text-lg font-bold">
                      Faculty :{" "}
                      {c.faculty == null
                        ? "Faculty Not assigned"
                        : c.faculty.user.name}
                    </h1>
                  </div>
                  <div className="flex gap-20 justify-between items-center *:font-bold  *:px-4 *:rounded-md  ">
                    <button
                      onClick={(e) => {
                        handleDelete(c.id);
                      }}
                      className=" text-red-700 bg-white border-red-700 transition-all hover:bg-red-700 hover:text-white border-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setcourseId(c.id);
                        setModal(true);
                      }}
                      className="hover:bg-green-700 hover:text-white border-2 bg-white text-green-700 border-green-700 transition-all "
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
