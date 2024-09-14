import axios from "axios";
import React, { useRef } from "react";
import Ip from "../../Util/Ip";

const AssignYear = ({ setYearModal, userId }) => {
  const ref = useRef();

  const closeModal = (e) => {
    if (e.target === ref.current) setYearModal(false);
  };

  const handleYear = (year) => {
    console.log(year);
    axios
      .patch(`http://${Ip}/studentprofiles/year/${userId}/${year}`)
      .then((response) => {
        console.log(response.data);
        setTimeout(() => {
          setYearModal(false);
        }, 200);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      onClick={closeModal}
      ref={ref}
      className="z-20 inset-0 fixed backdrop-blur-md flex flex-clo items-center justify-center"
    >
      <div className="h-fit w-fit flex flex-col gap-4 items-center shadow-xl shadow-gray-600 bg-white text-green-700 font-semibold px-8 py-4 rounded-lg">
        <h1 className="text-xl font-bold tracking-widest underline  ">
          Select Year
        </h1>
        <div className="w-full">
          <form className="flex gap-4 items-center ">
            <input
              type="checkbox"
              name="year"
              id="first"
              onChange={() => {
                handleYear("FIRST");
              }}
            />
            <label htmlFor="first">First</label>
          </form>
          <form className="flex gap-4 items-center ">
            <input
              type="checkbox"
              name="year"
              id="second"
              onChange={() => {
                handleYear("SECOND");
              }}
            />
            <label htmlFor="second">Second</label>
          </form>
          <form className="flex gap-4 items-center ">
            <input
              type="checkbox"
              name="year"
              id="third"
              onChange={() => {
                handleYear("THIRD");
              }}
            />
            <label htmlFor="third">Third</label>
          </form>
          <form className="flex gap-4 items-center ">
            <input
              type="checkbox"
              name="year"
              id="fourth"
              onChange={() => {
                handleYear("FOURTH");
              }}
            />
            <label htmlFor="fourth">Fourth</label>
          </form>
        </div>
        <button
          onClick={() => {
            setYearModal(false);
          }}
          className="text-red-500 border-2 px-2 border-red-500 rounded-md"
        >
          close
        </button>
      </div>
    </div>
  );
};

export default AssignYear;
