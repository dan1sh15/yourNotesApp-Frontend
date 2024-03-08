import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full h-[10vh] max-phone:h-fit max-phone:py-4 py-2 bg-gradient-to-r text-white from-[#8e82ee] to-[#5a48c1]'>
        <div className='w-10/12 h-full mx-auto flex max-md:flex-col max-md:gap-y-2 max-md:justify-evenly items-center justify-between'>
            <p className='text-lg max-tablet:text-sm text-center'>Thanks for choosing © yourNotes App.</p>
            <div className='flex gap-x-3 items-center max-[350px]:flex-col'>
                <p className='text-lg max-tablet:text-sm text-center'>Contact Us:</p>
                <a href="mailto:yournotesapp123@gmail.com" className='text-sm text-center max-tablet:text-xs'>yournotesapp123@gmail.com</a>
            </div>
        </div>
    </footer>
  )
}

export default Footer
