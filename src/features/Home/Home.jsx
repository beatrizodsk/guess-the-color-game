import React from 'react'
import SideBar from '@/SideBar/SideBar'
import Container from '/src/features/Container/Container'
import { useEffect } from 'react';
import './Home.css'

const Home = () => {
  useEffect(() => {
    const adaptScreenSize = () => {
      if (window.innerWidth <= 750) {
        let el = document.getElementById('adaptContent');

        el.classList.add('adapted');
      } else {
        let el = document.getElementById('adaptContent');

        el.classList.remove('adapted');
      }
    };

    adaptScreenSize();

    window.addEventListener('resize', adaptScreenSize);

    return () => {
      window.removeEventListener('resize', adaptScreenSize);
    };
  }, []);

  return (
    <>
      <div className='wrapper'>
        <SideBar/>
        <div className='content-wrapper'>
          <div id='adaptContent' className='content'>
            <Container/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
