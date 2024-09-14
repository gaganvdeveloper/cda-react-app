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

  const imageSubmit = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);

    axios
      .patch(`http://${Ip}/facultyprofiles`, formData)
      .then((response) => {
        // console.log(response.data);
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
  }, [id, modal]);

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
      <div className="px-40 py-10 flex items-center justify-center">
        <div className="bg-purple-100 flex  justify-center gap-4 px-10 py-8 rounded-3xl">
          <img
            src={photo.substring(54)}
            alt="Profile"
            className="w-96 h-96 object-cover rounded-full"
          />
          <div className="flex flex-col gap-2 items-center ">
            <h1 className="text-2xl font-bold text-white px-28 py-2 rounded-lg bg-yellow-500">
              Faculty Informtion
            </h1>
            <table
              className=" text-green-600 border-collapse border *:text-xl *:font-semibold"
              cellPadding={10}
            >
              <thead>
                <tr>
                  <th colSpan={2}>Faculty Information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Name</td> <td>: {name}</td>
                </tr>
                <tr>
                  <td>Email</td> <td>: {email}</td>
                </tr>
                <tr>
                  <td>Phone</td> <td>: {phone}</td>
                </tr>
                <tr>
                  <td>Office Hours</td> <td>: {officeHours}</td>
                </tr>
                <tr>
                  <td>Department</td> <td>: {departmentName}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex items-center justify-between w-full px-2 mt-10  *:bg-green-600 *:text-white *:font-semibold *:w-32 *:text-center *:rounded-md *:py-1 *:hover:cursor-pointer *:shadow-md *:shadow-black">
              <label htmlFor="file">Upload Image</label>
              <input
                type="file"
                name="file"
                id="file"
                className="hidden"
                onChange={(e) => {
                  imageSubmit(e.target.files[0]);
                  window.location.reload();
                }}
              />
              <button
                onClick={() => {
                  setModal(!modal);
                }}
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
