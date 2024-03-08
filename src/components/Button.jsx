import React from 'react'

const Button = ({ btnText }) => {
  return (
    <button className=' bg-gradient-to-r from-[#9181f5] to-[#5a48c1] max-md:text-sm max-smallPhone:text-xs text-base px-3 py-2 rounded-md text-white transition-all w-fit mx-auto duration-300 ease-in-out hover:scale-[1.08]'>
        {btnText}
    </button>
  ) 
}

export default Button
