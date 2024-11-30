import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '/src/Components/Navbar';

const MyProfile = () => {
  const [user, setUser] = useState({
    User_ID: '',
    Full_Name: '',
    email: '',
    phone_number: '',
    username: '',
    password: '',
    NIC: ''
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/user/me', user);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="Full_Name"
              value={user.Full_Name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={user.phone_number}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">NIC</label>
            <input
              type="text"
              name="NIC"
              value={user.NIC}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;