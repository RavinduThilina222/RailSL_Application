import React from 'react'
import LoginPage from './Pages/LoginPage'
import './index.css'
import SignUpUser from './Pages/SignUpUser'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpUser />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
