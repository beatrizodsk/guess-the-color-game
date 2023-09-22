import React from 'react'
import './SideBar.css'
import { useState, useEffect } from 'react';

const SideBar = () => {
  const [showMenuButton, setShowMenuButton] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 700) {
        setShowMenuButton(true);
      } else {
        setShowMenuButton(false);
        setIsMenuOpen(false);
      }
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className={`${showMenuButton ? 'hidden' : 'sidebar-container'} ${isMenuOpen ? 'expanded' : ''}`}>
        <h6>Current/Latest game</h6>
      </div>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`sandwich-menu-button ${showMenuButton ? 'visible' : 'hidden'}`}>
        oi
      </button>
    </>
  )
}

export default SideBar
