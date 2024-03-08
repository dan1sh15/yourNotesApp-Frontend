import React from 'react'
import HighlightText from './HighlightText'

const About = () => {
  return (
    <div className='w-10/12 h-[90vh] max-xl:w-11/12 max-lg:w-full pt-[12vh] pb-10 mx-auto text-center max-md:gap-y-3 gap-y-5 flex flex-col'>
      <h1 className='text-center text-3xl max-md:text-2xl font-bold'><HighlightText text="About Us" /></h1>
      <div className='flex flex-col gap-y-3 bg-white max-md:rounded-2xl max-md:text-sm max-phone:text-xs rounded-3xl p-5 mx-auto text-lg text-left w-10/12 max-md:w-11/12'>
        <p>Welcome to yourNotes, your go-to destination for organizing your thoughts, ideas, and tasks effortlessly.</p>
        <p>At yourNotes app you can create your account using email. It provides the login/signup functionality to store you own notes and view them using your own password.</p>
        <p>Our mission is simple: to provide you with a seamless note-taking experience that enhances your productivity and creativity. With features like customizable categories:
            <ul className=' marker:text-[#5a48c1] mx-10 max-phone:mx-7 max-smallPhone:mx-5 my-5 list-disc'>
                <li>Create Note</li>
                <li>Read Note</li>
                <li>Update Note</li>
                <li>Delete Note</li>
            </ul>
        easy-to-use tags, and seamless synchronization across devices, staying organized has never been easier.</p>
        <p>Join the yourNotes community today and take control of your ideas like never before.</p>
      </div>
    </div>
  )
}

export default About
