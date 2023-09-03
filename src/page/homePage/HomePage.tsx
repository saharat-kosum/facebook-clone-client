import React, { useEffect, useState } from "react";
import NavBar from "../../component/navBar/NavBar";
import SideBar from "../../component/sideBar/SideBar";
import Contact from "../../component/contact/Contact";
import Post from "../../component/post/Post";
import CreatePost from "../../component/createPost/CreatePost";
import CreatePostModal from "../../component/modals/CreatePostModal";
import { useMediaQuery } from "../../utils/useMediaQuery";
import { AppDispatch, useAppSelector } from "../../redux/Store";
import axios from "axios";
import { CommentType, PostType } from "../../type";
import Loading from "../../component/Loading";
import { setLogIn } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

function HomePage() {
  const contactHandle = useMediaQuery("(min-width: 1270px)");
  const isLaptop = useMediaQuery("(min-width: 1070px)");
  const prefixURL = process.env.REACT_APP_PREFIX_URL;
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);
  const [comment, setComment] = useState<string>('');
  const userData = useAppSelector((state) => state.auth.user);
  const [posts, setPosts] = useState<PostType[] | undefined>(undefined);
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = getUserToken();
    setAuthToken(token);
    if (token) {
      getFeedPosts(token);
      if (!userData) {
        getUserDetail(token);
      }
    }
    // eslint-disable-next-line
  }, []);

  const getFeedPosts = async (token: string) => {
    setProcessing(true);
    try {
      const response = await axios.get(`${prefixURL}/posts`, {
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

  const getUserDetail = async (token: string) => {
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
  };

  const getUserToken = () => {
    const token = sessionStorage.getItem("userToken");
    if (token && token.length > 0) {
      return token;
    } else {
      window.location.replace("/");
    }
  };

  const likePost =async (id:string) => {
    const token = getUserToken()
    setProcessing(true);
    try {
      const response = await axios.put(`${prefixURL}/posts/${id}/like`,
      {userId : userData?._id},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data : PostType = response.data
      const updatedPosts = posts?.map(post => {
        if (post._id === data._id) {
          return data;
        }
        return post;
      });
      setPosts(updatedPosts)
    } catch (error) {
      console.error(error) 
    } finally {
      setProcessing(false);
    }
  }

  const commentPost =async (id:string) => {
    const token = getUserToken()
    setProcessing(true);
    if(!userData){
      return
    }
    const newComment : CommentType = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      userPicturePath: userData.picturePath,
      description: comment,
    }
    try {
      const response = await axios.post(`${prefixURL}/posts/add/comment/${id}`,
      newComment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data : PostType = response.data
      const updatedPosts = posts?.map(post => {
        if (post._id === data._id) {
          return data;
        }
        return post;
      });
      setComment('')
      setPosts(updatedPosts)
    } catch (error) {
      console.error(error) 
    } finally {
      setProcessing(false);
    }
  }

  const deletePost = async (id : string) => {
    const result = window.confirm("Are you sure you want to delete this post?");
    if(result){
      const token = getUserToken()
      setProcessing(true);
      try {
        const response = await axios.delete(`${prefixURL}/posts/delete/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if(response.status === 200){
          const filter = posts?.filter((post)=>post._id !== id)
          if(filter){
            const sortData = sortPost(filter)
            setPosts(sortData);
          }
        }else if(response.status === 404){
          alert("Post not found")
        }else{
          alert("Delete post failed")
        }
      } catch (error) {
        console.error(error)  
      } finally {
        setProcessing(false);
      }
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

  if (!authToken) {
    return <></>;
  }

  return (
    <>
      <NavBar />
      <Loading isShow={processing} />
      <div className="px-2">
        <CreatePostModal
          token={getUserToken()}
          setPosts={setPosts}
          setProcessing={setProcessing}
          sortPost={sortPost}
          posts={posts}
        />
        <div className="pb-3" style={{ minHeight: "94vh" }}>
          <div
            className="d-flex justify-content-between"
            style={{ position: "relative" }}
          >
            <div
              className=""
              style={{
                position: "fixed",
                display: isLaptop ? "inherit" : "none",
              }}
            >
              <SideBar />
            </div>
            <div></div>
            <div className="mt-3">
              <CreatePost />
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <Post
                    key={post._id}
                    props={post}
                    deletePost={deletePost}
                    likePost={likePost}
                    commentPost={commentPost}
                    comment={comment}
                    setComment={setComment}
                  />
                ))
              ) : (
                <div
                  className="d-flex justify-content-center align-items-center text-secondary"
                  style={{ height: "60vh" }}
                >
                  <p>No post yet</p>
                </div>
              )}
            </div>
            <div></div>
            <div
              className=""
              style={{
                position: "fixed",
                right: 0,
                display: contactHandle ? "inherit" : "none",
              }}
            >
              <Contact 
                setProcessing={setProcessing}
                token={getUserToken()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
