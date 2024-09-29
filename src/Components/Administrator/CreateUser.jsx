import axios from "axios";
import React, { useState } from "react";
import Ip from "../../Util/Ip";
import { useNavigate, useParams } from "react-router-dom";
import ButtonSpinner from "../../Util/ButtonSpinner";

const CreateUser = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { name, email, phone, password, username, role };
    axios
      .post(`http://${Ip}/users`, payload)
      .then((response) => {
        console.log(response.data);
        nav(`/administrator/${id}/users`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-700 mb-6">
          Enter Details
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
              onChange={(e) => setEmail(e.target.value)}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
              onChange={(e) => setPhone(e.target.value)}
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

          <div>
            <label
              htmlFor="role"
              className="block text-gray-700 font-medium mb-1 text-sm sm:text-base"
            >
              Role:
            </label>
            <select
              name="role"
              id="role"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="STUDENT">----SELECT----</option>
              <option value="STUDENT">STUDENT</option>
              <option value="FACULTY">FACULTY</option>
              <option value="ADMINISTRATOR">ADMINISTRATOR</option>
            </select>
          </div>

          <button
            type="submit"
            onClick={() => {
              setButtonSpinner(true);
            }}
            className="w-full bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition duration-200"
          >
            {buttonSpinner ? <ButtonSpinner /> : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
