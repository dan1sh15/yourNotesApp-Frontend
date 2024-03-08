import React, { useContext } from 'react';  
import HighlightText from './HighlightText';
import toast from 'react-hot-toast';
import { AppContext } from '../Context/AppContext';
import Loader from './Loader';

const EditModal = (props) => {
    const { updateNote, setUpdateNote, id, setShowEditModal } = props;
    const { notes, setNotes, loading, setLoading } = useContext(AppContext);

    const changeHandler = (event) => {
        setUpdateNote(prevNote => {
            return {
                ...prevNote,
                [event.target.name]: event.target.value
            }
        });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        const url = process.env.REACT_APP_BASE_URL + `/editNote/${id}`
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({...updateNote})
        });

        const responseData = await response.json();

        if(responseData.success) {
            
            let newNote = JSON.parse(JSON.stringify(notes));
            
            for(let i=0; i<newNote.length; i++) {
                if(newNote[i]._id === id) {
                    newNote[i].title = updateNote.title;
                    newNote[i].description = updateNote.description;
                    newNote[i].tag = updateNote.tag;
                    break;
                }
            }
            
            setNotes(newNote);
            setLoading(false);
            setShowEditModal(false);
            toast.success(responseData.message);
        } else {
            toast.error(responseData.message);
            setLoading(false);
            setShowEditModal(false);
        }
    };

    const closeHandler = () => {
        setShowEditModal(false);
    };

  return (
   <>
        {
            loading ? (<Loader />) : (
                <div className='w-10/12 max-xl:w-11/12 max-lg:w-full max-phone:h-full mx-auto max-phone:py-5 max-md:py-7 py-10'>
                    <h1 className='mb-5 text-center text-3xl max-md:text-2xl font-bold'><HighlightText text={'Edit Note'} /></h1>
                    <form onSubmit={submitHandler} className='flex flex-col w-[60%] max-md:w-[80%] max-md:rounded-2xl max-md:p-7 max-phone:p-5 mx-auto bg-white rounded-3xl p-10 gap-y-5'>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor="title" className='text-lg max-md:text-base font-bold'>Title</label>
                            <input 
                                onChange={changeHandler}
                                value={updateNote.title}  
                                className='outline-none text-slate-700 max-phone:text-xs max-phone:px-3 max-phone:py-2 max-phone:rounded-lg max-md:px-4 px-5 py-3 bg-[#f2f0ff] max-md:text-sm rounded-xl'
                                type="text" 
                                id='title'
                                name='title'
                                placeholder='Enter title'
                            />
                        </div>
            
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor="description" className='text-lg max-md:text-base font-bold'>Description</label>
                            <textarea 
                                onChange={changeHandler}
                                value={updateNote.description}
                                className='outline-none text-slate-700 max-phone:text-xs max-phone:px-3 max-phone:py-2 max-phone:rounded-lg max-md:px-4 px-5 py-3 bg-[#f2f0ff] max-md:text-sm rounded-xl'
                                name="description" 
                                id="description" 
                                cols="30" 
                                rows="5"
                                placeholder='Enter description'
                            />
                        </div>
            
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor="tag" className='text-lg max-md:text-base font-bold'>Tag</label>
                            <input 
                                onChange={changeHandler}
                                value={updateNote.tag}
                                className='outline-none text-slate-700 max-phone:text-xs max-phone:px-3 max-phone:py-2 max-phone:rounded-lg max-md:px-4 px-5 py-3 bg-[#f2f0ff] max-md:text-sm rounded-xl'
                                type="text"
                                id='tag'
                                name='tag'
                                placeholder='Enter tag'
                            />
                        </div>
                        
                        <div className='flex justify-center max-smallPhone:flex-col max-smallPhone:gap-y-2 mx-auto items-center gap-x-3'>     
                            <button type='submit' className=' bg-gradient-to-r from-[#9181f5] to-[#5a48c1] max-md:text-sm max-phone:text-xs text-base px-3 py-2 rounded-md text-white transition-all w-fit duration-300 ease-in-out hover:scale-[1.08]'>Edit Note</button>
                            <button onClick={closeHandler} className='px-3 py-2 text-sm rounded-md bg-slate-500 max-md:text-sm max-phone:text-xs text-white transition-all w-fit duration-300 ease-in-out hover:scale-[1.08]'>Close</button>
                        </div>
                    </form>
                </div>
            )
        }
   </>
  )
}

export default EditModal
