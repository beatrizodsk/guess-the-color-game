import React from 'react'
import './Scoreboard.css'

const Scoreboard = () => {

  return (
    <>
      <div className='scoreboard-container'>
        <div className="remaining-time">
          <div className="time-container">
            <h6>Remaining Time</h6>
            <div className="time">17</div>
          </div>
        </div>
        <div className="restart">
          <button>RESTART</button>
        </div>
        <div className="score-container">
          <div className="high-score">
            <h6>High Score</h6>
            <div className="high-score-number">13</div>
          </div>
          <div className="score">
            <h6>Score</h6>
            <div className="score-number">12</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Scoreboard
