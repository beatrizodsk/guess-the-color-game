import React, { useState, useEffect } from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import './GuessedColor.css';

const GuessedColor = () => {
  const {
    currentGameColors,
    handleAnswer,
    remainingTime,
    gameStarted,
    correctColor,
    startRound,
    registerUserAnswer,
  } = useAppState();
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    setSelectedColor('');
  }, [currentGameColors, correctColor]);

  const selectColor = (color) => {
    if (gameStarted && remainingTime > 0) {
      setSelectedColor(color);
      handleAnswer(color);
      registerUserAnswer(color);
      startRound();
    }
  };

  return (
    <>
      <div className="guessedcolor-container">
        {currentGameColors.map((color, index) => (
          <button
            disabled={!gameStarted || remainingTime <= 0}
            key={index}
            className={`guessedcolor ${
              selectedColor === color ? 'selected' : ''
            }`}
            onClick={() => selectColor(color)}
          >
            {color}
          </button>
        ))}
      </div>
    </>
  );
};

export default GuessedColor;
