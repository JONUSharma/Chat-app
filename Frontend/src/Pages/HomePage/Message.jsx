import React from 'react'
import User from './User'
import ChatMessage from './ChatMessage'
import TypeInput from './TypeInput'

import { useSelector } from 'react-redux'
const Message = () => {
  const { ALLmessages } = useSelector((state) => state.messageSlice);
  const { selectedUser } = useSelector((state) => state.userSlice);
  return (
    <>
      {
        selectedUser ? <div className='w-full h-screen flex flex-col' >
          <div className=' '>
            <User  userDetail={selectedUser} />
          </div>

          <div className='h-full overflow-y-auto border-b-2 p-3'>
            {
              ALLmessages?.map((val) => {
                return (
                  <ChatMessage key = {val?._id} messages={val?.message} createdAt = {val?.createdAt} sender = {val?.senderID} />
                )
              })
            }
          </div>
          <div className='p-4'><TypeInput /></div>
        </div> : <h1 className='flex justify-center w-full flex-col items-center'> Start chat with one user</h1>
      }

    </>
  )
}

export default Message
