import React from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import './Timer.css';

const Timer = () => {
  const { progressWidth } = useAppState();

  return (
    <>
      <div className="progress-bar">
        <div className="progress" style={{ width: progressWidth }}></div>
      </div>
    </>
  );
};

export default Timer;
