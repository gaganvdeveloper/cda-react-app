import React, { useRef, useEffect, useState } from "react";

const SearchProfile = ({ photo, setStudentsDetaislModal }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  const closeModal = (e) => {
    if (e.target === ref.current) setStudentsDetaislModal(false);
  };

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      ref={ref}
      onClick={closeModal}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div
        className={`transform transition-all duration-300 ease-out ${
          visible ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        <img
          src={photo}
          alt="Profile"
          className="w-60 h-60 rounded-full object-cover shadow-lg shadow-slate-600 transition-transform duration-500 ease-out"
        />
      </div>
    </div>
  );
};

export default SearchProfile;
