import React from "react";
import { PulseLoader } from "react-spinners";

const ButtonSpinner = () => {
  return (
    <>
      <PulseLoader size={8} color="white" speedMultiplier={0.7} />
    </>
  );
};

export default ButtonSpinner;
