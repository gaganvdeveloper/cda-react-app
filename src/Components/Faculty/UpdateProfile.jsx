import axios from "axios";
import React, { useRef, useState } from "react";
import Ip from "../../Util/Ip";

const UpdateProfile = ({ setModal, id, email1, phone1, officeHours1 }) => {
  const ref = useRef();

  const [email, setEmail] = useState(email1);
  const [phone, setPhone] = useState(phone1);
  const [officeHours, setOfficeHours] = useState(officeHours1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("officeHours", officeHours);
    axios
      .patch(`http://${Ip}/facultyprofiles/update`, formData)
      .then((response) => {
        console.log(response.data);
        setModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
    // window.location.reload(`/faculty/${id}/profile`);
  };

  const closeProfile = (e) => {
    if (e.target === ref.current) {
      setModal(false);
    }
  };

  return (
    <div
      ref={ref}
      className="z-10 fixed inset-0 bg-transparent backdrop-blur-md  flex items-center justify-center"
      onClick={closeProfile}
    >
      <div className="w-1/3 text-gray-400 px-6 py-4 flex flex-col items-end justify-start">
        <h1
          className="text-2xl cursor-pointer"
          onClick={() => {
            setModal(false);
          }}
        >
          X
        </h1>
        <div className="bg-indigo-700 text-white px-4 py-4 h-full w-full flex flex-col items-center justify-start rounded-lg">
          <h1 className="text-xl font-bold text-white mb-4">Update Info</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 px-6 w-full py-4 rounded-lg bg-indigo-700"
          >
            <label htmlFor="email" className="mb-2">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="p-2 rounded-md text-black"
            />
            <label htmlFor="phone" className="mb-2">
              Phone:
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              className="p-2 rounded-md text-black"
            />
            <label htmlFor="time" className="mb-2">
              Office Hours:
            </label>
            <input
              type="time"
              name="time"
              id="time"
              value={officeHours}
              onChange={(e) => {
                setOfficeHours(e.target.value);
              }}
              className="p-2 rounded-md text-black"
            />
            <button
              type="submit"
              className="bg-green-400 rounded-md text-white font-bold py-2 mt-4"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
