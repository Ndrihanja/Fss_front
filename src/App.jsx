import { useState } from 'react'
import Routes from './routes'
import './App.scss'
import { AuthContextProvider } from './context/AuthContext'

function App() {


  return (
    <AuthContextProvider>
      <div className="App">
        <Routes />
      </div>
    </AuthContextProvider>
  )
}

export default App
