import axios from "axios";
import React, { useEffect, useState } from "react";
import Ip from "../../Util/Ip";
import { useParams } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState("");
  const [officeHours, setOfficeHours] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [modal, setModal] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [reload, setReload] = useState(false);

  const imageSubmit = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);
    axios
      .patch(`http://${Ip}/facultyprofiles`, formData)
      .then((response) => {
        console.log(response.data);
        setReload(!reload);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://${Ip}/facultyprofiles/${id}`)
      .then((response) => {
        setPhoto(response.data.body.photo);
        setName(response.data.body.user.name);
        setEmail(response.data.body.user.email);
        setPhone(response.data.body.user.phone);
        setOfficeHours(response.data.body.officeHours);
        setDepartmentName(
          response.data.body.department === null
            ? "Not Assigned"
            : response.data.body.department.name
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, modal, reload]);

  return (
    <>
      {modal && (
        <UpdateProfile
          id={id}
          setModal={setModal}
          email1={email}
          phone1={phone}
          officeHours1={officeHours}
        />
      )}
      <div className="px-4 bg-green-100 h-screen md:px-20 py-10 flex items-start justify-center">
        <div className="bg-purple-100 flex flex-wrap justify-center gap-6 px-4 md:px-10 py-8 rounded-3xl">
          {/* Image section */}
          <img
            src={photo}
            alt="Profile"
            className="w-60 h-60 object-cover rounded-full"
          />

          {/* Info section */}
          <div className="flex flex-col gap-4 items-center text-center sm:text-left">
            <h1 className="text-2xl font-bold text-white px-8 py-2 rounded-lg bg-yellow-500">
              Faculty Information
            </h1>
            <table className="text-green-600 border-collapse text-sm sm:text-base md:text-lg font-semibold">
              <tbody>
                <tr>
                  <td className="font-bold">Name</td>
                  <td className="pl-2">: {name}</td>
                </tr>
                <tr>
                  <td className="font-bold">Email</td>
                  <td className="pl-2">: {email}</td>
                </tr>
                <tr>
                  <td className="font-bold">Phone</td>
                  <td className="pl-2">: {phone}</td>
                </tr>
                <tr>
                  <td className="font-bold">Office Hours</td>
                  <td className="pl-2">: {officeHours}</td>
                </tr>
                <tr>
                  <td className="font-bold">Department</td>
                  <td className="pl-2">: {departmentName}</td>
                </tr>
              </tbody>
            </table>

            {/* Upload and Edit buttons */}
            <div className="flex sm:flex-row items-center justify-between w-full mt-6 gap-4">
              <label
                htmlFor="file"
                className="bg-green-500 w-30 text-white font-semibold px-2 py-1 rounded-md cursor-pointer shadow-md hover:bg-green-600"
              >
                Upload Image
              </label>
              <input
                type="file"
                name="file"
                id="file"
                className="hidden"
                onChange={(e) => {
                  imageSubmit(e.target.files[0]);
                }}
              />
              <button
                onClick={() => setModal(!modal)}
                className="bg-green-500 w-30 text-white font-semibold px-2 py-1 rounded-md shadow-md hover:bg-green-600"
              >
                Edit Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
