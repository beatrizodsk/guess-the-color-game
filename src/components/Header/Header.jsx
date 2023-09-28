import React from 'react'
import Modal from '@/Modal/Modal'
import { useState } from 'react'
import './Header.css'

const HeaderComponent  = () => {
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };

  return (
    <>
      <div className="title">
        <h3>Guess The Color</h3>
        <div className="rules" onClick={togglePopup}>
          <img width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/48/help--v1.png" alt="help--v1"/>
        </div>
      </div>

      {isPopupVisible && (
        <Modal togglePopup={togglePopup}/>
      )}
    </>
  )
}

export default HeaderComponent 
