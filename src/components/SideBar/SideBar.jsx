import React from 'react'
import './SideBar.css'
import { useState, useEffect } from 'react';

const SideBar = () => {
  const [showMenuButton, setShowMenuButton] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 750) {
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
      <div className={`menu-expanded-container ${isMenuOpen ? 'expanded' : ''}`}>
        <div className={`${showMenuButton ? 'hidden' : 'sidebar-container'}`}>
          <div className="header-container">
            <div className="header">
              <h5>Current/Latest game</h5>
            </div>
            <div className="header-obs">
              <div className="sidebar-guessed-color">Guessed Color</div>
              <div className="sidebar-correct-color">Correct Color</div>
              <div className="sidebar-score">Score</div>
            </div>
          </div>
          <div className="sibedar-content"></div>
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`sandwich-menu-button ${showMenuButton ? 'visible' : 'hidden'}`}>
        Menu
        </button>
      </div>
    </>
  )
}

export default SideBar
