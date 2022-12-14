import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__title">
        <NavLink
          className={({ isActive }) =>
            isActive ? "active sidebar__navlink" : "inactive sidebar__navlink"
          }
          to="/"
        >
          Home
        </NavLink>
      </div>
      <div className="sidebar__title">
        <NavLink
          className={({ isActive }) =>
            isActive ? "active sidebar__navlink" : "inactive sidebar__navlink"
          }
          to="/cities"
        >
          Cities
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
