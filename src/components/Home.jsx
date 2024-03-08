import React, { useContext, useEffect } from 'react'
import AddNote from './AddNote'
import Notes from './Notes'
import { AppContext } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom';
import Loader from "./Loader";

const Home = () => {

    const { showEditModal, loading } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if(token === undefined || token === null || token === '') {
        navigate('/login');
      }
    // eslint-disable-next-line
    }, []);

  return (
    <>
      {
        loading ? (<Loader />) : (
          <div className={`min-h-screen pt-[12vh] max-xl:w-11/12 max-lg:w-full ${showEditModal ? 'max-tablet:flex-col' : 'max-tablet:flex-col-reverse'} flex justify-between flex-row-reverse w-10/12 mx-auto`}>
              <AddNote showEditModal={showEditModal} />
              <Notes />
          </div>
        )
      }
    </>
  )
}

export default Home
