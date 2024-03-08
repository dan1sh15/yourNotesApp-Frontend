import React from 'react';
import "./Loader.css"

const Loader = () => {
  return (
    <div className='h-[90vh] w-[90vw] mx-auto flex items-center justify-center'>
      <div className="spinner"></div>
    </div>
  )
}

export default Loader
