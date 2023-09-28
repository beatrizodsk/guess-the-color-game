import React from 'react'
import './SideBar.css'
import { useState, useEffect } from 'react';
import { useAppState } from '../../contexts/AppStateContext';

const SideBar = () => {
  const { userAnswers } = useAppState();
  const [showMenuButton, setShowMenuButton] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isTextDark = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.6 ? true : false;
  };

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
        <div className="sibedar-content">
          {userAnswers.map((userAnswer, index) => (
            <div key={index} className={`${index % 2 === 0 ? 'even-row' : ''}`}>
              {userAnswer.selectedColor === userAnswer.correctColor ? (
                <div className={`correct-answer ${isTextDark(userAnswer.selectedColor) ? 'dark-text' : 'light-text'}`}>
                  <div className="color-correct-answer-container-wide">
                    <div className="color-correct-answer-wide" style={{ backgroundColor: userAnswer.correctColor }}>
                      {userAnswer.selectedColor}
                    </div>
                  </div>
                  <div className="score-answer">
                    <img width="20" height="20" src="https://img.icons8.com/papercut/60/checked.png" alt="checked"/>
                    {userAnswer.answerTime}s
                  </div>
                </div>
              ) : (
                <div className={`wrong-answer ${isTextDark(userAnswer.selectedColor) ? 'dark-text' : 'light-text'}`}>
                  <div className="color-wrong-answer-container">
                    <div className="color-wrong-answer" style={{ backgroundColor: userAnswer.selectedColor }}>
                      {userAnswer.selectedColor}
                    </div>
                  </div>
                  <div className="color-correct-answer-container">
                    <div className="color-correct-answer" style={{ backgroundColor: userAnswer.correctColor }}>
                      {userAnswer.correctColor}
                    </div>
                  </div>
                  <div className="score-answer">
                    <img width="20" height="20" src="https://img.icons8.com/fluency/48/cancel.png" alt="cancel"/>
                    {userAnswer.answerTime}s
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`sandwich-menu-button ${showMenuButton ? 'visible' : 'hidden'}`}>
        Menu
      </button>
      {isMenuOpen && (
        <div className="overlay-content">
          <div className="header-container-overlay">
            <div className="header">
              <h5>Current/Latest game</h5>
            </div>
            <div className="header-obs-overlay">
              <div className="sidebar-guessed-color-overlay">Guessed Color</div>
              <div className="sidebar-correct-color-overlay">Correct Color</div>
              <div className="sidebar-score">Score</div>
            </div>
          </div>
          <div className="sibedar-content">
            {userAnswers.map((userAnswer, index) => (
              <div key={index} className={`${index % 2 === 0 ? 'even-row-overlay' : 'odd-row-overlay'}`}>
                {userAnswer.selectedColor === userAnswer.correctColor ? (
                  <div className={`correct-answer ${isTextDark(userAnswer.selectedColor) ? 'dark-text' : 'light-text'}`}>
                    <div className="color-correct-answer-container-wide">
                      <div className="color-correct-answer-wide" style={{ backgroundColor: userAnswer.correctColor }}>
                        {userAnswer.selectedColor}
                      </div>
                    </div>
                    <div className="score-answer">
                      <img width="20" height="20" src="https://img.icons8.com/papercut/60/checked.png" alt="checked"/>
                      {userAnswer.answerTime}s
                    </div>
                  </div>
                ) : (
                  <div className={`wrong-answer ${isTextDark(userAnswer.selectedColor) ? 'dark-text' : 'light-text'}`}>
                    <div className="color-wrong-answer-container">
                      <div className="color-wrong-answer" style={{ backgroundColor: userAnswer.selectedColor }}>
                        {userAnswer.selectedColor}
                      </div>
                    </div>
                    <div className="color-correct-answer-container">
                      <div className="color-correct-answer" style={{ backgroundColor: userAnswer.correctColor }}>
                        {userAnswer.correctColor}
                      </div>
                    </div>
                    <div className="score-answer">
                      <img width="20" height="20" src="https://img.icons8.com/fluency/48/cancel.png" alt="cancel"/>
                      {userAnswer.answerTime}s
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default SideBar
