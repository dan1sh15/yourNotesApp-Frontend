import React, { useContext, useState } from 'react'
import HighlightText from './HighlightText';
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AppContext } from '../Context/AppContext';
import Loader from './Loader';
 
const ChangePassword = () => {

    const {loading, setLoading} = useContext(AppContext);

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);
    const navigate = useNavigate();


    const [newPasswordDetails, setNewPasswordDetails] = useState({
        newPassword: "",
        password: "",
        confirmPassword: "",
    });

    const changeHandler = (event) => {
        setNewPasswordDetails(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        });
    };

    const cancelHandler = () => {
        navigate('/');
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        const url = process.env.REACT_APP_BASE_URL + '/auth/changePassword';

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({...newPasswordDetails})
        });

        const responseData = await response.json();

        if(responseData.success) {
            setLoading(false);
            toast.success(responseData.message);
            navigate('/');
        } else {
            setLoading(false);
            toast.error(responseData.message);
        }
    };

  return (
    <>
        {
            loading ? (<Loader />) : (
                <div className='w-10/12 min-h-[90vh] max-xl:w-11/12 max-lg:w-full pt-[12vh] pb-10 mx-auto gap-y-5 flex flex-col'>
                    <h1 className='text-center text-3xl max-md:text-2xl font-bold'><HighlightText text="Change Password" /></h1>
                <form onSubmit={submitHandler} className='flex flex-col max-phone:w-[90%] max-md:w-[75%] w-[60%] mx-auto bg-white rounded-3xl max-phone:p-5 max-md:p-7 max-md:rounded-2xl p-10 gap-y-5'>
                    <div className='flex flex-col gap-y-2'>
                        <label htmlFor="newPassword" className='text-lg max-phone:text-sm max-md:text-base font-bold'>New Password<span className='text-red-500'> *</span></label>
                        <div className='w-full flex items-center px-5 py-3 max-md:p-3 max-smallPhone:p-2 max-phone:text-xs max-md:text-sm justify-between bg-[#f2f0ff] rounded-xl max-md:rounded-lg'>
                            <input 
                                id='newPassword' 
                                onChange={changeHandler}
                                value={newPasswordDetails.newPassword}
                                className='outline-none text-slate-700 w-full bg-transparent'
                                name='newPassword'
                                type={`${showPassword1 ? 'text' : 'password'}`} 
                            />
                            <button onClick={(e) => { e.preventDefault(); setShowPassword1(!showPassword1) }} className='text-2xl max-md:text-xl max-phone:text-lg text-[#5a48c1]'>
                                {
                                    showPassword1 ? <IoEyeOffSharp /> : <IoEyeSharp />
                                }
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <label htmlFor="password" className='text-lg max-phone:text-sm max-md:text-base font-bold '>Old Password<span className='text-red-500'> *</span></label>
                        <div className='w-full flex items-center px-5 py-3 max-md:p-3 max-smallPhone:p-2 max-phone:text-sm max-md:text-sm  justify-between bg-[#f2f0ff] rounded-xl max-md:rounded-lg'>
                            <input 
                                onChange={changeHandler}
                                value={newPasswordDetails.password}
                                id='password' 
                                className='outline-none text-slate-700 w-full bg-transparent'
                                name='password'
                                type={`${showPassword2 ? 'text' : 'password'}`} 
                            />
                            <button onClick={(e) => { e.preventDefault(); setShowPassword2(!showPassword2) }} className='text-2xl max-md:text-xl max-phone:text-lg text-[#5a48c1]'>
                                {
                                    showPassword2 ? <IoEyeOffSharp /> : <IoEyeSharp />
                                }
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-2'> 
                        <label htmlFor="confirmPassword" className='text-lg max-phone:text-sm max-md:text-base font-bold'>Confirm Old Password<span className='text-red-500'> *</span></label>
                        <div className='w-full flex items-center px-5 py-3 max-md:p-3 max-smallPhone:p-2 max-phone:text-xs max-md:text-sm  justify-between bg-[#f2f0ff] rounded-xl max-md:rounded-lg'>
                            <input 
                                onChange={changeHandler}
                                value={newPasswordDetails.confirmPassword}
                                id='confirmPassword' 
                                className='outline-none text-slate-700 w-full bg-transparent'
                                name='confirmPassword'
                                type={`${showPassword3 ? 'text' : 'password'}`} 
                            />
                            <button onClick={(e) => { e.preventDefault(); setShowPassword3(!showPassword3) }} className='text-2xl max-md:text-xl max-phone:text-lg text-[#5a48c1]'>
                                {
                                    showPassword3 ? <IoEyeOffSharp /> : <IoEyeSharp />
                                }
                            </button>
                        </div>
                    </div>

                    <div className='flex gap-x-3 items-center mx-auto'>
                        <button type='submit' className=' max-md:text-sm max-smallPhone:text-xs text-base bg-gradient-to-r from-[#9181f5] to-[#5a48c1] px-3 py-2 rounded-md text-white transition-all w-fit duration-300 ease-in-out hover:scale-[1.08]'>Confirm</button>
                        <button onClick={cancelHandler} className=' max-md:text-sm max-smallPhone:text-xs text-base px-3 py-2  rounded-md bg-slate-500 text-white transition-all w-fit duration-300 ease-in-out hover:scale-[1.08]'>Cancel</button>
                    </div>
                </form>
                </div>
            )
        }
    </>
  )
}

export default ChangePassword;
