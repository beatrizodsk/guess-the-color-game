import React from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import Button from '../Button/Button';
import './ScoreBoard.css';

const ScoreBoard = () => {
  const {
    remainingTime,
    highScore,
    score,
    gameStarted,
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
        <Button type={'restart'}/>
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

export default ScoreBoard;
