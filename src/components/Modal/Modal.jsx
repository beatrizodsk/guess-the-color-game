import React from 'react';
import './Modal.css';

const Modal = ({ togglePopup }) => {
  const onClose = () => {
    togglePopup();
  };

  return (
    <>
      <div className="custom-popup">
        <div className="popup-content">
          <h2>Game Rules</h2>
          <p>
            The game is all about guessing as many colors as possible in 30 seconds! When the game starts, a random color will appear, and you&apos;ll be presented with three options (in hexadecimal format). Among these, two will be incorrect (randomly generated), and one will be correct.
          </p>
          <p>
            You&apos;ll have 10 seconds for each round to make your guess, and your score will be determined as follows:
          </p>
          <ul>
            <li>If you don&apos;t answer in time, you&apos;ll lose 2 points.</li>
            <li>If you answer in time but get it wrong, you&apos;ll lose 1 point.</li>
            <li>If you answer in time and get it right, you&apos;ll earn a fantastic 5 points!</li>
          </ul>
          <p>
            Let&apos;s see how many colors you can guess correctly and rack up those points!
          </p>
          <button onClick={onClose}>
                CLOSE
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
