import React from 'react'
import { useAppState } from '../../contexts/AppStateContext';
import Button from '../Button/Button';
import './SelectColor.css'

const SelectColor = () => {
  const { gameStarted, correctColor  } = useAppState();

  return (
    <>
      <div className='selectedcolor-container'>
        <div className={`color-square ${!gameStarted ? 'start-color-square' : ''}`} style={{ backgroundColor: correctColor }}></div>
        <Button type={'start'}/>
      </div>
    </>
  )
}

export default SelectColor
