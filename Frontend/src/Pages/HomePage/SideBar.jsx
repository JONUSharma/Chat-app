import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import User from './User';
import Logout from './Logout';
import Theme from './Theme';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOtherUserThunk } from '../../Store/user/userThunk';

function SideBar() {
    const { otherUser } = useSelector((state) => state.userSlice)

    const dispatch  = useDispatch();
    useEffect(()=> {
        dispatch((getOtherUserThunk()));
      })
    
    return (
        <div className=' w-full  gap-2 border-r-2 h-screen overflow-y-auto flex flex-col max-w-[18rem] p-2'>

            <div className='flex justify-center font-serif rounded-full p-2 bg-gray-800 my-2 pt-2 content-center'>
                <h1 className='text-accent  font-semibold hover:scale-y-105 flex justify-start mx-3 gap-2'>React</h1>
                <Theme />
            </div>
            <div>
                <label className="input">
                    <IoSearchSharp />
                    <input type="search" required placeholder="Search" />
                </label>
            </div>

            <div className='h-full overflow-y-scroll'>
                {
                    otherUser?.map((userDetail) => {
                        return <User key={userDetail?._id} userDetail={userDetail} />
                    })
                }

            </div>

            <div className=''>
                <Logout />
            </div>
        </div>
    )
}

export default SideBar
