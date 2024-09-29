import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Ip from "../Util/Ip";
import ButtonSpinner from "../Util/ButtonSpinner";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reload, setReload] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    setUsername("");
    setPassword("");
  }, [reload]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      axios
        .post(`http://${Ip}/users/login`, { username, password })
        .then((response) => {
          nav(
            `${response.data.body.role}`.toLowerCase() +
              "/" +
              response.data.body.id
          );

          setInvalidCredentials(!invalidCredentials);
        })
        .catch((error) => {
          console.log(error);
          setReload(!reload);
          setButtonSpinner(false);
          setInvalidCredentials(true);
        });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-6">
          <div className="text-4xl font-bold tracking-widest  text-green-600">CDA</div>
        </div>
        <h1 className="text-2xl  font-bold text-center mb-6 text-gray-700">
          Login Here
        </h1>
        {invalidCredentials && (
          <h1 className="text-red-500 shadow-sm shadow-red-500 px-2 py-1 mb-2 rounded-lg w-fit  text-center m-auto">
            Invalid Credentilas Please Check it
          </h1>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username:
            </label>
            <input
              required
              type="text"
              name="username"
              id="username"
              value={username}
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
              required
              type="password"
              name="password"
              id="password"
              value={password}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            onClick={() => {
              setButtonSpinner(true);
              setInvalidCredentials(false);
            }}
            className={`${
              buttonSpinner
                ? ` cursor-not-allowed bg-green-400 `
                : `bg-green-500 hover:bg-green-600`
            }    w-full  text-white py-2 outline-none rounded-md  transition duration-300`}
          >
            {buttonSpinner ? <ButtonSpinner /> : "Login"}
          </button>
          <h1 className="text-slate-500 text-center">
            Don't have Account?...&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/createaccount" className=" text-indigo-600 underline ">
              Create Account
            </Link>
          </h1>
        </form>
      </div>
    </div>
  );
};

export default Login;
