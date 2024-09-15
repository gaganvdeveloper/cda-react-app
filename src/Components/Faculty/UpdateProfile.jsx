import axios from "axios";
import React, { useRef, useState } from "react";
import Ip from "../../Util/Ip";
import { CircleXIcon } from "lucide-react";

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
  };

  const closeProfile = (e) => {
    if (e.target === ref.current) {
      setModal(false);
    }
  };

  return (
    <div
      ref={ref}
      className="fixed inset-0 bg-transparent backdrop-blur-md z-10 flex items-center justify-center"
      onClick={closeProfile}
    >
      <div className="w-full sm:w-2/3 lg:w-1/3 px-4 sm:px-6 py-6 flex flex-col items-end justify-start">
        <h1
          className="text-2xl -mb-10 z-10 mr-4 cursor-pointer"
          onClick={() => {
            setModal(false);
          }}
        >
          <CircleXIcon size={25} color="white" />
        </h1>
        <div className="bg-indigo-700 text-white px-4 py-6 w-full rounded-lg">
          <h1 className="text-xl font-bold text-white mb-4 text-center">
            Update Info
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div>
              <label htmlFor="email" className="block mb-2">
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-md text-black"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2">
                Phone:
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 rounded-md text-black"
              />
            </div>

            <div>
              <label htmlFor="time" className="block mb-2">
                Office Hours:
              </label>
              <input
                type="time"
                name="time"
                id="time"
                value={officeHours}
                onChange={(e) => setOfficeHours(e.target.value)}
                className="w-full p-2 rounded-md text-black"
              />
            </div>

            <button
              type="submit"
              className="bg-green-400 w-full rounded-md text-white font-bold py-2 mt-4 hover:bg-green-500 transition duration-300"
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
