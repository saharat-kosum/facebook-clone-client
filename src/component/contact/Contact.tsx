import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/Store";
import axios from "axios";
import { UserType } from "../../type";
import { useNavigate } from "react-router-dom";

interface ContactProps {
  setProcessing: (processing: boolean) => void;
  token: string | undefined;
}

function Contact({ setProcessing, token }: ContactProps) {
  const userData = useAppSelector((state) => state.auth.user);
  const prefixURL = process.env.REACT_APP_PREFIX_URL;
  const [suggestUser, setSuggestUser] = useState<UserType[] | undefined>(undefined);
  const [friends, setFriends] = useState<UserType[] | undefined>(undefined);
  const prefix_img_url = process.env.REACT_APP_PREFIX_URL_IMG;
  const profilePicture = useAppSelector((state) => state.auth.mockIMG);
  const navigate = useNavigate();

  useEffect(() => {
    getSuggest();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getFriends();
    // eslint-disable-next-line
  }, [userData]);

  const navigateProfile = (id : string) => {
    navigate(`/profile/${id}`);
  };

  const getSuggest = async () => {
    try {
      const response = await axios.get(`${prefixURL}/users/suggest/friends`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setSuggestUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getFriends = async () => {
    if(userData){
      try {
        const response = await axios.get(
          `${prefixURL}/users/${userData?._id}/friends`,
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

  const addFriend = async (friendId: string) => {
    setProcessing(true);
    try {
      const response = await axios.put(
        `${prefixURL}/users/${userData?._id}/${friendId}`,
        {userId : userData?._id},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const filter = suggestUser?.filter((user) => user._id !== friendId);
        setSuggestUser(filter);
        const addFriend = suggestUser?.filter((user) => user._id === friendId);
        if(addFriend){
          friends?.push(addFriend[0])
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProcessing(false);
    }
  };

  const removeFriend = async (friendId: string) => {
    setProcessing(true);
    try {
      const response = await axios.put(
        `${prefixURL}/users/${userData?._id}/${friendId}`,
        {userId : userData?._id},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const filter = friends?.filter((user) => user._id !== friendId);
        setFriends(filter);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="mt-3 me-3">
      <div className="">
        <h5>Birthdays</h5>
        <div
          className="rounded p-2 sidebar-hover-color w-100 text-start lh-base"
          style={{ marginLeft: "-10px" }}
        >
          <i className="bi bi-gift me-2 fs-4" style={{ color: "red" }}></i>
          Someone's birthday is today.
        </div>
      </div>
      <hr></hr>
      <div>
        <div className="d-flex justify-content-between">
          <h5>Suggestions</h5>
          <div>
            <i className="bi bi-three-dots ms-1 sidebar-hover-color rounded-circle p-2"></i>
          </div>
        </div>
        <ul className="" style={{ padding: "unset", width: "270px" }}>
          {suggestUser &&
            suggestUser.map((user,index) => (
              <li key={index} className="p-1 w-100 text-start lh-base d-flex justify-content-between">
                <div className="text-capitalize hover-cursor" onClick={()=>{
                  if(user._id){
                    navigateProfile(user._id)
                  }
                }}>
                  <img
                    alt="profile"
                    className="rounded-circle border me-2"
                    src={
                      user?.picturePath
                        ? prefix_img_url + user?.picturePath
                        : profilePicture
                    }
                    style={{ width: "36px", height: "36px", objectFit: "cover" }}
                  />
                  {user.firstName} {user.lastName}
                </div>
                <i
                  className="bi bi-person-plus-fill rounded-circle p-2 sidebar-hover-color"
                  onClick={() => {
                    if (user._id) {
                      addFriend(user._id);
                    }
                  }}
                ></i>
              </li>
            ))}
        </ul>
      </div>
      <hr></hr>
      <div>
        <div className="d-flex justify-content-between">
          <h5>Contacts</h5>
          <div>
            <i className="bi bi-search sidebar-hover-color rounded-circle p-2"></i>
            <i className="bi bi-three-dots ms-1 sidebar-hover-color rounded-circle p-2"></i>
          </div>
        </div>
        <ul className="" style={{ padding: "unset", width: "270px" }}>
          {friends &&
            friends.map((friend,index) => (
              <li key={index} className="p-1 w-100 text-start lh-base d-flex justify-content-between ">
                <div className="text-capitalize hover-cursor" onClick={()=>{
                  if(friend._id){
                    navigateProfile(friend._id)
                  }
                }}>
                  <img
                    alt="profile"
                    className="rounded-circle border me-2"
                    src={
                      friend?.picturePath
                        ? prefix_img_url + friend?.picturePath
                        : profilePicture
                    }
                    style={{ width: "36px", height: "36px", objectFit: "cover" }}
                  />
                  {friend.firstName} {friend.lastName}
                </div>
                <i
                  className="bi bi-person-dash-fill rounded-circle p-2 sidebar-hover-color "
                  onClick={() => {
                    if (friend._id) {
                      removeFriend(friend._id);
                    }
                  }}
                ></i>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Contact;
