import React from 'react'
import LoginPage from './Pages/LoginPage'
import './index.css'
import UserHome from './Pages/UserHome'
import SignUpUser from './Pages/SignUpUser'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewScheduleUser from './Pages/ViewScheduleUser'
import ConfirmBooking from './Pages/ConfirmBooking'
import MyProfile from './Pages/MyProfile'
import MyBookings from './Pages/MyBookings'
import AddTrain from './Pages/AddTrain'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpUser />} />
          <Route path="/home" element={<UserHome />} />
          <Route path="/schedule" element={<ViewScheduleUser />} />
          <Route path="/confirmBooking" element={<ConfirmBooking />} />
          <Route path='/myprofile' element={<MyProfile />} />
          <Route path='/mybookings' element={<MyBookings />} />
          <Route path='/addtrain' element={AddTrain} />
        </Routes>
      </Router>
    </>
  )
}

export default App
