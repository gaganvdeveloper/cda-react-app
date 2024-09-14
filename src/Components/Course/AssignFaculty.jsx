import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Ip from "../../Util/Ip";

const AssignFaculty = ({ setModal, cid }) => {
  const ref = useRef();
  const [faculties, setFaculties] = useState([]);

  const closeModal = (e) => {
    if (e.target === ref.current) setModal(false);
  };

  const handleAssign = (fid) => {
    axios
      .patch(`http://${Ip}/courses/${cid}/${fid}`)
      .then((response) => {
        console.log(response.data);
        setModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://${Ip}/facultyprofiles`)
      .then((response) => {
        console.log(response.data.body);
        setFaculties(response.data.body);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div
      ref={ref}
      onClick={closeModal}
      className="z-10 fixed px-40 inset-0 bg-transparent backdrop-blur-md flex flex-col items-center py-10"
    >
      <div className="w-full rounded-xl  bg-indigo-400 px-10 py-4 flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-bold text-green-700 tracking-widest underline">
          Assign Faculty
        </h1>
        {faculties.map((f, index) => {
          return (
            <div
              key={index}
              className="bg-indigo-400 border rounded-xl  text-white  min-w-full flex py-2 items-center justify-evenly"
            >
              <div className="flex flex-col items-center justify-center">
                <img
                  src={f.photo.substring(54)}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover"
                />
                <h1 className="text-lg font-bold  ">{f.user.name}</h1>
              </div>
              <div className="flex flex-col items-start">
                <h1>Email : {f.user.email}</h1>
                <h1>Phone : {f.user.phone}</h1>
              </div>
              <button
                onClick={() => {
                  handleAssign(f.id);
                }}
                className="bg-green-600 px-6  rounded-md py-1 font-bold"
              >
                Assign
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssignFaculty;
