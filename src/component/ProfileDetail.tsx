import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux/Store";
import { format } from "date-fns";

function ProfileDetail() {
  const userData = useAppSelector((state) => state.auth.user);
  const prefix_img_url = process.env.REACT_APP_PREFIX_URL_IMG;
  const profilePicture = useAppSelector((state) => state.auth.mockIMG);

  const parseDate = (date : Date) => {
    const formattedDate = format(
      new Date(date),
      "dd MMM yyyy"
    );
    return formattedDate
  }

  return (
    userData && <div
      className="rounded-3 border bg-white shadow-sm mt-3 p-3 position-relative"
      style={{ height: "fit-content" }}
    >
      <img
        src={
          userData?.picturePath
            ? prefix_img_url + userData?.picturePath
            : profilePicture
        }
        alt="Profile"
        className="rounded-circle border m-auto d-block position-absolute end-0 start-0"
        style={{
          width: "150px",
          height: "150px",
          objectFit: "cover",
          top: "-75px",
        }}
      />
      <div className="text-center" style={{ marginTop: "75px" }}>
        <h4>
          {userData?.firstName} {userData?.lastName}
        </h4>
        <h5>{userData?.occupation}</h5>
      </div>
      {userData.createdAt ? 
      <p className="mt-4">
        <i className="bi bi-clock-fill me-2"></i>Joined on {parseDate(userData?.createdAt)}
      </p>
      : null}
      <p>
        <i className="bi bi-geo-alt-fill me-2"></i>{userData?.location}
      </p>
      <p>
        <i className="bi bi-envelope-fill me-2"></i>
        {userData?.email}
      </p>
      <p>
        <i className="bi bi-calendar-week me-2"></i>
        {userData?.dateOfBirth}
      </p>
      <div className="btn btn-secondary w-100 me-2">Edit Profile</div>
    </div>
  );
}

export default ProfileDetail;
