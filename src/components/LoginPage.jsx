import React, { useContext, useState } from 'react'
import { LuUser2 } from "react-icons/lu";
import { FiLock } from "react-icons/fi";
import bgImg from "../assets/Rectangle 4.png";
import HighlightText from './HighlightText';
import notesImage from '../assets/4739314.jpg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from './Button';
import Toast from "react-hot-toast";
import { AppContext } from '../Context/AppContext';
import Loader from './Loader';

const LoginPage = () => {
    const navigate = useNavigate();

    const { setUserData, setIsLoggedIn, setLoading, loading } = useContext(AppContext);

    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

    const changeHandler = (e) => {
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          [e.target.name]: e.target.value
        }
      });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const url = process.env.REACT_APP_BASE_URL + '/auth/login';

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...formData})
        });

        const responseData = await response.json();
        if(responseData.success) { 
          setLoading(false);
          Toast.success(responseData.message);
          localStorage.setItem('token', responseData.token);
          setUserData(responseData.user);
          setIsLoggedIn(true);
          navigate('/');
        } else {
          setLoading(false);
          Toast.error(responseData.message);
        }

    }

  return (
    <>
      {
        loading ? (<Loader />) : (
          <div className='h-[80vh] transition-all duration-300 ease-in-out max-xl:w-11/12 max-lg:w-full w-10/12 mx-auto flex items-center justify-center' >
            <div className='h-[70%] max-xl:h-[80%] max-md:h-[70%] max-sm:w-[60%] max-phone:w-[80%] max-smallPhone:w-[90%] max-lg:w-[80%] w-[60%] flex'>
              <div className='w-[50%] max-sm:w-full bg-white max-sm:rounded-r-3xl  rounded-l-3xl max-phone:px-7 max-phone:py-5 max-smallPhone:px-5 max-smallPhone:py-3 max-[200px]:p-3 p-10 h-full flex flex-col items-center justify-center gap-y-5'>
                  <h1 className='text-3xl max-md:text-2xl uppercase font-bold'>Login</h1>
                  <p className='text-center max-phone:text-xs max-md:text-sm'>Get started with <HighlightText text={"yourNotes"} /> App</p>
                  <form onSubmit={submitHandler} className='flex flex-col max-sm:w-full items-center max-md:text-sm max-md:gap-y-3  gap-y-5'>
                      <div className='flex px-5 w-full items-center gap-x-3 max-smallPhone:gap-x-2 max-phone:text-xs  max-phone:w-full max-md:p-3 py-3 rounded-xl bg-[#f2f0ff]'>
                          <LuUser2 />
                          <input required onChange={changeHandler} name='email' value={formData.email} className='outline-none text-slate-700 bg-transparent w-full max-md:placeholder:text-xs ' type="email" placeholder='Enter your Email' />   
                      </div>
                      <div className='flex px-5  w-full mb-3 items-center relative gap-x-3 max-smallPhone:gap-x-2 max-phone:text-xs max-phone:w-full max-md:p-3 py-3 rounded-xl bg-[#f2f0ff]'>
                          <FiLock />
                          <input required onChange={changeHandler} name='password' value={formData.password} className='outline-none text-slate-700 bg-transparent w-full max-md:placeholder:text-xs' type="password" placeholder='Enter password' />
                          <Link to={'/forgotPassword'}>
                              <div className=' text-end absolute w-fit right-2 -bottom-5 text-[#5a48c1] max-phone:text-[0.65rem] max-md:text-[0.70rem] text-xs'>Forgot Password?</div>
                          </Link>
                      </div>
                      <Button btnText={"Login Now"} />
                  </form>

                  <div>
                      <p className='text-center max-phone:text-xs max-md:text-sm'>Don't have an account <NavLink to={'/signup'}><HighlightText text={"Sign Up"} /></NavLink></p>
                  </div>
              </div>
              <div className='w-[50%] h-full max-sm:hidden flex items-center justify-center relative rounded-r-3xl'>
                  <img loading='lazy' src={bgImg} alt="" className='h-full w-full object-cover rounded-r-3xl' />
                  <div className='absolute top-[10%] h-[80%] w-[80%] flex justify-center items-center'>
                      <img src={notesImage} alt="" className=' rounded-2xl object-contain' />
                  </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default LoginPage
