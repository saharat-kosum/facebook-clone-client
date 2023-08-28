import React from "react";

function Contact() {
  return (
    <div className="mt-3 me-3">
      <div className="">
        <h5>Birthdays</h5>
        <div
          className="rounded p-2 sidebar-hover-color w-100 text-start lh-base"
          style={{ marginLeft: "-10px" }}
        >
          <i className="bi bi-gift me-2 fs-4" style={{ color: "red" }}></i>
          Someone's birthday is today.
        </div>
      </div>
      <hr></hr>
      <div>
        <div className="d-flex justify-content-between">
          <h5>Contacts</h5>
          <div>
            <i className="bi bi-search sidebar-hover-color rounded-circle p-2"></i>
            <i className="bi bi-three-dots ms-1 sidebar-hover-color rounded-circle p-2"></i>
          </div>
        </div>
        <ul className="" style={{ padding: "unset", width: "270px" }}>
          <li className="rounded p-2 sidebar-hover-color w-100 text-start lh-base">
            <i className="pe-2 fs-5 bi bi-people-fill"></i>Friends
          </li>
          <li className="rounded p-2 sidebar-hover-color w-100 text-start lh-base">
            <i className="pe-2 fs-5 bi bi-people-fill"></i>Friends
          </li>
          <li className="rounded p-2 sidebar-hover-color w-100 text-start lh-base">
            <i className="pe-2 fs-5 bi bi-people-fill"></i>Friends
          </li>
          <li className="rounded p-2 sidebar-hover-color w-100 text-start lh-base">
            <i className="pe-2 fs-5 bi bi-people-fill"></i>Friends
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Contact;
