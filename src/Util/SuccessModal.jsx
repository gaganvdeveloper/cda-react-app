import { X } from "lucide-react";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SuccessModal = ({ name, a }) => {
  const ref = useRef();
  const nav = useNavigate();
  const closeModal = (e) => {
    if (e.target === ref.current) {
      a(false);
      nav("/");
    }
  };

  return (
    <div
      ref={ref}
      onClick={closeModal}
      className="inset-0 fixed flex flex-col backdrop-blur-lg items-center justify-end "
    >
      <div className="h-[30%] flex flex-col justify-start place-items-end  w-full lg:w-1/3  z-50 py-2 px-4 backdrop-blur-sm text-white font-semibold rounded-t-3xl bg-purple-600">
        <X
          size={35}
          color="white"
          onClick={() => {
            a(false);
            nav("/");
          }}
        />
        <div className="w-full flex flex-col ">
          <h1 className="text-xl">Dear {name}</h1>
          <h1 className="text-3xl text-center font-bold">
            Your Account Created !
          </h1>
          <h1 className="text-center ">Please Check your Email </h1>
          <h1 className="text-center ">for</h1>
          <h1 className="text-center ">More Details</h1>
          <button
            onClick={() => {
              a(false);
              nav("/");
            }}
            className="bg-green-500 px-6 py-2 font-semibold my-2 outline-none rounded-lg text-xl"
          >
            Click here to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
