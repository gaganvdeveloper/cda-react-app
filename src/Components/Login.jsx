import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Ip from "../Util/Ip";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://${Ip}/users/login`, { username, password })
      .then((response) => {
        nav(
          `${response.data.body.role}`.toLowerCase() +
            "/" +
            response.data.body.id
        );
      })
      .catch((error) => {
        alert("Invalid Username or Password");
        console.log(error);
        window.location.reload("/"); // Consider using navigation instead of reloading the page
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-6">
          <div className="text-4xl font-bold text-green-600">CDA</div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Login Here
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
