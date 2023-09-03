import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "../../utils/useMediaQuery";
import { useAppSelector } from "../../redux/Store";

function NavBar() {
  const isTablet = useMediaQuery("(min-width: 570px)");
  const userData = useAppSelector((state) => state.auth.user);
  const prefix_img_url = process.env.REACT_APP_PREFIX_URL_IMG;
  const profilePicture = useAppSelector((state) => state.auth.mockIMG);
  const navigate = useNavigate();

  const logOutHandle = () => {
    sessionStorage.removeItem("userToken");
    navigate("/");
  };

  const profile = () => {
    navigate(`/profile/${userData?._id}`);
  };

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
            <i className="bi bi-facebook fs-1" style={{ color: "#1B74E4" }}></i>
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
        <ul
          className="d-flex gap-2 fs-5 align-items-center"
          style={{ marginBottom: "unset" }}
        >
          <li>
            <i className="bi bi-list p-2 bg-secondary-subtle rounded-circle hover-cursor"></i>
          </li>
          <li>
            <i className="bi bi-chat-dots-fill p-2 bg-secondary-subtle rounded-circle hover-cursor"></i>
          </li>
          <li>
            <i className="bi bi-bell-fill p-2 bg-secondary-subtle rounded-circle hover-cursor"></i>
          </li>
          <li className="btn-group " data-bs-toggle="dropdown">
            <img
              alt="profile"
              className="rounded-circle border hover-cursor"
              src={
                userData?.picturePath
                  ? prefix_img_url + userData?.picturePath
                  : profilePicture
              }
              style={{ width: "38px", height: "38px", objectFit: "cover" }}
            />
            <ul className="dropdown-menu end-0" style={{ left: "unset" }}>
              <li onClick={() => profile()}>
                <div className="dropdown-item hover-cursor">Profile</div>
              </li>
              <li onClick={() => logOutHandle()}>
                <div className="dropdown-item hover-cursor">Log Out</div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
