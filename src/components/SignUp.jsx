import React, { useContext, useState } from 'react';
import { LuUser2 } from "react-icons/lu";
import { FiLock } from "react-icons/fi";
import bgImg from "../assets/Rectangle 4.png";
import HighlightText from './HighlightText';
import notesImage from '../assets/4739314.jpg';
import { MdOutlineEmail } from "react-icons/md"
import { NavLink, useNavigate } from 'react-router-dom';
import Button from './Button';
import { AppContext } from '../Context/AppContext';
import Toast from "react-hot-toast";
import Loader from './Loader';
import OtpInput from 'react-otp-input';

const SignUp = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [otp, setOtp] = useState("");
    const [showOtpModal, setShowOtpModal] = useState(false);

    const { setUserData, setIsLoggedIn, setLoading, loading } = useContext(AppContext);
    const navigate = useNavigate();


    const changeHandler = (event) => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            }
        });
    };

    async function submitHandler(event) {
        event.preventDefault();
        setLoading(true);
        
        const url = process.env.REACT_APP_BASE_URL + '/auth/send-otp';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: formData.email
            }),
        });

        const responseData = await response.json();

        if(responseData.success) {
            setLoading(false);
            Toast.success(responseData.message);
            setShowOtpModal(true);
        } else {
            setLoading(false);
            Toast.error(responseData.message);
        }
    };

    const resendOtp = async () => {
        setLoading(true);
        const url = process.env.REACT_APP_BASE_URL + '/auth/send-otp';
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: formData.email
          }),
        });

        const responseData = await response.json();

        if(responseData.success) {
          setLoading(false);
          Toast.success(responseData.message);
        } else {
          setLoading(false);
          Toast.error(responseData.message);
        }
    };

    const otpSubmitHandler = async (e) => {
        e.preventDefault();

        setLoading(true);
        formData.otp = otp;
        const url = process.env.REACT_APP_BASE_URL + '/auth/signup';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...formData})
        });

        const responseData = await response.json();
        if(responseData.success) {
            setShowOtpModal(false);
            setLoading(false);
            Toast.success(responseData.message);
            localStorage.setItem('token', responseData.token);
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            setUserData(responseData.data);
            setIsLoggedIn(true);
            navigate("/");
        } else {
            setLoading(false);
            Toast.error(responseData.message);
        }
    }

  return (
    <>
        {
            loading ? (<Loader />) : (
                <div className='h-[80vh] max-xl:w-11/12 max-lg:w-full w-10/12 mx-auto flex items-center transition-all duration-300 ease-in-out justify-center' >
                    <div className={`h-[90%] max-md:h-[80%] max-sm:w-[70%] max-phone:w-[80%] max-smallPhone:w-[90%] max-md:w-[90%] max-lg:w-[80%] w-[60%] flex flex-row-reverse ${showOtpModal && 'opacity-[0.25]'}` }>
                        <div className='w-[50%] max-sm:w-full max-sm:rounded-l-3xl max-phone:px-7 max-phone:py-5 max-smallPhone:px-5 max-smallPhone:py-3 max-[200px]:p-3 bg-white rounded-r-3xl max-md:p-7 p-10 h-full flex flex-col items-center justify-center gap-y-5'>
                            <h1 className='text-3xl max-md:text-2xl text-center uppercase font-bold'>Signup</h1>
                            <p className='text-center  max-phone:text-xs max-md:text-sm'>Get started with <HighlightText text={"yourNotes"} /> App</p>
                            <form onSubmit={submitHandler} className='flex flex-col max-sm:w-full items-center max-md:text-sm max-md:gap-y-3 gap-y-5'>
                                <div className='flex px-5 max-smallPhone:gap-x-2 max-phone:text-xs max-sm:w-full max-md:p-3 items-center gap-x-3 py-3 rounded-xl bg-[#f2f0ff]'>
                                    <LuUser2 />
                                    <input 
                                        onChange={changeHandler}
                                        required 
                                        className=' outline-none text-slate-700 bg-transparent w-full max-md:placeholder:text-xs' 
                                        name='name' 
                                        value={formData.name} 
                                        type="text" 
                                        placeholder='Enter your name'
                                    />    
                                </div>
                                <div className='flex px-5 items-center max-smallPhone:gap-x-2 max-phone:text-xs max-sm:w-full  max-phone:w-full max-md:p-3 gap-x-3 py-3 rounded-xl bg-[#f2f0ff]'>
                                    <MdOutlineEmail />
                                    <input 
                                        onChange={changeHandler}
                                        required 
                                        className=' outline-none text-slate-700 bg-transparent w-full max-md:placeholder:text-xs  ' 
                                        name='email' 
                                        value={formData.email} 
                                        type="email" 
                                        placeholder='Enter your email' 
                                    />   
                                </div>
                                <div className='flex px-5 items-center max-smallPhone:gap-x-2 max-phone:text-xs max-sm:w-full  max-phone:w-full max-md:p-3 gap-x-3 py-3 rounded-xl bg-[#f2f0ff]'>
                                    <FiLock />
                                    <input 
                                        onChange={changeHandler}
                                        required 
                                        className='outline-none text-slate-700 bg-transparent w-full max-md:placeholder:text-xs' 
                                        name='password' 
                                        value={formData.password} 
                                        type="password" 
                                        placeholder='Enter password' 
                                    />
                                </div>
                                <div className='flex px-5 items-center max-smallPhone:gap-x-2 max-phone:text-xs max-sm:w-full  max-phone:w-full max-md:p-3 gap-x-3 py-3 rounded-xl bg-[#f2f0ff]'>
                                    <FiLock />
                                    <input 
                                        onChange={changeHandler}
                                        required 
                                        className='outline-none text-slate-700 bg-transparent w-full max-md:placeholder:text-xs' 
                                        name='confirmPassword' 
                                        value={formData.confirmPassword} 
                                        type="password" 
                                        placeholder='Enter password again' 
                                    />
                                </div>

                                <Button btnText={"Sign Up"} />
                            </form>

                            <div>
                                <p className='text-center max-phone:text-xs max-md:text-sm'>Already have an account <NavLink to={'/login'}><HighlightText text={"Log In"} /></NavLink></p>
                            </div>
                        </div>
                        <div className='w-[50%] max-sm:hidden h-full flex items-center justify-center relative rounded-l-3xl'>
                            <img loading='lazy' src={bgImg} alt="" className='h-full w-full object-cover rounded-l-3xl' />
                            <div className='absolute top-[10%] h-[80%] w-[80%] flex justify-center items-center'>
                                <img src={notesImage} alt="" className=' rounded-2xl' />
                            </div>
                        </div>
                    </div>

                    <div className={`w-full h-full flex items-center justify-center absolute ${showOtpModal ? 'scale-[1]' : 'scale-[0]'} transition-all duration-300 ease-linear`}>.
                        <form onSubmit={otpSubmitHandler} className='w-[40%] max-tablet:w-[60%] flex flex-col gap-y-5 bg-white p-7 max-tablet:gap-y-3 max-tablet:p-5 rounded-lg shadow-xl max-phone:w-[80%]'>
                            <h1 className='text-center text-3xl text-black font-semibold max-tablet:text-2xl max-phone:text-xl'>OTP Verification</h1>
                            <p className='text-center text-lg max-tablet:text-[1rem] max-phone:text-sm' >Enter OTP code send to your email</p>

                            <div className='mx-auto text-2xl max-tablet:text-xl max-phone:text-lg'>
                                <OtpInput
                                    inputStyle='otp-input'
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => <input {...props} />}
                                />
                            </div>

                            <div className='flex flex-col gap-y-2 items-center text-base max-tablet:text-sm max-phone:text-xs'>
                                <p className='text-center'>Didn't received the OTP code?</p>
                                <button onClick={resendOtp} className='text-center mx-auto text-[#2991cb] cursor-pointer font-semibold w-fit'><HighlightText text="Resend Code" /></button>
                            </div>

                            <Button btnText={"Verify & Proceed"} />
                        </form>
                    </div>
                </div>
            )
        }
    </>
  )
}

export default SignUp
