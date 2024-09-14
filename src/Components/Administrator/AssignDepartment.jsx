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
        console.log(response.data.body.role);
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
      className="z-20 fixed inset-0 backdrop-blur-md flex flex-col items-center justify-center py-10 "
    >
      <div className="bg-purple-600 flex flex-col  rounded-xl text-white px-12 py-8">
        {departments.map((d, index) => {
          return (
            <>
              <div className=" rounded-lg py-2 px-8 hover:bg-green-500   flex gap-4">
                <form>
                  <input
                    type="checkbox"
                    name="assign"
                    id="assign"
                    onChange={() => {
                      handleAssign(d.id);
                      setTimeout(() => {
                        setDepartmentModal(false);
                      }, 300);
                    }}
                  />
                </form>
                <h1>{d.name}</h1>
              </div>
            </>
          );
        })}
        <button
          onClick={() => {
            setDepartmentModal(false);
          }}
          className="mt-8 bg-white w-fit text-red-600 text-xl font-semibold px-4 rounded-md border-2 border-red-700 m-auto "
        >
          close
        </button>
      </div>
    </div>
  );
};

export default AssignDepartment;
