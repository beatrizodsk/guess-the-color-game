import React from 'react'
import './SideBar.css'
import { useState, useEffect } from 'react';
import { useAppState } from '../../contexts/AppStateContext';

const SideBar = () => {
  const { userAnswers, gameStarted } = useAppState();
  const [showMenuButton, setShowMenuButton] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isIndexEven = (index) => {
    return index % 2 === 0;
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
          {gameStarted && (
            <div className="header-obs">
              <div className="sidebar-guessed-color">Guessed Color</div>
              <div className="sidebar-correct-color">Correct Color</div>
              <div className="sidebar-score">Time</div>
            </div>
          )}
        </div>
        <div className="sibedar-content">
          {userAnswers.map((userAnswer, index) => (
            <div key={index}>
              {userAnswer.selectedColor === userAnswer.correctColor ? (
                // Exibir informações de resposta correta
                <div className="correct-answer">
                  <div className="color-correct-answer-container-wide">
                    <div className="color-correct-answer-wide" style={{ backgroundColor: userAnswer.correctColor }}>
                      {userAnswer.selectedColor}
                    </div>
                  </div>
                  <div className="score-answer">
                    {userAnswer.answerTime} s
                  </div>
                </div>
              ) : (
                // Exibir informações de resposta errada
                <div className="wrong-answer">
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
                    {userAnswer.answerTime} s
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
            {gameStarted && (
              <div className="header-obs">
                <div className="sidebar-guessed-color">Guessed Color</div>
                <div className="sidebar-correct-color">Correct Color</div>
                <div className="sidebar-score">Time</div>
              </div>
            )}
          </div>
          <div className="sibedar-content">
            {userAnswers.map((userAnswer, index) => (
              <div key={index}>
                {userAnswer.selectedColor === userAnswer.correctColor ? (
                // Exibir informações de resposta correta
                  <div className="correct-answer">
                    <div className="color-correct-answer-container-wide">
                      <div className="color-correct-answer-wide" style={{ backgroundColor: userAnswer.correctColor }}>
                        {userAnswer.selectedColor}
                      </div>
                    </div>
                    <div className="score-answer">
                      {userAnswer.answerTime} s
                    </div>
                  </div>
                ) : (
                // Exibir informações de resposta errada
                  <div className="wrong-answer">
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
                      {userAnswer.answerTime} s
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
