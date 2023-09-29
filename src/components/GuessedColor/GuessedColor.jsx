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
  const [shuffledColors, setShuffledColors] = useState([]);

  useEffect(() => {
    const shuffled = shuffleArray(currentGameColors);
    setShuffledColors(shuffled);
  }, [currentGameColors, correctColor]);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const selectColor = (color) => {
    if (gameStarted && remainingTime > 0) {
      setSelectedColor(color);
      handleAnswer(color);
      registerUserAnswer(color);
      startRound();
    }
    setSelectedColor('');
  };

  return (
    <>
      <div className="guessedcolor-container">
        {shuffledColors.map((color, index) => (
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
