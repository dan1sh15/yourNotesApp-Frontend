import React, { useContext, useState } from 'react'
import HighlightText from './HighlightText'
import Button from './Button'
import toast from 'react-hot-toast';
import { AppContext } from '../Context/AppContext';
import Loader from './Loader';

const AddNote = ({showEditModal}) => {

    const [noteData, setNoteData] = useState({
        title: "",
        description: "",
        tag: "",
    });

    const { notes, setNotes, loading, setLoading } = useContext(AppContext);

    function changeHandler(event) {
        setNoteData(prevNoteData => {
            return {
                ...prevNoteData,
                [event.target.name]: event.target.value,
            }
        });
    };

    async function submitHandler(event) {
        event.preventDefault();
        setLoading(true);
        const url = process.env.REACT_APP_BASE_URL + '/createNote';

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({...noteData})
        });

        const responseData = await response.json();

        if(responseData.success) {
            setLoading(false);
            toast.success(responseData.message);
            setNotes(notes.concat(responseData.data));
            setNoteData({
                title: "",
                description: "",
                tag: "",
            });
        } else {
            setLoading(false);
            toast.error(responseData.message);
        }
    };

  return (
    <>
    
        {
            loading ? (<Loader />) : (
                !showEditModal && <div className='w-10/12 max-xl:w-11/12 max-tablet:py-0 max-tablet:pb-5 h-full py-5 mx-auto'>
                                    <h1 className=' mb-5 text-center text-3xl max-md:text-2xl font-bold'><HighlightText text="Create Your Note" /></h1>
                                        <form onSubmit={submitHandler} className='flex flex-col max-md:w-[90%] max-md:rounded-2xl max-md:p-7 max-phone:p-5 w-[80%] mx-auto bg-white rounded-3xl p-10 gap-y-5'>
                                            <div className='flex flex-col gap-y-2'>
                                                <label htmlFor="title" className='text-lg max-phone:text-sm max-md:text-base font-bold'>Title<span className='text-red-500'>*</span></label>
                                                <input
                                                    onChange={changeHandler}
                                                    value={noteData.title} 
                                                    className='outline-none max-md:px-3 text-slate-700 max-md:py-2 max-md:text-sm max-phone:text-xs px-5 py-3 bg-[#f2f0ff] max-phone:rounded-lg rounded-xl' 
                                                    type="text" 
                                                    id="title" 
                                                    name='title' 
                                                    placeholder='Enter title'
                                                />
                                            </div>
                                
                                            <div className='flex flex-col gap-y-2'>
                                                <label htmlFor="description" className='text-lg font-bold max-phone:text-sm max-md:text-base'>Description<span className='text-red-500'>*</span></label>
                                                <textarea
                                                    onChange={changeHandler}
                                                    value={noteData.description}
                                                    rows={7} 
                                                    className='outline-none max-md:px-3 text-slate-700 max-md:py-2 max-md:text-sm max-phone:text-xs px-5 py-3 bg-[#f2f0ff] max-phone:rounded-lg rounded-xl' 
                                                    type="text" 
                                                    id='description' 
                                                    name='description' 
                                                    placeholder='Enter description' 
                                                />
                                            </div>
                                
                                            <div className='flex flex-col gap-y-2'>
                                                <label htmlFor="tag" className='text-lg max-phone:text-sm max-md:text-base font-bold'>Tag</label>
                                                <input 
                                                    onChange={changeHandler}
                                                    value={noteData.tag}
                                                    className='outline-none max-md:px-3 text-slate-700 max-md:py-2 max-md:text-sm max-phone:text-xs px-5 py-3 bg-[#f2f0ff] max-phone:rounded-lg rounded-xl' 
                                                    type="text" 
                                                    id='tag' 
                                                    name='tag' 
                                                    placeholder='Enter tag' 
                                                />
                                            </div>
                                
                                            <Button btnText={"Create Note"} />
                                        </form>
                                    </div>
            )
        }
    
    </>
  )
}

export default AddNote
