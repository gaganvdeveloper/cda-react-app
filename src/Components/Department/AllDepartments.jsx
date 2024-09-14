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
    <div className="flex flex-col gap-4 py-4">
      <h1 className="text-3xl font-bold text-green-700 text-center underline tracking-widest ">
        All Departments
      </h1>
      <div className="grid grid-cols-3 gap-8">
        {departments.map((d, index) => {
          return (
            <div
              key={index}
              className="bg-green-300 gap-10 rounded-xl px-4 py-4 shadow-lg shadow-gray-500 flex flex-col items-center justify-between"
            >
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-green-700">
                  {(d.name + "").length < 25
                    ? d.name
                    : d.name.substring(0, 25) + "..."}
                </h1>
                <h1>{d.description}</h1>
              </div>
              <div className="flex gap-20 justify-between items-center *:font-bold  *:px-4 *:rounded-md *:w-20 ">
                <button
                  onClick={() => {
                    handleDelete(d.id);
                  }}
                  className=" text-red-700 bg-white border-red-700 transition-all hover:bg-red-700 hover:text-white border-2"
                >
                  Delete
                </button>
                <button className="hover:bg-green-700 hover:text-white border-2 bg-white text-green-700 border-green-700 transition-all ">
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllDepartments;
