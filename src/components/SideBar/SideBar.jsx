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

  // Função para verificar se uma cor é clara ou escura
  const isColorDark = (hexColor) => {
    // Converter cor hexadecimal para RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Calcular o brilho da cor
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Retorna verdadeiro se a cor for escura, falso se for clara
    return brightness < 128; // Você pode ajustar esse valor se necessário
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
          {/* {gameStarted && ( */}
          <div className="header-obs">
            <div className="sidebar-guessed-color">Guessed Color</div>
            <div className="sidebar-correct-color">Correct Color</div>
            <div className="sidebar-score">Time</div>
          </div>
          {/* )} */}
        </div>
        <div className="sibedar-content">
          {userAnswers.map((userAnswer, index) => (
            <div key={index}>
              {userAnswer.selectedColor === userAnswer.correctColor ? (
                // Exibir informações de resposta correta
                <div className={`correct-answer ${isColorDark(userAnswer.selectedColor) ? 'light-text' : 'dark-text'}`}>
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
                <div className={`wrong-answer ${isColorDark(userAnswer.selectedColor) ? 'light-text' : 'dark-text'}`}>
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
            {/* {gameStarted && ( */}
            <div className="header-obs">
              <div className="sidebar-guessed-color">Guessed Color</div>
              <div className="sidebar-correct-color">Correct Color</div>
              <div className="sidebar-score">Time</div>
            </div>
            {/* )} */}
          </div>
          <div className="sibedar-content">
            {userAnswers.map((userAnswer, index) => (
              <div key={index}>
                {userAnswer.selectedColor === userAnswer.correctColor ? (
                // Exibir informações de resposta correta
                  <div className={`correct-answer ${isColorDark(userAnswer.selectedColor) ? 'light-text' : 'dark-text'}`}>
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
                  <div className={`wrong-answer ${isColorDark(userAnswer.selectedColor) ? 'light-text' : 'dark-text'}`}>
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
