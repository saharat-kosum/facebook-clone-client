import React, { useEffect, useState } from 'react'
import { AppDispatch, useAppSelector } from '../../redux/Store';
import NavBar from '../../component/navBar/NavBar';
import Loading from '../../component/Loading';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogIn } from '../../redux/authSlice';
import { ChatHistory, UserType, WsMessagePayload } from '../../type';
import { useMediaQuery } from '../../utils/useMediaQuery';

function ChatPage() {
  const [authToken, setAuthToken] = useState<string | undefined>(undefined)
  const [friends, setFriends] = useState<UserType[] | undefined>(undefined);
  const userData = useAppSelector((state) => state.auth.user);
  const [processing, setProcessing] = useState(false);
  const prefixURL = process.env.REACT_APP_PREFIX_URL;
  const prefixWS = process.env.REACT_APP_PREFIX_WS;
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams()
  const [ws,setWs] = useState<null | WebSocket>(null)
  const [message, setMessage] = useState<string>('')
  const [targetUser, setTargetUser] = useState<UserType | undefined>(undefined)
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])
  const prefix_img_url = process.env.REACT_APP_PREFIX_URL_IMG;
  const profilePicture = useAppSelector((state) => state.auth.mockIMG);
  const isLaptop = useMediaQuery("(min-width: 1024px)");
  const isMobile = useMediaQuery("(min-width: 425px)");
  const isTablet = useMediaQuery("(min-width: 768px)");

  useEffect(()=> {
    const token = getUserToken();
    setAuthToken(token);
    if (token) {
      getFriends(token);
      if(!userData){
        getUserDetail(token)
      }
    }
    // eslint-disable-next-line
  }, [])

  useEffect(()=> {
    if (prefixWS && authToken) {
      const ws = new WebSocket(`${prefixWS}/?token=${authToken}`)
      setWs(ws)
      ws.addEventListener('message', (data) => {
        console.log(data)
        // setChatHistory((prevHistory) => [
        //   ...prevHistory,
        //   { sender: data.sender, message: data.message },
        // ]);
      })

      return () => {
        ws.close()
      }
    }
  }, [prefixWS,authToken])
  
  useEffect(() => {
    if (userData && authToken) {
      getFriends(authToken);
    }
  },[userData,authToken])

  const getUserToken = () => {
    const token = sessionStorage.getItem("userToken")
    if(token && token.length > 0){
      return token
    }else {
      window.location.replace('/');
    }
  }

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

  const getFriends = async (token:string) => {
    if(userData){
      try {
        const response = await axios.get(
          `${prefixURL}/users/${userData._id}/friends`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        setFriends(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const sendMessage = () => {
    if (ws && targetUser && message && targetUser._id) {
      const wsPayload : WsMessagePayload = {
        targetUser: targetUser._id,
        message: message
      }
      ws.send(JSON.stringify(wsPayload))
      setMessage('')
    }
  }

  return (
    <>
      <NavBar token={authToken} />
      <Loading isShow={processing} />
      <div className='d-flex bg-white' style={{ minHeight: "94vh" }}>
        <div className='w-25 border-end'>
          <div className='d-flex justify-content-between align-items-center p-2 p-sm-3'>
            {isMobile ? 
              <h2>Chats</h2> : <h5>Chats</h5>
            }
            {isLaptop ? 
            <div className='d-flex gap-3'>
              <div className='p-2 fs-5 fw-bold rounded-circle hover-cursor' style={{ backgroundColor: "#F0F2F5" }}>
                <i className="bi bi-three-dots"></i>
              </div>
              <div className='p-2 fs-5 fw-bold rounded-circle hover-cursor' style={{ backgroundColor: "#F0F2F5" }}>
                <i className="bi bi-pencil-square"></i>
              </div>
            </div>
            : <></>}
          </div>
          <form
            className="d-flex rounded-pill border mb-2 position-relative mx-3"
            style={{ height: "fit-content" }}
          >
            <input
              className="form-control rounded-pill ps-sm-5"
              type="search"
              placeholder={isTablet ? "Search Messenger" : ""}
              aria-label="Search"
              style={{ border: "none", backgroundColor: "#F0F2F5" }}
            />
            <button className="btn position-absolute" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
          <div className='px-sm-2'>
            {friends?.map((friend, index) =>
              <div className='p-2 sidebar-hover-color rounded-3 text-center d-md-flex gap-3 align-items-center' key={index} 
                style={{ backgroundColor: targetUser?._id === friend._id ? "#E4E6EB" : "" }}
                onClick={()=>setTargetUser(friend)}
              >
                <img
                  alt="profile"
                  className="rounded-circle border"
                  src={
                    friend?.picturePath
                      ? prefix_img_url + friend?.picturePath
                      : profilePicture
                  }
                  style={{ width: "56px", height: "56px", objectFit: "cover" }}
                />
                {isTablet &&
                  <span className=''>
                    {friend.firstName} {friend.lastName}
                  </span>
                }
              </div>
            )}
          </div>
        </div>
        <div className='w-75 d-flex flex-column p-3'>
          <div className='flex-grow-1'>Message to Someone</div>
          <div className='d-flex gap-2'>
            <input type="text" placeholder='Type your message here' className='form-control'
              onChange={(e)=>setMessage(e.target.value)} value={message}
            />
            <button type="button" className="p-2 btn btn-outline-primary">Send</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatPage