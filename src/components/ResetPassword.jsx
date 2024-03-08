import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import Loader from './Loader';
import HighlightText from './HighlightText';
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {

    const token = window.location.href.split('/').slice(-1)[0];
    const {loading, setLoading} = useContext(AppContext);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [newPasswordDetails, setNewPasswordDetails] = useState({
        password: "",
        confirmPassword: "",
        token: token,
    });
    const navigate = useNavigate();

    const changeHandler = (event) => {
        setNewPasswordDetails(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        const url = process.env.REACT_APP_BASE_URL + `/auth/update-password/${token}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...newPasswordDetails}),
        });

        const responseData = await response.json();

        if(responseData.success) {
            setLoading(false);
            toast.success(responseData.message);
            navigate('/login');
        } else {
            toast.error(responseData.message);
            setLoading(false);
            navigate('/forgotPassword');
        }

        setNewPasswordDetails({
            password: "",
            confirmPassword: "",
            token: token,
        });
    };

    useEffect(() => {
        if(token === undefined || token === null || token === '') {
            toast.error("Token not found generate first");
            navigate('/forgotPassword');
        }
        // eslint-disable-next-line
    }, []);

  return (
    <>
        {
            // media query add kro
            loading ? (<Loader />) : (
                <div className='w-10/12 min-h-[80vh] max-xl:w-11/12 max-lg:w-full mx-auto flex flex-col gap-y-7 py-7'>
                    <h1 className='text-center text-2xl max-md:text-xl'><HighlightText text={'Reset Password'} /></h1>
                    <form onSubmit={submitHandler} className='w-[60%] max-md:w-[70%] max-phone:w-[80%] p-7 rounded-3xl h-fit flex flex-col gap-y-5 mx-auto bg-white max-md:p-5 max-phone:p-4 max-phone:py-7 max-md:rounded-2xl max-phone:rounded-lg'>
                        <div className='flex gap-y-3 flex-col'>
                            <label htmlFor="password" className='text-lg max-phone:text-sm max-md:text-base'>Password <span className='text-sm text-red-500'>*</span></label>
                            <div className='w-full flex items-center px-5 py-3 max-md:p-3 max-smallPhone:p-2 max-phone:text-xs max-md:text-sm justify-between bg-[#f2f0ff] rounded-xl max-md:rounded-lg'>
                                <input 
                                    onChange={changeHandler}
                                    value={newPasswordDetails.password}
                                    id='password' 
                                    className='outline-none text-slate-700 w-full bg-transparent max-phone:placeholder:text-xs'
                                    name='password'
                                    placeholder='Password '
                                    type={`${showPassword1 ? 'text' : 'password'}`} 
                                />
                                <button 
                                onClick={(e) => { e.preventDefault(); setShowPassword1(!showPassword1) }} 
                                className='text-2xl max-md:text-xl max-phone:text-lg text-[#5a48c1]'>
                                    {
                                        showPassword1 ? <IoEyeOffSharp /> : <IoEyeSharp />
                                    }
                                </button>
                            </div>
                        </div>
                        <div className='flex gap-y-3 flex-col'>
                            <label htmlFor="password" className='text-lg max-phone:text-sm max-md:text-base'>Confirm Password <span className='text-sm text-red-500'>*</span></label>
                            <div className='w-full flex items-center px-5 py-3 max-md:p-3 max-smallPhone:p-2 max-phone:text-sm max-md:text-sm  justify-between bg-[#f2f0ff] rounded-xl max-md:rounded-lg'>
                                <input 
                                    onChange={changeHandler}
                                    value={newPasswordDetails.confirmPassword}
                                    id='confirmPassword ' 
                                    className='outline-none text-slate-700 w-full bg-transparent max-phone:placeholder:text-xs'
                                    name='confirmPassword'
                                    placeholder='Confirm Password'
                                    type={`${showPassword2 ? 'text' : 'password'}`} 
                                />
                                <button 
                                onClick={(e) => { e.preventDefault(); setShowPassword2(!showPassword2) }} 
                                className='text-2xl max-md:text-xl max-phone:text-lg text-[#5a48c1]'>
                                    {
                                        showPassword2 ? <IoEyeOffSharp /> : <IoEyeSharp />
                                    }
                                </button>
                            </div>
                        </div>

                        <button type='submit' className=' max-md:text-sm max-smallPhone:text-xs text-base bg-gradient-to-r from-[#9181f5] to-[#5a48c1] px-3 py-2 rounded-md text-white transition-all w-fit duration-300 ease-in-out hover:scale-[1.08] mx-auto'>
                            Confirm
                        </button>
                    </form>
                </div>
            )
        }
    </>
  )
}

export default ResetPassword
