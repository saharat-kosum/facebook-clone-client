import React, { useEffect, useState } from "react";
import { PostType } from "../../type";
import { useAppSelector } from "../../redux/Store";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function Post(props : PostType) {
  const profilePicture = useAppSelector((state) => state.auth.mockIMG);
  const prefix_img_url = process.env.REACT_APP_PREFIX_URL_IMG;
  const [createDate, setCreateDate] = useState("");
  const userData = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.createdAt) {
      const formattedDate = format(
        new Date(props.createdAt),
        "dd MMM yyyy hh:mm a"
      );
      setCreateDate(formattedDate);
    }
  }, [props]);

  const userNavigator = (id : string) => {
    navigate(`/profile/${id}`)
  }

  return (
    <div
      className="rounded-3 border bg-white shadow-sm py-2 px-2 px-md-3 mt-3"
      style={{ maxWidth: "680px" }}
    >
      <div className="d-flex align-items-center gap-2 mb-2">
        <img
          alt="profile"
          className="rounded-circle border hover-cursor"
          src={
            props.userPicturePath
              ? prefix_img_url + props?.userPicturePath
              : profilePicture
          }
          style={{ width: "36px", height: "36px", objectFit: "cover" }}
          onClick={()=>{
            if(props.userId){
              userNavigator(props.userId)
            }
          }}
        />
        <div className="d-flex justify-content-between w-100">
          <div>
            <div className="fw-bold text-capitalize hover-cursor"
            onClick={()=>{
              if(props.userId){
                userNavigator(props.userId)
              }
            }}
            >{props.firstName} {props.lastName}</div>
            <div className="text-black-50" style={{marginTop:"-5px", fontSize:"small"}}>{createDate}</div>
          </div>
          <div className="d-flex">
            <i className="bi bi-three-dots ms-1 create-hover-color rounded-circle p-2" style={{height:"fit-content"}}></i>
            <i className="bi bi-x-lg create-hover-color rounded-circle p-2" style={{height:"fit-content"}}></i>
          </div>
        </div>
      </div>
      <div>{props.description}</div>
      {props.picturePath && <img
        alt="post"
        className="w-100 h-100 rounded mt-1"
        src={prefix_img_url + props?.picturePath}
        style={{ width: "36px", height: "36px", objectFit: "cover" }}
      />}
      <div className="d-flex justify-content-between w-100 my-2">
        <div><i className="bi bi-heart-fill text-danger me-1"></i>10 Likes</div>
        <div>10 Comments</div>
      </div>
      <div className="d-flex justify-content-around text-secondary border-top border-bottom">
        <div className="d-flex my-1 align-items-center gap-1 create-hover-color rounded p-1 w-100 justify-content-center">
          <i className="bi bi-heart-fill fs-5"></i>
          <div>Like</div>
        </div>
        <div className="d-flex my-1 align-items-center gap-1 create-hover-color rounded p-1 w-100 justify-content-center">
          <i className="bi bi-chat-left fs-5"></i>
          <div>Comment</div>
        </div>
        <div className="d-flex my-1 align-items-center gap-1 create-hover-color rounded p-1 w-100 justify-content-center">
          <i className="bi bi-box-arrow-up-right fs-5"></i>
          <div>Share</div>
        </div>
      </div>
      <div className="d-flex align-items-center gap-2 mt-2">
        <img
          alt="profile"
          className="rounded-circle border"
          src={
            userData?.picturePath
              ? prefix_img_url + userData?.picturePath
              : profilePicture
          }
          style={{ width: "36px", height: "36px", objectFit: "cover" }}
        />
        <input
          className="form-control rounded-pill"
          type="text"
          placeholder="Write a comment..."
        />
        <i className="bi bi-send-fill create-hover-color rounded-circle p-2"></i>
      </div>
      <div className="d-flex align-items-center gap-2 my-2">
        <div className="create-hover-color rounded-circle p-2" >pic</div>
        <div className="rounded-3 p-1 comment-bg">
          <div className="text-capitalize" style={{fontWeight:"450"}}>name</div>
          <div className="" style={{marginTop:"-5px"}}>comment asdasdasdasd asdasd asdasd asd asd asd asd asd asd asdas dasd as</div>
        </div>
      </div>
      <div className="d-flex align-items-center gap-2 my-2">
        <div className="create-hover-color rounded-circle p-2" >pic</div>
        <div className="rounded-3 p-1 comment-bg" >
          <div className="">name</div>
          <div className="" style={{marginTop:"-5px"}}>comment</div>
        </div>
      </div>
    </div>
  );
}

export default Post;
