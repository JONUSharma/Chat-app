import React, { useEffect } from 'react'
import { setSelectedUser } from '../../Store/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getMessageThunk } from '../../Store/message/MessageThunk';
const User = ({ userDetail }) => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector((state) => state.userSlice);
    const { onlineUsers } = useSelector((state) => state.SocketSlice);
    const isUserOnline = onlineUsers?.includes(userDetail?._id)
    // console.log(isUserOnline);
    const receiverId = selectedUser?._id;
    const HandleClick = () => {
        dispatch(setSelectedUser(userDetail))
    }

    useEffect(() => {
        if (selectedUser) {
            dispatch(getMessageThunk({ receiverId }));
        }
    }, [selectedUser]);

    return (

        <div onClick={HandleClick} className={`flex gap-4 m-4 border-b-2 border-r-2 rounded-lg p-1 hover:bg-slate-600  cursor-pointer ${userDetail?._id === selectedUser?._id && 'bg-slate-600'}`}>
            <div className={`avatar ${isUserOnline && 'avatar-online'}`}>
                <div className="w-12 rounded-full">
                    <img src={userDetail?.avatar} alt="" />

                </div>
            </div>
            <div>
                {userDetail?.username}
                <p className='text-sm'>{userDetail?.fullname}</p>
            </div>
        </div>
    )
}

export default User
