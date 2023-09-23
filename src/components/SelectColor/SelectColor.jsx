import React from 'react'
import { useState, useEffect } from 'react'
import './SelectColor.css'

const SelectColor = () => {
  const [showStartButton, setShowStartButton] = useState(true);

  return (
    <>
      <div className='selectedcolor-container'>
        <div className={`color-square ${showStartButton ? 'start-color-square' : ''}`}></div>
        <button onClick={() => setShowStartButton(!showStartButton)} className={`${showStartButton ? 'start-button' : 'hidden'}`}>
        START
        </button>
      </div>
    </>
  )
}

export default SelectColor
