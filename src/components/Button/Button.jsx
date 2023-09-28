import React from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import './Button.css';

const Button = () => {
  const { resetAllData } = useAppState();

  const handleReset = () => {
    resetAllData();
  };

  return (
    <>
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </>
  );
};

export default Button;
