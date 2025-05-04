import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PrivateRoutes = ({ children }) => {
    const Navigate = useNavigate();
    const { isAuthenticated, screenLoading } = useSelector((state) => state.userSlice);
    useEffect(() => {
        if (screenLoading === true && isAuthenticated === false) {
            Navigate("/login");
        }
    }, [isAuthenticated,screenLoading])

    return (
        children
    )
}

export default PrivateRoutes
