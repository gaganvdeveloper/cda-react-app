import axios from "axios";
import React, { useState } from "react";
import Ip from "../../Util/Ip";
import { useNavigate, useParams } from "react-router-dom";
const Create = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const nav = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { name, description };
    console.log(payload);
    axios
      .post(`http://${Ip}/departments`, payload)
      .then((response) => {
        console.log(response.data);
        nav(`/administrator/${id}/department`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div class="flex items-start justify-center mt-16 min-h-screen">
      <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-xl">
        <h1 class="text-2xl font-bold mb-6 text-center">
          Enter Department Details
        </h1>
        <form onSubmit={handleSubmit} class="space-y-4 ">
          <div>
            <label
              htmlFor="name"
              class="block text-sm font-medium text-gray-700"
            >
              Department Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              class="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              class="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <input
              type="text"
              name="description"
              id="description"
              class="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
