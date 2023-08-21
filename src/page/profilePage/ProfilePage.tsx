import React from 'react'
import NavBar from '../../component/navBar/NavBar'
import Post from '../../component/post/Post'
import ProfileDetail from '../../component/ProfileDetail'
import { useMediaQuery } from '../../utils/useMediaQuery';

function ProfilePage() {
  const isLaptop = useMediaQuery("(min-width: 1000px)");
  return (
    <>
      <NavBar />
      <div className='container' style={{minHeight:"94vh"}}>
        <div className={`${isLaptop? "d-flex" : ""} pb-3 gap-3`}>
          <div className={`${isLaptop? "" : "m-auto"} w-100`} style={{ maxWidth:"490px"}}>
            <div style={{height:"75px"}} ></div>
            <ProfileDetail />
          </div>
          <div className='w-100'>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage