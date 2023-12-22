import React from 'react'
import Home from './Home'
import Login from './Login'
import Applications from './Applications'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path="/job/:jobId/applications" element={<Applications />} />
      </Routes>
    </Router>
  )
}

export default App