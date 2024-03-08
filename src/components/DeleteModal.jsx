import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext';
import Loader from './Loader';

const DeleteModal = ({ setDeleteModal, deleteHandler, id }) => {
    const { loading } = useContext(AppContext);
    const handleClick = async () => {
        await deleteHandler(id);
    }

  return (
    <>
      {
        loading ? (<Loader />) : (
          <div className='h-fit w-[60%] max-tablet:w-[80%] justify-center max-lg:ml-10 max-tablet:ml-auto max-tablet:my-10 mx-auto flex flex-col items-center mt-10 gap-y-5 bg-white max-md:rounded-xl  rounded-2xl p-5'>
            <p className='text-xl text-center max-md:text-lg max-smallPhone:text-base'>Are you sure you want to delete the note?</p>
            <div className='flex gap-x-3 max-smallPhone:gap-x-2 max-[200px]:flex-col max-[200px]:gap-y-2 items-center'>
              <button onClick={handleClick} className='bg-[#d9534f] text-sm px-3 py-2 rounded-md text-white transition-all w-fit duration-300 ease-in-out hover:scale-[1.08]'>Delete</button>
              <button onClick={() => { setDeleteModal(false); }} className='px-3 py-2 text-sm rounded-md bg-slate-500 text-white transition-all w-fit duration-300 ease-in-out hover:scale-[1.08]'>Close</button>
            </div>
          </div>
        )
      }

    </>
  )
}

export default DeleteModal
