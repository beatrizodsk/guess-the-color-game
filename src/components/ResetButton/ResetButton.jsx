import React from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import './ResetButton.css';

const ResetButton = () => {
  const { resetAllData } = useAppState();

  const handleReset = () => {
    resetAllData();
  };

  return (
    <>
      <button className="reset-button" onClick={handleReset}>
        ResetButton
      </button>
    </>
  );
};

export default ResetButton;
