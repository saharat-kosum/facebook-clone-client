import React from "react";
import { useAppSelector } from "../redux/Store";
import { format } from "date-fns";
import { UserType } from "../type";

function ProfileDetail(props : UserType) {
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
    <div
      className="rounded-3 border bg-white shadow-sm mt-3 p-3 position-relative"
      style={{ height: "fit-content" }}
    >
      <img
        src={
          props?.picturePath
            ? prefix_img_url + props?.picturePath
            : profilePicture
        }
        alt="Profile"
        className="rounded-circle border m-auto d-block position-absolute end-0 start-0 "
        style={{
          width: "150px",
          height: "150px",
          objectFit: "cover",
          top: "-75px",
        }}
      />
      <div className="text-center" style={{ marginTop: "75px" }}>
        <h4 className="text-capitalize">
          {props.firstName} {props?.lastName}
        </h4>
        <h5>{props.occupation}</h5>
      </div>
      {props.createdAt ? 
      <p className="mt-4">
        <i className="bi bi-clock-fill me-2"></i>Joined on {parseDate(props.createdAt)}
      </p>
      : null}
      <p>
        <i className="bi bi-geo-alt-fill me-2"></i>{props.location}
      </p>
      <p>
        <i className="bi bi-envelope-fill me-2"></i>
        {props.email}
      </p>
      <p>
        <i className="bi bi-calendar-week me-2"></i>
        {props.dateOfBirth}
      </p>
      <div className="btn btn-secondary w-100 me-2">Edit Profile</div>
    </div>
  );
}

export default ProfileDetail;