import React, { useEffect } from 'react';
import './Timer.css';

const Timer = () => {
  useEffect(() => {
    // const countdownEl = document.querySelector(".countdown");
    const progressBarEl = document.querySelector(".progress");

    let remainingTime = 60; // seconds
    const totalTime = remainingTime;

    function countdown() {
      if (remainingTime > 0) {
        // update progress bar
        const progress = ((totalTime - remainingTime) / totalTime) * 100;
        progressBarEl.style.width = `${progress}%`;

        remainingTime--;
        setTimeout(countdown, 1000);
      } else {
        // countdown finished
        progressBarEl.style.width = "100%";
        // countdownEl.textContent = "Time's up!";
      }
    }

    countdown();
  }, []);

  return (
    <>
      <div className="progress-bar">
        <div className="progress"></div>
      </div>

      {/* <span className="countdown"></span> */}
    </>
  )
}

export default Timer;