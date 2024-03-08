import React from 'react';
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

const NoteComp = ( {note, editHandler, handleDelete} ) => {
  return (
    <div key={note._id} className={`flex flex-col justify-between max-md:gap-y-3 gap-y-5 bg-white max-sm:rounded-2xl rounded-3xl relative max-phone:p-4 p-5 transition-all duration-300 ease-in-out hover:scale-[1.05] shadow-xl`}>
        <p className='text-lg max-md:text-base'>{note.title}</p>
        <div className=' text-[0.75rem] max-phone:text-[0.65rem] max-phone:px-2 max-phone:py-1 max-phone:top-[-0.75rem] max-md:text-xs absolute right-2 p-2 rounded-lg text-white top-[-1.15rem] z-10 bg-[#7a65ed]'>{note.tag.length === 0 ? "General" : note.tag}</div>

        <p className='w-full h-full bg-[#f2f0ff] rounded-lg max-md:p-2 max-md:text-xs p-3 text-sm text-slate-700'>{note.description.length > 140 ? note.description.substring(0, 140) + '...' : note.description}</p>

        <div className='flex w-full justify-between items-center'>
        <button title='Edit/Read' onClick={() => {editHandler(note._id, note)}} className='bg-[#5a48c1] p-2 rounded-full max-md:text-lg text-xl text-white'><FiEdit /></button>
        <button title='Delete' onClick={ () => { handleDelete(note._id) } } className='bg-[#5a48c1] p-2 rounded-full max-md:text-lg text-xl text-white'><AiOutlineDelete /></button>
        </div>
    </div>
  )
}

export default NoteComp
