import React from "react";
import picture from "./facebookIcon.svg";
import { useMediaQuery } from "../../utils/useMediaQuery";
import CreateAccount from "../../component/modals/CreateAccount";

function IndexPage() {
  const isTablet = useMediaQuery("(min-width: 767px)");
  return (
    <div className="container" style={{ height: "100vh" }}>
      <CreateAccount />
      <div
        className={`d-flex justify-content-evenly align-items-center ${
          isTablet ? "" : "flex-column gap-4"
        }`}
        style={{ height: isTablet ? "70vh" : "unset" }}
      >
        <div className={`${isTablet ? "w-50 " : "mt-5 text-center"} `}>
          <img src={picture} alt="facebook logo" style={{ width: "270px" }} />
          <h2 className="">
            Facebook helps you connect and share with the people in your life.
          </h2>
        </div>
        <div className="text-center">
          <div
            className="border rounded p-3 shadow mb-4"
            style={{ backgroundColor: "white" }}
          >
            <div className="mb-3">
              <input
                type="text"
                className="form-control lh-lg"
                placeholder="Email address"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control lh-lg"
                placeholder="Password"
              />
            </div>
            <div className="btn btn-primary w-100 lh-lg">Log in</div>
            <p className="mt-2">Forgotten password?</p>
            <div className="border-bottom"></div>
            <div className="btn btn-success mt-3 lh-lg" data-bs-toggle="modal" data-bs-target="#createAccountModal">Create new account</div>
          </div>
          <b>Create a Page</b> for a celebrity, brand or business.
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
