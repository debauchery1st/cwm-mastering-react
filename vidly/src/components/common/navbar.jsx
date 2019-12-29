import React from "react";
import { NavLink } from "react-router-dom";

// input =
// navigation  [
//  {title: "link title", path: "/link/path"},
// ]

const NavBar = ({ brand, navigation, expand }) => {
  const baseClass = "nav-link";
  const hamburgerClasses = ["navbar-collapse collapse", expand].join(" ");
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        {brand.title}
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={hamburgerClasses} id="navbarNav">
        <div className="navbar-nav">
          {navigation.map(navItem => (
            <NavLink
              key={navItem.title}
              className={[baseClass, navItem.classes].join(" ")}
              to={navItem.path}
            >
              {navItem.title}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
