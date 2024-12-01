import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MyProfile from './Pages/MyProfile';
import MyBookings from './Pages/MyBookings';
import AddTrain from './Pages/AddTrain';
import LoginPage from './Pages/LoginPage';
import SignUpUser from './Pages/SignUpUser';
import UserHome from './Pages/UserHome';
import ViewScheduleUser from './Pages/ViewScheduleUser';
import ConfirmBooking from './Pages/ConfirmBooking';
import TrainSettings from './Pages/TrainSettings';
import TrainScheduleSettings from './Pages/TrainScheduleSettings';
import Booking from './Pages/Booking';
import AddSchedule from './Pages/AddSchedule';
import AddAdmin from './Pages/AddAdmin';
import AdminHome from './Pages/AdminHome';

function App() {
  const userRole = localStorage.getItem('userRole');
  const authToken = localStorage.getItem('authToken');
  const username = localStorage.getItem('username');

  const requireAdmin = (element) => {
    return userRole === 'admin' ? element : <Navigate to="/login" />;
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpUser />} />
          {userRole === 'user' && (
            <>
              <Route path="/home" element={<UserHome />} />
              <Route path="/schedule" element={<ViewScheduleUser />} />
              <Route path="/confirmBooking" element={<ConfirmBooking />} />
              <Route path='/myprofile' element={<MyProfile />} />
              <Route path='/mybookings' element={<MyBookings />} />
            </>
          )}
          {userRole === 'admin' && (
            <>
              <Route path='/addtrain' element={requireAdmin(<AddTrain />)} />
              <Route path='/trainsadmin' element={requireAdmin(<TrainSettings />)} />
              <Route path='/trainScheduleAdmin' element={requireAdmin(<TrainScheduleSettings />)} />
              <Route path='/bookings' element={requireAdmin(<Booking />)} />
              <Route path='/addSchedule' element={requireAdmin(<AddSchedule />)} />
              <Route path='/addAdmin' element={requireAdmin(<AddAdmin />)} />
              <Route path='/adminHome' element={requireAdmin(<AdminHome />)} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;