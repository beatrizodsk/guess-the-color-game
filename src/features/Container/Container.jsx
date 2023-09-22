import React from 'react'
import Scoreboard from '@/Scoreboard/Scoreboard'
import Timer from '@/Timer/Timer'
import SelectColor from '@/SelectColor/SelectColor'
import GuessedColor from '@/GuessedColor/GuessedColor'
import ResetButton from '@/ResetButton/ResetButton'
import './Container.css'

const Container = () => {

  return (
    <>
      <div className='container'>
        <Scoreboard/>
        <Timer/>
        <SelectColor/>
        <GuessedColor/>
        <ResetButton/>
      </div>
    </>
  )
}

export default Container