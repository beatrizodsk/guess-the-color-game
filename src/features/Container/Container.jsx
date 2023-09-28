import React from 'react'
import Scoreboard from '@/Scoreboard/Scoreboard'
import Timer from '@/Timer/Timer'
import SelectColor from '@/SelectColor/SelectColor'
import GuessedColor from '@/GuessedColor/GuessedColor'
import Button from '@/Button/Button'
import Header from '@/Header/Header'
import './Container.css'

const Container = () => {

  return (
    <>
      <div className='container'>
        <Header/>
        <Scoreboard/>
        <Timer/>
        <SelectColor/>
        <GuessedColor/>
        <Button type={'reset'}/>
      </div>
    </>
  )
}

export default Container
