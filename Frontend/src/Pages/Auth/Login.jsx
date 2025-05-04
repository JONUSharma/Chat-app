import React, { useEffect, useState } from 'react'
import { IoIosKey } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { HandleError, HandleSuccess } from "../Toast/Toast"
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from '../../Store/user/userThunk';
function Login() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [getvalue, setvalue] = useState({
    username: " ",
    email: " ",
    password: " ",
  })

  const { isAuthenticated } = useSelector((state) => state.userSlice);
  useEffect(() => {
    if (isAuthenticated) {
      Navigate("/");
    }
  }, [isAuthenticated])


  const handleChange = (e) => {
    setvalue({
      ...getvalue,
      [e.target.name]: e.target.value,
    }
    )
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(loginUserThunk(getvalue));
    if (response?.payload?.success) {
      setTimeout(() => {
        Navigate("/");
      }, 1500)
    }

  }


  return (

    < div className='flex justify-center items-center min-h-screen'>
      <form action="" onSubmit={HandleSubmit}>
        <div className='flex flex-col max-w-[50rem] w-96 p-7 gap-5 border-4 border-solid rounded-2xl '>
          <h1 className='text-4xl font-extrabold dark:text-white'>login</h1>
          <label className="input validator">
            <FaUserTie />
            <input  type="input" name="username" placeholder="Username" onChange={handleChange} pattern="[A-Za-z][A-Za-z0-9\-]*" minLength="3" maxLength="30" title="Only letters, numbers or dash" />
          </label>
          <label className="input validator">
            <MdEmail />
            <input type="email"  name='email' placeholder="mail@site.com" onChange={handleChange} />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>

          <label className="input validator">
            <IoIosKey />
            <input type="password" name='password' onChange={handleChange} placeholder="Password" minLength="4" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
          </label>
          <p className="validator-hint hidden">
            Must be more than 4 characters, including
          </p>

          <button className=" btn btn-accent btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Login</button>

          <p>Don't have an account?
            <Link to="/signup" className='text-xl lg-text-lg text-cyan-200 hover:text-cyan-500 hover:underline'> create account</Link>
          </p>
        </div>
        <ToastContainer />
      </form>
    </div>

  )
}

export default Login
