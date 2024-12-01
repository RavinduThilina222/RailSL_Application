import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '/src/Components/Navbar';
import axios from 'axios';

const AdminHome = () => {
  const [trainCount, setTrainCount] = useState(0);
  const [todayBookings, setTodayBookings] = useState([]);
  const username = localStorage.getItem('username');
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    // Fetch the number of trains
    axios.get('/api/train/number')
      .then(response => {
        if (Array.isArray(response.data)) {
          setTrainCount(response.data.length);
        } else {
          console.error('Unexpected response data:', response.data);
        }
      })
      .catch(error => console.error('Error fetching train data:', error));

    // Fetch today's bookings
    const today = new Date().toISOString().split('T')[0];
    axios.get('/api/bookings')
      .then(response => {
        if (Array.isArray(response.data)) {
          const todayBookings = response.data.filter(booking => {
            const scheduleDate = new Date(booking.scheduled_date).toISOString().split('T')[0];
            return scheduleDate === today;
          });
          setTodayBookings(todayBookings);
        } else {
          console.error('Unexpected response data:', response.data);
        }
      })
      .catch(error => console.error('Error fetching booking data:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar />
      <h1>Welcome, Admin {username}</h1>
      <h2 className="text-2xl font-bold mb-4">Admin Home</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-bold mb-2">Number of Trains</h3>
          <p className="text-3xl">{trainCount}</p>
        </div>
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-bold mb-2">Today's Bookings</h3>
          <ul>
            {todayBookings.length > 0 ? (
              todayBookings.map((booking) => (
                <li key={booking.booking_id}>
                  Booking ID: {booking.booking_id}, Train No: {booking.train_no}, User ID: {booking.user_id}
                </li>
              ))
            ) : (
              <li>No bookings for today</li>
            )}
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <Link to="/trainsadmin" className="block bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-center">Train Settings</Link>
        <Link to="/trainScheduleAdmin" className="block bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-center">Train Schedule Settings</Link>
        <Link to="/bookings" className="block bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-center">Booking</Link>
        <Link to="/addAdmin" className="block bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-center">Add Admin</Link>
      </div>
    </div>
  );
};

export default AdminHome;