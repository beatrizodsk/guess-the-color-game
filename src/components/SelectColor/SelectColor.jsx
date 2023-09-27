import React from 'react'
import { useState, useEffect } from 'react'
import { useAppState } from '../../contexts/AppStateContext';
import './SelectColor.css'

const SelectColor = () => {
  const { gameStarted, startGame, correctColor  } = useAppState();

  return (
    <>
      {console.log(correctColor)}
      <div className='selectedcolor-container'>
        <div className={`color-square ${!gameStarted ? 'start-color-square' : ''}`} style={{ backgroundColor: correctColor }}></div>
        <button onClick={() => startGame()} className={`${!gameStarted ? 'start-button' : 'hidden'}`}>
        START
        </button>
      </div>
    </>
  )
}

export default SelectColor
