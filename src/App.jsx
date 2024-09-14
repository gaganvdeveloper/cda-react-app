import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Login";
import "./index.css";
import Student from "./Components/Student/Student";
import Faculty from "./Components/Faculty/Faculty";
import Administrator from "./Components/Administrator/Administrator";
import Profile from "./Components/Faculty/Profile";
import Home from "./Components/Faculty/Home";
import CreateUser from "./Components/Administrator/CreateUser";
import AllUsers from "./Components/Administrator/AllUsers";
import Search from "./Components/Student/Search";
import Dashboard from "./Components/Administrator/Dashboard";
import Classes from "./Components/Faculty/Classes";
import Header from "./Components/Department/Header";
import Create from "./Components/Department/Create";
import AllDepartments from "./Components/Department/AllDepartments";
import CourseHeader from "./Components/Course/CourseHeader";
import AllCourses from "./Components/Course/AllCourses";
import CreateCourse from "./Components/Course/CreateCourse";
import UsersHeader from "./Components/Administrator/UsersHeader";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <h1>404 Error</h1>,
    },
    {
      path: "/student/:id",
      element: <Student />,
      children: [
        {
          path: "search",
          element: <Search />,
        },
      ],
    },
    {
      path: "/faculty/:id",
      element: <Faculty />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "classes",
          element: <Classes />,
        },
      ],
      errorElement: <h1>404 Error</h1>,
    },
    {
      path: "/administrator/:id",
      element: <Administrator />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "users",
          element: <UsersHeader />,
          children: [
            {
              path: "",
              element: <AllUsers />,
            },
            {
              path: "create",
              element: <CreateUser />,
            },
          ],
        },
        {
          path: "create",
          element: <CreateUser />,
        },
        {
          path: "department",
          element: <Header />,
          children: [
            {
              path: "create",
              element: <Create />,
            },
            {
              path: "",
              element: <AllDepartments />,
            },
          ],
        },
        {
          path: "course",
          element: <CourseHeader />,
          children: [
            {
              path: "",
              element: <AllCourses />,
            },
            {
              path: "create",
              element: <CreateCourse />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
