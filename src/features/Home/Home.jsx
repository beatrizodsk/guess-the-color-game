import React from 'react'
import SideBar from '@/SideBar/SideBar'
import Container from '/src/features/Container/Container'
import './Home.css'

const Home = () => {

  return (
    <>
      <div className='wrapper'>
        <SideBar/>
        <div className='content-wrapper'>
          <div className='content'>
            <Container/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
