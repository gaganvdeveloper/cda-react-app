import axios from "axios";
import React, { useEffect, useState } from "react";
import Ip from "../../Util/Ip";

const AllDepartments = () => {
  const [departments, setDepartments] = useState([]);

  const handleDelete = (id) => {
    axios
      .delete(`http://${Ip}/departments/${id}`)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://${Ip}/departments`)
      .then((response) => {
        setDepartments(response.data.body);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col gap-6 py-6 px-4 sm:px-8 lg:px-16">
      <h1 className="text-2xl sm:text-3xl font-bold text-green-700 text-center underline tracking-widest">
        All Departments
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((d, index) => (
          <div
            key={index}
            className="bg-green-300 rounded-lg p-6 shadow-lg transition-all transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex flex-col items-center">
              <h1 className="text-xl font-bold text-green-700 mb-2">
                {(d.name + "").length < 25
                  ? d.name
                  : d.name.substring(0, 25) + "..."}
              </h1>
              <p className="text-sm text-gray-800">{d.description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <button
                onClick={() => handleDelete(d.id)}
                className="w-full sm:w-auto px-4 py-2 text-red-700 bg-white border border-red-700 transition-all hover:bg-red-700 hover:text-white rounded-md"
              >
                Delete
              </button>
              <button className="w-full sm:w-auto px-4 py-2 bg-white text-green-700 border border-green-700 transition-all hover:bg-green-700 hover:text-white rounded-md">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDepartments;
