import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "../../utils/useMediaQuery";

function NavBar() {
  const isTablet = useMediaQuery("(min-width: 570px)");

  return (
    <nav
      className="navbar sticky-top bg-white shadow-sm"
      style={{ height: "6vh", padding: "unset" }}
    >
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <Link
            className="navbar-brand"
            to="/home"
            style={{ color: "inherit", padding: "unset" }}
          >
            <i className="bi bi-facebook fs-1" style={{color:"#1B74E4"}}></i>
          </Link>
          {isTablet && (
            <form
              className="d-flex rounded-pill border ps-1"
              style={{ height: "fit-content" }}
            >
              <input
                className="form-control rounded-pill"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ border: "none" }}
              />
              <button className="btn" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>
          )}
        </div>
        <ul className="d-flex gap-2 fs-5" style={{ marginBottom: "unset" }}>
          <li>
            <i className="bi bi-moon-fill p-2 bg-secondary-subtle rounded-circle hover-cursor"></i>
          </li>
          <li>
            <i className="bi bi-chat-dots-fill p-2 bg-secondary-subtle rounded-circle hover-cursor"></i>
          </li>
          <li>
            <i className="bi bi-bell-fill p-2 bg-secondary-subtle rounded-circle hover-cursor"></i>
          </li>
          <li>
            <i className="bi bi-person-fill p-2 bg-secondary-subtle rounded-circle hover-cursor"></i>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
