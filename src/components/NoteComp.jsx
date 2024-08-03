import React from 'react';
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
};

const NoteComp = ( {note, editHandler, handleDelete} ) => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    
    <div onClick={handleOpen} key={note._id} className={`flex flex-col justify-between cursor-pointer max-md:gap-y-3 gap-y-5 bg-white max-sm:rounded-2xl rounded-3xl relative max-phone:p-4 p-5 transition-all duration-300 ease-in-out hover:scale-[1.05] shadow-xl`}>
        <p className='text-lg max-md:text-base'>{note.title}</p>
        <div className=' text-[0.75rem] max-phone:text-[0.65rem] max-phone:px-2 max-phone:py-1 max-phone:top-[-0.75rem] max-md:text-xs absolute right-2 p-2 rounded-lg text-white top-[-1.15rem] z-10 bg-[#7a65ed]'>{note.tag.length === 0 ? "General" : note.tag}</div>

        <p className='w-full h-full bg-[#f2f0ff] rounded-lg max-md:p-2 max-md:text-xs p-3 text-sm text-slate-700'>{note.description.length > 140 ? note.description.substring(0, 140) + '...' : note.description}</p>

        <div className='flex w-full justify-between items-center'>
          <button title='Edit/Read' onClick={() => {editHandler(note._id, note)}} className='bg-[#5a48c1] p-2 rounded-full max-md:text-lg text-xl text-white'><FiEdit /></button>
          <button title='Delete' onClick={ () => { handleDelete(note._id) } } className='bg-[#5a48c1] p-2 rounded-full max-md:text-lg text-xl text-white'><AiOutlineDelete /></button>
        </div>


    </div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className='flex flex-col gap-y-5 rounded-xl bg-white border-none max-phone:w-[80vw] w-[30%] p-7 max-md:p-5 outline-none max-tablet:w-[40%] max-sm:w-[60%]'>
      <p className='text-2xl max-md:text-xl text-center font-bold'>{note.title}</p>
        <p className='text-lg max-phone:px-2 max-phone:py-1 max-phone:top-[-0.75rem] max-md:text-sm absolute right-2 p-2 rounded-lg text-white top-[-1.15rem] z-10 bg-[#7a65ed]'>{note.tag.length === 0 ? "General" : note.tag}</p>
        <p className='text-lg bg-[#f2f0ff] rounded-lg max-md:p-2 max-md:text-xs p-3 break-words text-slate-700'>{note?.description}</p>

        <div className='flex w-full justify-between items-center max-smallPhone:flex-col max-smallPhone:gap-y-2'>
          <button title='Edit/Read' onClick={() => {editHandler(note._id, note)}} className='bg-[#5a48c1] p-2 rounded-md flex gap-x-2 items-center max-smallPhone:w-full max-md:text-sm justify-center text-xl text-white'>Edit<FiEdit /></button>
          <button title='Delete' onClick={ () => { handleDelete(note._id) } } className='bg-[#5a48c1] p-2 rounded-md max-md:text-sm text-xl flex gap-x-2 max-smallPhone:w-full items-center justify-center text-white'>Delete<AiOutlineDelete className='max-smallPhone:text-lg' /></button>
        </div>
      </Box>
    </Modal>
    
    </>
  )
}

export default NoteComp
