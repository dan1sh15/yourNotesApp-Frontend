import React, { useContext, useRef, useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import { FaUserLarge } from "react-icons/fa6";
import userIcon from "../assets/userIcon.png";
import { AppContext } from '../Context/AppContext';
import toast from 'react-hot-toast';

const Navbar = () => { 

    const { isLoggedIn, userData, fetchUserData, setIsLoggedIn } = useContext(AppContext);
    const [showProfileCard, setShowProfileCard] = useState(false);
    const toggleProfile = useRef();
    const [name, setName] = useState("");
    const [showName, setShowName] = useState(false);
    const navigate = useNavigate();
    const handleProfile = () => {
      setShowProfileCard(!showProfileCard);
    };

    const logoutHandler = () => {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setShowProfileCard(false);
      navigate('/login');
    }

    const handleNameChange = (event) => {
      setName(event.target.value);
    };

    const nameEditHandler = async (event) => {
      event.preventDefault();
      const url = process.env.REACT_APP_BASE_URL + '/auth/editUser';
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({name: name})
      });

      const responseData = await response.json();

      if(responseData.success) {
        await fetchUserData();
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message);
      }
      setName("");
      setShowName(false);
    };

    useEffect(() => {
      const handler = (event) => {
        if (!toggleProfile.current) {
          return;
        }
        // if click was not inside of the element. "!" means not
        // in other words, if click is outside the modal element
        if (!toggleProfile.current.contains(event.target)) {
          setShowProfileCard(false);
        }
      };
      // the key is using the `true` option
      // `true` will enable the `capture` phase of event handling by browser
      document.addEventListener("click", handler, true);
      return () => {
        document.removeEventListener("click", handler);
      };
    }, []);
    
    
  return (
    <div className={` h-[10vh] ${isLoggedIn ? 'fixed z-20' : 'max-smallPhone:h-[13vh]'}  w-full bg-gradient-to-r text-white from-[#8e82ee] to-[#5a48c1]`}>
      <div className='h-full flex items-center justify-between max-phone:w-11/12 w-10/12 mx-auto'>
        <div className='flex gap-x-5 max-md:gap-x-3 items-center'>
            <Link to='/'><h1 className='text-3xl  max-lg:text-2xl  max-phone:text-xl font-semibold'>yourNotes</h1></Link>
            <nav className='max-phone:hidden'>
                <ul className='flex gap-x-5 max-md:gap-x-3'>
                    <li className='transtion-all duration-300 max-md:text-sm max-sm:text-xs text-[#F8F8FF] ease-out hover:scale-[1.05]'><NavLink to={"/"}>Home</NavLink></li>
                    <li className='transtion-all duration-300 max-md:text-sm max-sm:text-xs text-[#F8F8FF] ease-out hover:scale-[1.05]'><NavLink to={"/about"}>About</NavLink></li>
                </ul>
            </nav>
        </div>


        {
        isLoggedIn ? (
            <div className='flex gap-x-3'>
                <div className='relative'>
                  <button onClick={ handleProfile } className={`${userData.image ? 'p-1' : 'p-2'} bg-white rounded-full max-phone:text-sm text-lg`}>
                    {
                        userData.image ? (<img src={userData.image} height={40} width={40} className='rounded-full max-phone:h-[30px] max-phone:w-[30px]' alt="" />) : (<FaUserLarge className='text-[#5a48c1]' />)
                    }
                  </button>
                  <div ref={toggleProfile} className={`h-[30px] ${showProfileCard ? 'block' : 'hidden'} w-[30px] top-10 max-md:-left-0 left-2 rotate-45 bg-white absolute z-10`} />
                  <div ref={toggleProfile} className={`absolute ${showProfileCard ? 'flex' : 'hidden'} -right-10 top-12 rounded-xl flex-col gap-y-5 items-center justify-center transition-all duration-300 ease-in-out bg-white max-lg:p-4 max-phone:p-3 max-phone:gap-y-3 p-5 text-black h-fit max-phone:w-[80vw] max-md:w-[300px] max-md:right-1 max-phone:-right-2 w-[400px] z-30`}>
                    
                    <div className='max-phone:flex hidden gap-x-2 items-center'>
                      <NavLink to={"/"} className={`text-sm`}>Home</NavLink>
                      <NavLink to={"/about"} className={`text-sm`}>About</NavLink>
                    </div>
                    
                    <div className='flex w-full items-center justify-evenly'>
                      <h1 className='text-xl max-phone:text-sm text-center max-md:text-base font-semibold'>{userData.name}</h1>
                      <img 
                        className={`${userData.image ? 'bg-none' : 'bg-[#5a48c1]'} max-phone:hidden rounded-full p-2`} 
                        src={userData.image ? userData.image : userIcon}
                        height={50} width={50} 
                        alt="user icon" 
                      />
                    </div>
                    <p className='text-lg max-phone:text-center max-phone:text-xs max-md:text-sm font-semibold'>Email: <span className='text-md font-normal text-[#5a48c1]'>{userData.email}</span></p>

                    <div className='flex justify-between max-phone:flex-col gap-x-3 items-center'>
                      <button onClick={() => {setShowName(!showName)}} className='max-phone:text-[0.65rem] max-md:text-xs text-sm text-[#5a48c1] font-semibold'>Edit Name</button>
                      <Link to={'/changePassword'} className='max-phone:text-[0.65rem] max-md:text-xs text-sm text-[#5a48c1] font-semibold' >Change Password</Link>
                    </div>

                    <div className='flex gap-x-3 max-smallPhone:flex-col max-smallPhone:gap-y-2'>
                      <button onClick={logoutHandler} className=' max-md:text-xs max-md:p-2 bg-gradient-to-r from-[#9181f5] to-[#5a48c1] px-3 py-2 text-sm rounded-md text-white transition-all w-fit mx-auto duration-300 ease-in-out hover:scale-[1.08]'>Logout</button>
                      <button onClick={handleProfile} className=' max-md:text-xs max-md:p-2 px-3 py-2 text-sm rounded-md bg-slate-500 text-white transition-all w-fit mx-auto duration-300 ease-in-out hover:scale-[1.08]'>Close</button>
                    </div>

                    <form onSubmit={nameEditHandler} className={`${showName ? 'flex' : 'hidden'} flex-col gap-y-5 w-full border-2 border-dashed border-[#5a48c1] max-md:p-5 max-phone:p-4 max-smallPhone:p-2 p-7 rounded-lg max-md:w-[80%]`}>
                      <div className='flex flex-col gap-y-3'>
                        <label htmlFor="name" className='text-sm max-md:text-xs max-smallPhone:text-center font-semibold'>Enter new name <span className='text-red-500'>*</span></label>
                        <input
                          required
                          onChange={handleNameChange}
                          className='outline-none p-3 max-phone:p-2 max-smallPhone:px-2 max-smallPhone:py-1 text-sm max-md:text-xs  bg-[#f2f0ff] rounded-lg'
                          id='name'
                          name='name'
                          placeholder='Enter new name'
                          value={name}
                          type="text" 
                        />
                      </div>
                      <div className='flex gap-x-2 mx-auto max-smallPhone:flex-col max-smallPhone:gap-y-2 items-center'>
                        <button type='submit' className='  max-md:text-xs max-md:p-2 bg-gradient-to-r from-[#9181f5] to-[#5a48c1] text-sm px-3 py-2 rounded-md text-white transition-all w-fit duration-300 ease-in-out hover:scale-[1.08]'>Confirm</button>
                        <button onClick={ () => { setShowName(!showName) } } className='  max-md:text-xs max-md:p-2 px-3 py-2 text-sm rounded-md bg-slate-500 text-white transition-all w-fit duration-300 ease-in-out hover:scale-[1.08]'>Cancel</button>
                      </div>
                    </form>

                  </div>
                </div>
            </div>
        ) : ( 
            <div className='flex gap-x-3 max-sm:gap-x-2 max-smallPhone:flex-col items-center max-smallPhone: gap-y-1'>
                <Link to={'/login'}><button className=' bg-white max-phone:text-xs max-sm:text-sm text-[#5a48c1] font-semibold px-3 py-1 rounded-md transition-all duration-300 ease-out hover:scale-[1.05]'>Login</button></Link>
                <Link to={'/signup'}><button className='bg-white text-[#5a48c1] max-phone:text-xs max-sm:text-sm font-semibold px-3 py-1 rounded-md transition-all duration-300 ease-out hover:scale-[1.05]'>Signup</button></Link>
            </div>
        )
      }
      </div>
    </div>
  )
}

export default Navbar
