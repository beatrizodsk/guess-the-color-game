import React from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import './Scoreboard.css';

const Scoreboard = () => {
  const {
    remainingTime,
    highScore,
    score,
    gameStarted,
    restartGame,
    gameOver,
  } = useAppState();

  const displayRemainingTime = gameStarted ? remainingTime : 0;

  return (
    <>
      <div className="scoreboard-container">
        <div className="remaining-time">
          <div className="time-container">
            <h6>Remaining Time</h6>
            <div className="time">{displayRemainingTime}</div>
          </div>
        </div>
        <div className="restart">
          <button onClick={restartGame} disabled={!gameStarted || gameOver}>RESTART</button>
        </div>
        <div className="score-container">
          <div className="high-score">
            <h6>High Score</h6>
            <div className="high-score-number">{highScore}</div>
          </div>
          <div className="score">
            <h6>Score</h6>
            <div className="score-number">{score}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Scoreboard;
