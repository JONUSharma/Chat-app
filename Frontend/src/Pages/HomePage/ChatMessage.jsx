import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ChatMessage = ({ messages, sender, createdAt }) => {
    const { selectedUser, userProfile } = useSelector((state) => state.userSlice);
    const scrollHandle = useRef(null);

    useEffect(() => {
        if (scrollHandle.current) {
            scrollHandle.current.scrollIntoView({behavior: "smooth"})
        }
    }, [])
    return (
        <div className='' ref={scrollHandle}>

            {/* send */}
            <div className={`chat ${userProfile?._id === sender ? "chat-end" : "chat-start"} `}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src={userProfile?._id === sender ? userProfile?.avatar : selectedUser?.avatar} />
                    </div>
                </div>
                <div className="chat-header">
                    {selectedUser?.username}
                    <time className="text-xs opacity-50"></time>
                </div>
                <div className="chat-bubble">{messages}</div>
                <div className="chat-footer opacity-50">Delivered</div>
            </div>
        </div>

    )
}

export default ChatMessage
