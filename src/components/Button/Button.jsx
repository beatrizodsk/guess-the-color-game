import React from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import './Button.css';

const Button = ({type}) => {
  const { resetAllData, restartGame, gameStarted, gameOver, startGame } = useAppState();

  const handleReset = () => {
    resetAllData();
  };

  return (
    <>
      {type === 'start' && (
        <button onClick={() => startGame()} className={`${!gameStarted ? 'start-button' : 'hidden'}`}>START</button>
      )}
      {type === 'reset' && (
        <button className="reset-button" onClick={handleReset}>Reset</button>
      )}
      {type === 'restart' && (
        <button className='restart-button' onClick={restartGame} disabled={!gameStarted || gameOver}>Restart</button>
      )}
    </>
  );
};

export default Button;
