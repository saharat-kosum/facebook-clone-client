import React, { useEffect, useState } from 'react'
import NavBar from '../../component/navBar/NavBar'
import Post from '../../component/post/Post'
import ProfileDetail from '../../component/ProfileDetail'
import { useMediaQuery } from '../../utils/useMediaQuery';
import axios from 'axios';
import { AppDispatch, useAppSelector } from '../../redux/Store';
import { PostType, UserType } from '../../type';
import { useDispatch } from 'react-redux';
import { setLogIn } from '../../redux/authSlice';
import Loading from '../../component/Loading';
import { useParams } from 'react-router-dom';

function ProfilePage() {
  const isLaptop = useMediaQuery("(min-width: 1000px)");
  const [authToken, setAuthToken] = useState<string | undefined>(undefined)
  const userData = useAppSelector((state) => state.auth.user);
  const [friendData,setFriendData] = useState<UserType | undefined>(undefined)
  const [posts, setPosts] = useState<PostType[] | undefined>(undefined);
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const prefixURL = process.env.REACT_APP_PREFIX_URL;
  const params = useParams()

  useEffect(()=> {
    const token = getUserToken();
    setAuthToken(token);
    if (token) {
      getPosts(token);
      getFriendDetail(token);
      if(!userData){
        getUserDetail(token)
      }
    }
    // eslint-disable-next-line
  },[])

  const getUserToken = () => {
    const token = sessionStorage.getItem("userToken")
    if(token && token.length > 0){
      return token
    }else {
      window.location.replace('/');
    }
  }

  const getPosts = async (token: string) => {
    setProcessing(true);
    try {
      const response = await axios.get(`${prefixURL}/posts/${params.userId}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      const sortData = sortPost(data)
      setPosts(sortData);
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const getUserDetail =async (token:string) => {
    setProcessing(true);
    try {
      const response = await axios.get(`${prefixURL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      dispatch(setLogIn(data));
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  }

  const getFriendDetail =async (token:string) => {
    setProcessing(true);
    try {
      const response = await axios.get(`${prefixURL}/users/friend/${params.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setFriendData(data)
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  }

  const sortPost = (posts: PostType[]): PostType[] => {
    return posts.slice().sort((a, b) => {
      if (a.createdAt === undefined && b.createdAt === undefined) {
        return 0;
      }
      if (a.createdAt === undefined) {
        return 1;
      }
      if (b.createdAt === undefined) {
        return -1;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  };

  if(!authToken){
    return (<></>)
  }
  
  return (
    <>
      <NavBar />
      <Loading isShow={processing} />
      <div className='container' style={{minHeight:"94vh"}}>
        <div className={`${isLaptop? "d-flex" : ""} pb-3 gap-3`}>
          <div className={`${isLaptop? "" : "m-auto"} w-100`} style={{ maxWidth:"490px"}}>
            <div style={{height:"75px"}} ></div>
            <ProfileDetail 
              dateOfBirth={friendData?.dateOfBirth || ''} 
              firstName={friendData?.firstName || ''} 
              lastName={friendData?.lastName || ''} 
              email={friendData?.email || ''} 
              password={''} 
              occupation={friendData?.occupation || ''} 
              location={friendData?.location || ''}
              picturePath={friendData?.picturePath}
              createdAt={friendData?.createdAt}
            />
          </div>
          <div className='w-100'>
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <Post
                  key={post._id}
                  userId={post.userId}
                  firstName={post.firstName}
                  lastName={post.lastName}
                  description={post.description}
                  userPicturePath={post.userPicturePath}
                  picturePath={post.picturePath}
                  likes={post.likes}
                  comments={post.comments}
                  createdAt={post.createdAt}
                />
              ))
            ) : (
              <div className="d-flex justify-content-center align-items-center text-secondary" style={{height:"60vh"}}>
                <p>No post yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage