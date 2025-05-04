import React, { useEffect, useState } from 'react'
import { IoIosKey } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { SignUpUserThunk } from '../../Store/user/userThunk';
import { HandleError } from '../Toast/Toast';

const Signup = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [getvalue, setvalue] = useState({
    fullname: "",
    password: "",
    username: "",
    confirmpassword: "",
    email: "",
    gender: "male"
  })
  const HandleChange = (e) => {
    setvalue({
      ...getvalue,
      [e.target.name]: e.target.value,
    });

  }

  const { isAuthenticated } = useSelector((state) => state.userSlice);
  useEffect(() => {
    if (isAuthenticated) {
      Navigate("/");
    }
  },[isAuthenticated]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (getvalue.password !== getvalue.confirmpassword) {
      return HandleError("Password not matched");
    }
    const response = await dispatch(SignUpUserThunk(getvalue));
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
          <h1 className='text-4xl font-extrabold dark:text-white'>Signup</h1>
          <label className="input validator ">
            <FaUserTie />
            <input type="input" name='fullname' className='' onChange={HandleChange} placeholder="Your full name..." minLength="3" maxLength="30" />
          </label>
          <label className="input validator">
            <FaUserTie />
            <input type="input" name='username' onChange={HandleChange} placeholder="Username" pattern="[A-Za-z][A-Za-z0-9\-]*" minLength="3" maxLength="30" title="Only letters, numbers or dash" />
          </label>
          <label htmlFor="" className='flex gap-4'>
            <input type="radio" value="male" name="gender" onClick={HandleChange} className="radio radio-success" defaultChecked />Male
            <input type="radio" value="female" name="gender" onClick={HandleChange} className="radio radio-success" /> Female
          </label>
          <label className="input validator">
            <MdEmail />
            <input type="email" name='email' onChange={HandleChange} placeholder="mail@site.com" />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>

          <label className="input validator">
            <IoIosKey />
            <input type="password" name='password' onChange={HandleChange} placeholder="Password" minLength="3" title="Must be more than 3 characters, including number, lowercase letter, uppercase letter" />
          </label>
          <p className="validator-hint hidden">
            Must be more than 3 characters, including
            <br />At least one number
            <br />At least one lowercase letter
            <br />At least one uppercase letter
          </p>
          <label className="input validator">
            <IoIosKey />
            <input type="password" onChange={HandleChange} name="confirmpassword" placeholder="Confirm Password" minLength="3" />
          </label>
          <button className=" btn btn-accent btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Signup</button>

          <p>Already have an account
            <Link to="/Login" className='text-xl lg-text-lg text-cyan-200 hover:text-cyan-500 hover:underline'> Login</Link>
          </p>
        </div>
        <ToastContainer />
      </form>
    </div>
  )
}

export default Signup
