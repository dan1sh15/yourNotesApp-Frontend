import React from 'react';
import "./highlightText.css";

const HighlightText = ({ text }) => {
  return (
    <span className='highlight'>
        {text}
    </span>
  )
}

export default HighlightText
