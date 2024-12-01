import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '/src/Components/Navbar';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const username = localStorage.getItem('username');
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user/me');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchBookings = async () => {
        try {
          const response = await axios.get(`/api/bookings?user_id=${user.User_ID}`);
          setBookings(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      };

      fetchBookings();
    }
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4">
        <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
        <h1>Bookings of {username}</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Booking ID</th>
              <th className="py-2">Train Number</th>
              <th className="py-2">Scheduled Date</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.booking_id}>
                  <td className="py-2">{booking.booking_id}</td>
                  <td className="py-2">{booking.train_no}</td>
                  <td className="py-2">{new Date(booking.scheduled_date).toLocaleDateString()}</td>
                  <td className="py-2">{booking.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-2">No bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;