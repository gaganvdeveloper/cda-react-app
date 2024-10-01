import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ButtonSpinner from "../../Util/ButtonSpinner";
import Ip from "../../Util/Ip";
import SuccessModal from "../../Util/SuccessModal";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { name, email, phone, password, username, role: "STUDENT" };
    axios
      .post(`http://${Ip}/users`, payload)
      .then((response) => {
        setSuccessModal(true);
      })
      .catch((error) => {
        console.log(error);
        setButtonSpinner(false);
        alert("Please Try After Sometime...");
      });
  };

  return (
    <>
      {successModal && <SuccessModal a={setSuccessModal} name={name} />}
      <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl">
          <div className="flex items-center justify-center mb-6">
            <div className="text-4xl tracking-widest font-bold text-green-600">
              CDA
            </div>
          </div>
          <h1 className="text-2xl tracking-widest underline sm:text-3xl font-bold text-center text-gray-700 mb-6">
            Create Account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-1 text-sm sm:text-base"
              >
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1 text-sm sm:text-base"
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                  setUsername(e.target.value.split("@")[0]);
                }}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-gray-700 font-medium mb-1 text-sm sm:text-base"
              >
                Phone:
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className={`w-full  px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none`}
                required
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-1 text-sm sm:text-base"
              >
                Username:
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1 text-sm sm:text-base"
              >
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              onClick={() => {
                setButtonSpinner(true);
              }}
              className={`w-full outline-none  text-white font-semibold py-2 rounded-md transition duration-200 ${
                buttonSpinner
                  ? ` cursor-not-allowed  bg-green-400 `
                  : `bg-green-500 hover:bg-green-600 `
              }`}
            >
              {buttonSpinner ? <ButtonSpinner /> : "Create Account"}
            </button>
          </form>
          <h1 className="text-slate-500 pt-8 text-center">
            Allready have an Account...???&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/" className=" text-indigo-600 underline ">
              Login here
            </Link>
          </h1>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
