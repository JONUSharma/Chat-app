import React, { useEffect, useState } from 'react'
import { BsSendFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk } from '../../Store/message/MessageThunk';
const TypeInput = () => {

  const dispatch = useDispatch();
  const [message, setSendMessage] = useState();
  const { userProfile } = useSelector((state) => state.userSlice);
  const { selectedUser } = useSelector((state) => state.userSlice);
  const senderID = userProfile?._id;
  const receiverID = selectedUser?._id;

  const HandleClick = (e) => {
    e.preventDefault();
    dispatch(sendMessageThunk({ receiverID, message }));
    setSendMessage(" ");
  };


  return (
    <form action=""   >
      <div className='flex gap-0'>
        <input type="text" value = {message} onChange={(e) => setSendMessage(e.target.value)} placeholder="Type here...." className="input w-full " />
        <button onClick={HandleClick} className='btn btn-success   '>
          <BsSendFill />
        </button>
      </div>
    </form>
  )
}

export default TypeInput
