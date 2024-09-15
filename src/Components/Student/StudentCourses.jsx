import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ip from "../../Util/Ip";

const StudentCourses = () => {
  const { id } = useParams();

  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    axios(`http://${Ip}/enrollments/user/${id}`)
      .then((response) => {
        setEnrollments(response.data.body);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="lg:px-40 md:px-10 px-6 bg-green-100 min-h-screen flex flex-col gap-6 py-4">
      <h1 className="text-2xl font-bold text-green-700 text-center tracking-widest underline ">
        Your Courses
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8  ">
        {enrollments.map((e, index) => {
          return (
            <div
              key={index}
              className="bg-green-300 hover:shadow-lg min-h-32 hover:shadow-slate-400 hover:bg-green-600 px-6 py-4 rounded-lg hover:text-white hover:scale-105 transition-all"
            >
              <h1 className="text-center rounded-lg   bg-amber-200 font-bold text-green-700">
                {e.course.title}
              </h1>
              <div className="font-semibold">
                <h1>Department : {e.course.department.name}</h1>
                <h1>Faculty : {e.course.faculty.user.name}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentCourses;
