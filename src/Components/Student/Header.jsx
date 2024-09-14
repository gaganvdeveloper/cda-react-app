import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-green-400">
      <h1>Student Header</h1>
      <ul>
        <NavLink to="search">Search</NavLink>
      </ul>
    </div>
  );
};

export default Header;
