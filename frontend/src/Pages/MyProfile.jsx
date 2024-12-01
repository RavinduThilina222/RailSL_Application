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

  const [errors, setErrors] = useState({});

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

  const validateInput = () => {
    const newErrors = {};
    if (!user.Full_Name.trim()) newErrors.Full_Name = 'Full Name is required.';
    if (!/\S+@\S+\.\S+/.test(user.email)) newErrors.email = 'Invalid email format.';
    if (!/^\d{10}$/.test(user.phone_number)) newErrors.phone_number = 'Phone Number must be 10 digits.';
    if (!user.username.trim()) newErrors.username = 'Username is required.';
    if (user.password.length < 8) newErrors.password = 'Password must be at least 8 characters long.';
    if (!user.NIC.trim()) newErrors.NIC = 'NIC is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear error for this field
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;
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
        <h1>Profile of {username}</h1>
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
            {errors.Full_Name && <p className="text-red-500 text-sm">{errors.Full_Name}</p>}
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
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
            {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
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
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
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
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
            {errors.NIC && <p className="text-red-500 text-sm">{errors.NIC}</p>}
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