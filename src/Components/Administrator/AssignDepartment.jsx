import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Ip from "../../Util/Ip";

const AssignDepartment = ({ setDepartmentModal, userId }) => {
  const ref = useRef();
  const [departments, setDepartments] = useState([]);

  const closeModal = (e) => {
    if (e.target === ref.current) setDepartmentModal(false);
  };

  const handleAssign = (id) => {
    axios
      .get(`http://${Ip}/users/${userId}`)
      .then((response) => {
        if (response.data.body.role === "STUDENT") {
          axios
            .patch(`http://${Ip}/studentprofiles/${userId}/${id}`)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (response.data.body.role === "FACULTY") {
          axios
            .patch(`http://${Ip}/facultyprofiles/${userId}/${id}`)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
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
    <div
      onClick={closeModal}
      ref={ref}
      className="z-20 fixed inset-0 backdrop-blur-md flex flex-col items-center justify-center px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12"
    >
      <div className="bg-slate-600 overflow-y-auto h-2/3 flex flex-col rounded-md text-white px-4 py-6 md:px-8 md:py-8 lg:px-12 lg:py-10 w-full max-w-md lg:max-w-2xl">
        <div className="flex flex-col gap-4">
          {departments.map((d, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-slate-400 rounded-lg hover:bg-slate-200 hover:text-slate-700 transition-colors"
            >
              <input
                type="checkbox"
                name="assign"
                id={`assign-${d.id}`}
                className="accent-green-500"
                onChange={() => {
                  handleAssign(d.id);
                  setTimeout(() => {
                    setDepartmentModal(false);
                  }, 300);
                }}
              />
              <label
                htmlFor={`assign-${d.id}`}
                className="text-sm md:text-base"
              >
                {d.name}
              </label>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setDepartmentModal(false);
          }}
          className="mt-6 bg-white text-red-600 text-lg font-semibold px-4 py-2 rounded-md border-2 border-red-700 w-full max-w-xs mx-auto transition-all hover:bg-red-50"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AssignDepartment;
