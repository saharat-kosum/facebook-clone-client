import React from 'react'
import NavBar from '../../component/navBar/NavBar'
import SideBar from '../../component/sideBar/SideBar'
import Contact from '../../component/contact/Contact'
import Post from '../../component/post/Post'
import CreatePost from '../../component/createPost/CreatePost'
import CreatePostModal from '../../component/modals/CreatePostModal'
import { useMediaQuery } from '../../utils/useMediaQuery'

function HomePage() {
  const contactHandle = useMediaQuery("(min-width: 1270px)");
  const isLaptop = useMediaQuery("(min-width: 1023px)");
  return (
    <>
      <NavBar />
      <div className='px-2'>
        <CreatePostModal />
        <div className='pb-3' style={{minHeight:"94vh"}}>
          <div className='d-flex justify-content-between' style={{position:"relative"}}>
            <div className='' style={{position:"fixed" ,display:isLaptop?"inherit":"none"}} >
              <SideBar />
            </div>
            <div></div>
            <div className='mt-3' >
              <CreatePost />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
            </div>
            <div></div>
            <div className='' style={{position:"fixed",right:0,display:contactHandle?"inherit":"none"}} >
              <Contact />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage