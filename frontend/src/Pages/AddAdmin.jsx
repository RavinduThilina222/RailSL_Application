import React, { useState } from 'react';
import Navbar from '/src/Components/Navbar';

const AddAdmin = () => {
  const [adminDetails, setAdminDetails] = useState({
    admin_id: '',
    user_name: '',
    password: '',
    full_name: '',
    email: '',
    phone_number: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails({
      ...adminDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting admin details:", { ...adminDetails, password: '******' }); // Mask password
    console.log("Request payload:", adminDetails); // Log the request payload
  
    try {
      const response = await fetch('http://localhost:8080/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminDetails)
      });
      if (response.ok) {
        alert('Admin added successfully');
      } else {
        const errorData = await response.json();
        alert(`Failed to add admin: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error adding admin: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar />
      <h2 className="text-2xl font-bold mb-4">Add Admin</h2>
      <form className="bg-white p-6 rounded shadow-md max-w-md mx-auto" onSubmit={handleSubmit}>
        <input
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          type="text"
          name="admin_id"
          placeholder="Admin ID"
          value={adminDetails.admin_id}
          onChange={handleChange}
          required
        />
        <input
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          type="text"
          name="user_name"
          placeholder="Username"
          value={adminDetails.user_name}
          onChange={handleChange}
          required
        />
        <input
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          type="password"
          name="password"
          placeholder="Password"
          value={adminDetails.password}
          onChange={handleChange}
          required
        />
        <input
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={adminDetails.full_name}
          onChange={handleChange}
          required
        />
        <input
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          type="email"
          name="email"
          placeholder="Email"
          value={adminDetails.email}
          onChange={handleChange}
          required
        />
        <input
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={adminDetails.phone_number}
          onChange={handleChange}
          required
        />
        <button className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600" type="submit">
          Add Admin
        </button>
      </form>
    </div>
  );
};

export default AddAdmin;