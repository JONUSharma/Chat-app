import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutThunk } from '../../Store/user/userThunk';
import { useNavigate } from 'react-router-dom';
const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated,userProfile } = useSelector((state) => state.userSlice);
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login")
        }

    })
    const HandleLogout = async () => {
        const response = await dispatch(LogoutThunk());
    }
    return (
        <div className='flex justify-around rounded-full items-center border-t-2  w-full '>
            <div className="avatar flex  items-center gap-4 max-w-full ">
                <div className="ring-accent hover:scale-95 ring-offset-base-100 w-12 mt-4 rounded-full ring ring-offset-2">
                    <img src={userProfile?.avatar} />
                </div>
                <div className='mt-8'>{userProfile?.username}</div>
            </div>
            <button className="btn btn-success mt-2 mx-2 hover:scale-95" onClick={HandleLogout}>Logout</button>

        </div>
    )
}

export default Logout
