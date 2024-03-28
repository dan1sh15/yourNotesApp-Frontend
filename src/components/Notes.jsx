import React, { useContext, useEffect, useState } from 'react'
import HighlightText from './HighlightText'
import { AppContext } from '../Context/AppContext';
import Toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import NoteComp from './NoteComp';
import Loader from './Loader';

const Notes = () => {

  const { notes, setNotes, setIsLoggedIn, showEditModal, setShowEditModal, fetchUserData, setLoading } = useContext(AppContext);
  const navigate = useNavigate();

  const [id, setId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [notesLoading, setNotesLoading] = useState(false);
  const [updateNote, setUpdateNote] = useState({
    title: "",
    description: "",
    tag: ""
  });


  const fetchAllNotes = async () => {
    try {
      setNotesLoading(true);
      const url = process.env.REACT_APP_BASE_URL + '/getAllNotes';

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
      });

      const responseData = await response.json();

      if(responseData.success) {
        setNotesLoading(false);
        setNotes(responseData.data.notes);
      }
      else if(responseData.message === "Invalid token") {
        setNotesLoading(false);
        setIsLoggedIn(false);
        navigate('/login');
      }
      setNotesLoading(false);
    } catch (error) {
      console.log(error);
      Toast.error("Cannot fetch notes, please try again");
    }
  }

  const editHandler = (id, note) => {
      setId(id);
      setUpdateNote(note);
      setShowEditModal(true);
  };

  const deleteHandler = async (id) => {
      setLoading(true);
      const url = process.env.REACT_APP_BASE_URL + `/deleteNote/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });

      const responseData = await response.json();

      if(responseData.success) {

        // after successfull backend call make changes in the DOM 
        const newNote = notes.filter( (note) => { return note._id !== id } );
        setNotes(newNote);
        setLoading(false);
        Toast.success(responseData.message);

      } else {
        setLoading(false);
        Toast.error(responseData.message);
      }
      setDeleteModal(false);
  };

  const handleDelete = (id) => {
    setId(id);
    setDeleteModal(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token !== undefined && token !== null && token !== '') {
      setIsLoggedIn(true);
      fetchAllNotes();
      fetchUserData();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>

      {
        notesLoading ? (<Loader />) : (deleteModal ? (
          <DeleteModal setDeleteModal={setDeleteModal} deleteHandler={deleteHandler} id={id} />
        ) : (
          showEditModal ? (
            <EditModal id={id} updateNote={updateNote} setUpdateNote={setUpdateNote} setShowEditModal={setShowEditModal} />
              ) : (
                <section className='w-10/12 max-xl:w-11/12 max-tablet:w-full mx-auto py-5'>
                  <h1 className='text-center text-3xl max-md:text-2xl font-bold'><HighlightText text={`Your Notes`} /></h1>

                    {
                          notes.length === 0 ? (
                            <div className='w-10/12 mx-auto max-md:text-sm max-md:p-3 max-phone:text-xs max-phone:p-2 p-5 bg-white rounded-xl max-md:mt-7 max-phone:mt-5 max-md:rounded-lg mt-10'>
                              <p>No notes to display, please create some new notes.</p>
                            </div>
                          ) : (
                            <div className='w-10/12 mx-auto grid mt-10 grid-cols-2 max-tablet:grid-cols-3 max-md:grid-cols-2 max-sm:gap-x-4 max-phone:grid-cols-1 gap-x-5 gap-y-8'>
                              {
                                notes.map((note) => (
                                  <NoteComp  key={note._id} note={note} handleDelete={handleDelete} editHandler={editHandler} />
                                )) 
                              }
                            </div>
                          )
                    }
                    
                </section>
              )
        ))
      }
      
    </>
  )
}

export default Notes
