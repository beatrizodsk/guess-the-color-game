import React from 'react'
import Home from '/src/features/Home/Home'
import AppStateContext from './contexts/AppStateContext'
import { AppStateProvider } from './contexts/AppStateContext'

const App = () => {

  return (
    <>
      <AppStateProvider>
        <Home/>
      </AppStateProvider>
    </>
  )
}

export default App
