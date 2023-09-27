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
    startRound, // Adicione a função startRound do contexto
    registerUserAnswer,
  } = useAppState();
  const [selectedColor, setSelectedColor] = useState('');
  const [options, setOptions] = useState([]);

  // Monitora as mudanças nas cores atuais e na cor correta
  useEffect(() => {
    setSelectedColor('');
    generateOptions();
  }, [currentGameColors, correctColor]);

  const generateOptions = () => {
    if (currentGameColors.length === 0) {
      return; // Não há cores para gerar opções
    }

    const shuffledColors = currentGameColors.sort(() => Math.random() - 0.5);
    const correctIndex = shuffledColors.indexOf(correctColor);

    // Garanta que haja apenas três opções
    const options = shuffledColors.slice(correctIndex, correctIndex + 1); // Adicione a cor correta
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
      startRound(); // Inicie uma nova rodada após a seleção
    }
  };

  return (
    <>
      {gameStarted && ( // Condicional para mostrar conteúdo apenas quando o jogo estiver em andamento
        <div className="guessedcolor-container">
          {options.map((color, index) => (
            <button
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
      )}
    </>
  );
};

export default GuessedColor;
