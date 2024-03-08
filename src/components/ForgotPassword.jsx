import React, { useContext, useState } from 'react';
import HighlightText from './HighlightText';
import forgotPassword from '../assets/forgotPassword.jpg';
import { MdOutlineEmail } from "react-icons/md";
import Button from './Button';
import toast from 'react-hot-toast';
import { AppContext } from '../Context/AppContext';
import Loader from './Loader';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const {loading, setLoading} = useContext(AppContext);
    
    const changeHandler = (event) => {
        setEmail(event.target.value);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        const url = process.env.REACT_APP_BASE_URL + '/auth/reset-password-token';

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: email}),
        });

        const responseData = await response.json();

        if(responseData.success) {
            setLoading(false);
            toast.success("Verification email has been sent to your account, please check");
            setShowSuccess(true);
        } else {
            setLoading(false);
            toast.error(responseData.message);
        }

        setEmail("");
    };

  return (
    <>
        {
            loading ? (<Loader />) : (
                <div className='w-10/12 max-xl:w-11/12 mx-auto flex flex-col gap-y-7 py-7 max-md:justify-start justify-center items-center min-h-[80vh]'>
                    <div className='w-[70%] h-[60%] max-xl:w-[75%]  max-md:flex-col max-md:rounded-xl max-phone:p-3 flex justify-between p-5  bg-white max-phone:rounded-xl max-smallPhone:p-2 max-phone:py-5 max-smallPhone:w-[85%] rounded-3xl'>
                        <div className='w-[55%] max-md:h-[50%] max-md:w-full max-xl:w-[50%]'>
                            <img loading='lazy' className=' object-cover' src={forgotPassword} alt="forgot password" />
                        </div>
                        <div className='w-[45%] max-xl:w-[50%] max-md:h-[50%] max-md:w-full flex px-3 flex-col justify-center gap-y-5 '>
                            <h1 className='text-3xl text-center max-lg:text-2xl max-phone:text-xl max-smallPhone:text-lg'><HighlightText text={'Forgot your Password?'} /></h1>
                            <form onSubmit={submitHandler} className='flex flex-col gap-y-5'>
                                <div className='flex flex-col gap-y-3'>
                                    <div className='flex px-5 max-tablet:px-4 max-tablet:py-3 items-center max-lg:text-sm max-smallPhone:gap-x-2 max-phone:text-xs max-sm:w-full max-phone:w-full max-md:p-3 gap-x-3 py-3 rounded-xl max-phone:rounded-md bg-[#f2f0ff]'>
                                        <MdOutlineEmail className='text-xl max-phone:text-base' />
                                        <input
                                            required
                                            value={email}
                                            onChange={changeHandler}
                                            placeholder='Enter your registered email'
                                            className='w-full text-slate-700 bg-transparent outline-none max-md:placeholder:text-xs '
                                            name='email'
                                            id='email' 
                                            type="email" 
                                        />
                                    </div>
                                </div>
                                <Button btnText={'Reset Password'} />
                            </form>
                        </div>

                    </div>
                    

                    {
                        showSuccess && (<div className='w-[70%] max-md:w-full px-1 rounded-lg bg-gradient-to-r text-white from-[#8e82ee] to-[#5a48c1] py-7 max-md:py-5 max-phone:py-4 text-center'>
                                        <p className='text-white italic text-lg max-md:text-sm max-phone:text-xs'>An email with password reset link has been sent to your email. Please check and continue the procedure.</p>
                                    </div>)
                    }

                </div>
            )
        }
    </>
  )
}

export default ForgotPassword
