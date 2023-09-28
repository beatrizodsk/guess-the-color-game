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
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setSelectedColor('');
    generateOptions();
  }, [currentGameColors, correctColor]);

  const generateOptions = () => {
    if (currentGameColors.length === 0) {
      return;
    }

    const shuffledColors = currentGameColors.sort(() => Math.random() - 0.5);
    const correctIndex = shuffledColors.indexOf(correctColor);

    const options = shuffledColors.slice(correctIndex, correctIndex + 1);
    while (options.length < 3) {
      const randomColor = shuffledColors.pop();
      if (randomColor !== correctColor) {
        options.push(randomColor);
      }
    }

    setOptions(options.sort(() => Math.random() - 0.5));
  };

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
        {options.map((color, index) => (
          <button
            disabled={!gameStarted}
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
