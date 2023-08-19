import React from 'react'
import NavBar from '../../component/navBar/NavBar'
import SideBar from '../../component/sideBar/SideBar'
import Contact from '../../component/contact/Contact'
import Post from '../../component/post/Post'
import CreatePost from '../../component/createPost/CreatePost'

function HomePage() {
  return (
    <>
      <NavBar />
      <div className='' style={{height:"100vh"}}>
        <div className='d-flex justify-content-between' style={{position:"relative"}}>
          <div className='' style={{position:"fixed"}} >
            <SideBar />
          </div>
          <div></div>
          <div className='mt-3' >
            <CreatePost />
            <Post />
          </div>
          <div></div>
          <div className='' style={{position:"fixed",right:0}} >
            <Contact />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage