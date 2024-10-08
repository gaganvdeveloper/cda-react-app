import axios from "axios";
import React, { useEffect, useState } from "react";
import Ip from "../../Util/Ip";
import { PuffLoader } from "react-spinners";
import SearchProfile from "./SearchProfile";

const Search = () => {
  const [photo, setPhoto] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([]);
  const [studentsDetaislModal, setStudentsDetaislModal] = useState(false);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    axios
      .get(`http://${Ip}/studentprofiles`)
      .then((response) => {
        console.log(response.data.body);
        setStudents(response.data.body);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload, searchQuery, studentsDetaislModal]);

  const filteredStudents = students.filter((student) =>
    student.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {studentsDetaislModal && (
        <SearchProfile
          photo={photo}
          setStudentsDetaislModal={setStudentsDetaislModal}
        />
      )}
      <div className="p-4 lg:px-48 md:px-20   bg-green-100 min-h-screen">
        <h2 className="text-2xl text-green-700 font-bold mb-4">
          Search for Other Students
        </h2>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Type name to search"
            className="p-2 border outline-green-600 border-gray-300 rounded-md flex-grow"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setReload(true);
              setTimeout(() => {
                setReload(false);
              }, 500);
            }}
          />
          <button className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md">
            Search
          </button>
        </div>
        {reload && <PuffLoader className="m-auto" size={110} />}
        {!reload && (
          <table className="min-w-full border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-green-500 text-white">
                <th className="px-4 py-2">Profile</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Year</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 && searchQuery.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr
                    key={index}
                    className="border-t *:text-center hover:bg-white  hover:text-green-700 border-gray-200"
                  >
                    <td className="px-4 py-2">
                      <img
                        onClick={() => {
                          setPhoto(student.photo);
                          setStudentsDetaislModal(true);
                        }}
                        src={student.photo}
                        alt="Profile"
                        className="w-16 rounded-full  "
                      />
                    </td>
                    <td className="px-4 py-2">
                      {(student.user.name + "").length < 15
                        ? student.user.name
                        : student.user.name.substring(0, 8) + "..."}
                    </td>
                    <td className="px-4 py-2">
                      {student.department === null
                        ? "Department Not Assigned"
                        : student.department.name}
                    </td>
                    <td className="px-4 py-2">
                      {student.year === null
                        ? "Year Not Assigned"
                        : student.year}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-center">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Search;
