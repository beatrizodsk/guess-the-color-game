import React from 'react'
import Scoreboard from '@/Scoreboard/Scoreboard'
import Timer from '@/Timer/Timer'
import SelectColor from '@/SelectColor/SelectColor'
import GuessedColor from '@/GuessedColor/GuessedColor'
import Button from '@/Button/Button'
import Modal from '@/Modal/Modal'
import { useState } from 'react'
import './Container.css'

const Container = () => {
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };

  return (
    <>
      <div className='container'>
        <div className="title">
          <h3>Guess The Color</h3>
          <div className="rules" onClick={togglePopup}>
            <img width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/48/help--v1.png" alt="help--v1"/>
          </div>
        </div>
        <Scoreboard/>
        <Timer/>
        <SelectColor/>
        <GuessedColor/>
        <Button/>

        {isPopupVisible && (
          <Modal togglePopup={togglePopup}/>
        )}
      </div>
    </>
  )
}

export default Container
