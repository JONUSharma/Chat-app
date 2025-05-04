import React, { useEffect, useState } from 'react'
import Message from './Message'
import SideBar from './sideBar'
import Theme from "./Theme"
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Laoding/Loading'
import { initiizeSocket, setOnlineUsers } from '../../Store/Socket/Socket'
import { setNewMessage } from '../../Store/message/MessageSlice'

function Home() {

  const { isAuthenticated, userProfile } = useSelector((state) => state.userSlice);
  const { socket, onlineUsers } = useSelector((state) => state.SocketSlice);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(initiizeSocket(userProfile?._id));
  }, [isAuthenticated]);

  useEffect(() => {
    if (!socket) return;
    //show active online user
    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    //send live message using socket
    socket.on("message", (newMessage) => {
      console.log(newMessage);
      dispatch(setNewMessage(newMessage));
    });

    return () => {
      socket.close();
    };
  }, [socket]);


  return (
    <div className='flex gap-4'>
      <SideBar>
      </SideBar>
      <Message></Message>
    </div>


  )
}

export default Home
