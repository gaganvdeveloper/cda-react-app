import axios from "axios";
import React, { useEffect, useState } from "react";
import Ip from "../../Util/Ip";
import { useParams } from "react-router-dom";

const Classes = () => {
  const { id } = useParams();

  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://${Ip}/enrollments/faculty/${id}`)
      .then((response) => {
        setEnrollments(response.data.body);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="bg-green-100 flex flex-col gap-4 lg:px-60 md:px-20 px-4 py-6">
      <h1 className="lg:text-3xl text-2xl font-bold text-green-700 text-center tracking-widest underline">
        Classes List
      </h1>

      <div className=" grid grid-cols-3  gap-4">
        {enrollments.length === 0 ? (
          <div className="h-screen text-4xl ">
            <h1 className="text-center mt-[20vh] font-bold text-green-600 -mr-[50vw]">No Enrollments Available.</h1>
          </div>
        ) : (
          enrollments.map((e, index) => {
            return (
              <div
                key={index}
                className="bg-green-300 min-h-40 flex flex-col items-center justify-center gap-4 px-4 py-4 hover:bg-green-400 hover:scale-105 transition-all rounded-lg shadow-lg"
              >
                <img
                  src={e.student.photo.substring(54)}
                  alt="Profile"
                  className="w-40 h-40 md:w-40 md:h-40 lg:w-60 lg:h-60 rounded-full object-cover"
                />

                <div className="flex flex-col items-center *:text-center justify-center md:items-start text-center md:text-left space-y-2">
                  <h1 className="text-lg font-semibold text-gray-800">
                    {e.student.user.name}
                  </h1>
                  <h1 className="text-gray-600">{e.student.user.email}</h1>
                  <h1 className="text-gray-600">+91 {e.student.user.phone}</h1>
                  <h1 className="text-gray-800">{e.course.title}</h1>
                  <h1 className="text-gray-600">{e.course.department.name}</h1>
                  <h1 className="text-gray-600">{e.student.year} Year</h1>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Classes;
