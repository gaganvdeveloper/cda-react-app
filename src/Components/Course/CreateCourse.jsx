import axios from "axios";
import React, { useEffect, useState } from "react";
import Ip from "../../Util/Ip";
import { useNavigate, useParams } from "react-router-dom";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [departments, setDepartments] = useState([]);
  // const [department, setDepartment] = useState(null);
  const [departmentId, setDepartmentId] = useState("");

  const nav = useNavigate();
  const { id } = useParams();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await axios
  //     .get(`http://${Ip}/departments/${departmentId}`)
  //     .then((response) => {
  //       console.log(response.data.body);
  //       setDepartment(response.data.body);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   const payload = { title, description, department };
  //   console.log(payload);
  //   await axios
  //     .post(`http://${Ip}/courses`, payload)
  //     .then((response) => {
  //       // console.log(response.data);
  //       // nav(`/administrator/${id}/course`);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://${Ip}/departments/${departmentId}`
      );
      const department = response.data.body;
      axios.post(`http://${Ip}/courses`, { title, description, department });
      nav(`/administrator/${id}/course`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get(`http://${Ip}/departments`)
      .then((response) => {
        // console.log(response.data.body);
        setDepartments(response.data.body);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex items-start justify-center mt-16 min-h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Enter Course Details
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <input
              type="text"
              name="description"
              id="description"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700"
            >
              Department:
            </label>
            <select
              name="department"
              id="department"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
              onChange={(e) => {
                setDepartmentId(e.target.value);
              }}
            >
              <option value="1">----Select----</option>
              {departments.map((d, index) => {
                return (
                  <option key={index} value={d.id}>
                    {d.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
