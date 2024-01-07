import React, { useEffect, useState } from 'react'
import { AppDispatch, useAppSelector } from '../../redux/Store';
import NavBar from '../../component/navBar/NavBar';
import Loading from '../../component/Loading';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogIn } from '../../redux/authSlice';
import { UserType } from '../../type';

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
  const [receivedMessage, setReceivedMessage] = useState<string>('')

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
      ws.addEventListener('message', (event) => {
        setReceivedMessage(event.data)
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
    if (ws) {
      ws.send(message)
    }
  }

  return (
    <>
      <NavBar token={authToken} />
      <Loading isShow={processing} />
      <div className='d-flex bg-white' style={{ minHeight: "94vh" }}>
        <div className='w-25 border-end p-3'>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <h2>Chats</h2>
            <div>Icon</div>
          </div>
          <div>Map friends</div>
        </div>
        <div className='w-75 d-flex flex-column p-3'>
          <div className='flex-grow-1'>Message to Someone</div>
          <div className='d-flex gap-2'>
            <input type="text" placeholder='Type your message here' className='form-control' />
            <button type="button" className="p-2 btn btn-outline-primary">Send</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatPage