import React from "react";

function Post() {
  return (
    <div
      className="rounded-3 border bg-white shadow-sm py-2 px-2 px-md-3 mt-3"
      style={{ maxWidth: "680px" }}
    >
      <div className="d-flex align-items-center gap-2 mb-2">
        <div className="create-hover-color rounded-circle p-2" >pic</div>
        <div className="d-flex justify-content-between w-100">
          <div>
            <div className="fw-bold">name</div>
            <div className="text-black-50" style={{marginTop:"-5px", fontSize:"small"}}>time</div>
          </div>
          <div className="d-flex">
            <i className="bi bi-three-dots ms-1 create-hover-color rounded-circle p-2" style={{height:"fit-content"}}></i>
            <i className="bi bi-x-lg create-hover-color rounded-circle p-2" style={{height:"fit-content"}}></i>
          </div>
        </div>
      </div>
      <div>description</div>
      <div>img</div>
      <div className="d-flex justify-content-between w-100">
        <div>Like count</div>
        <div>Comment count</div>
      </div>
      <div className="d-flex justify-content-around text-secondary border-top border-bottom">
        <div className="d-flex my-1 align-items-center gap-1 create-hover-color rounded p-1 w-100 justify-content-center">
          <i className="bi bi-hand-thumbs-up-fill fs-5"></i>
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
        Profile
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
          <div className="">name</div>
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
