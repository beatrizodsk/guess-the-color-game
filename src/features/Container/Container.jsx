import React from 'react'
import ScoreBoard from '@/ScoreBoard/ScoreBoard'
import Timer from '@/Timer/Timer'
import ColorDisplay from '@/ColorDisplay/ColorDisplay'
import GuessedColor from '@/GuessedColor/GuessedColor'
import Button from '@/Button/Button'
import Header from '@/Header/Header'
import './Container.css'

const Container = () => {

  return (
    <>
      <div className='container'>
        <Header/>
        <ScoreBoard/>
        <Timer/>
        <ColorDisplay/>
        <GuessedColor/>
        <Button type={'reset'}/>
      </div>
    </>
  )
}

export default Container
