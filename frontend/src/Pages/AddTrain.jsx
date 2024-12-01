import React, { useState } from 'react';
import Navbar from '/src/Components/Navbar';
import axios from 'axios';

const AddTrain = () => {
  const [trainDetails, setTrainDetails] = useState({
    train_no: '',
    train_name: '',
    Train_Line: '',
    departure_station: '',
    arrival_station: '',
    available_days: '',
    capacity: '',
    depature_time: '',
    arrival_time: ''
  });

  const username = localStorage.getItem('username');
  const authToken = localStorage.getItem('authToken');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainDetails({
      ...trainDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const daysRegex = /^(Weekdays|Weekend|Daily)$/;
    const trainNoRegex = /^[0-9]{1,4}$/;
    const trainNameRegex = /^[a-zA-Z\s]{1,50}$/;
    const trainLineRegex = /^[a-zA-Z\s]{1,50}$/;

    if (!trainNoRegex.test(trainDetails.train_no)) {
      alert('Train number must be a number with up to 4 digits');
      return;
    }
    if (!trainNameRegex.test(trainDetails.train_name)) {
      alert('Train name must be alphabetic and up to 50 characters');
      return;
    }
    if (!trainLineRegex.test(trainDetails.Train_Line)) {
      alert('Train line must be alphabetic and up to 50 characters');
      return;
    }
    if (!daysRegex.test(trainDetails.available_days)) {
      alert('Available days must be Weekdays, Weekend, or Daily');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/train/trains', trainDetails, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Check response status
      if (response.status === 201) {
        alert('Train added successfully');
        // Additional success handling (e.g., reset form)
      } else {
        alert('Failed to add train');
      }
    } catch (error) {
      console.error('Full error:', error);
      console.error('Error response:', error.response?.data);
      
      // More informative error message
      if (error.response) {
        alert(`Error: ${error.response.data.message || 'Failed to add train'}`);
      } else {
        alert('Network error or server is not responding');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar />
      <h1>Add Train - Admin {username}</h1>
      <h2 className="text-2xl font-bold mb-4">Add Train</h2>
      <form className="bg-white p-6 rounded shadow-md max-w-md mx-auto" onSubmit={handleSubmit}>
        <input className="mb-4 p-2 border border-gray-300 rounded w-full" type="text" name="train_no" placeholder="Train No" value={trainDetails.train_no} onChange={handleChange} required />
        <input className="mb-4 p-2 border border-gray-300 rounded w-full" type="text" name="train_name" placeholder="Train Name" value={trainDetails.train_name} onChange={handleChange} required />
        <select className="mb-4 p-2 border border-gray-300 rounded w-full" name="Train_Line" value={trainDetails.Train_Line} onChange={handleChange} required>
          <option value="" disabled>Select Train Line</option>
          <option value="Main">Main</option>
          <option value="Costal">Costal</option>
          <option value="North">North</option>
          <option value="Mannar">Mannar</option>
          <option value="KV">KV</option>
          <option value="Batticoloa">Battilicoa</option>
          <option value="Trincomalli">Trincomalee</option>
        </select>
        <select className="mb-4 p-2 border border-gray-300 rounded w-full" name="departure_station" value={trainDetails.departure_station} onChange={handleChange} required>
          <option value="Choose Depature" selected>From</option>
          <option value="Colombo Fort">Colombo Fort</option>
          <option value="Kandy">Kandy</option>
          <option value="Nanu Oya">Nanu Oya</option>
          <option value="Badulla">Badulla</option>
          <option value="Matara">Matara</option>
          <option value="Beliaththa">Beliaththa</option>
          <option value="Anuradhapura">Anuradhapura</option>
          <option value="Jaffna">Jaffna</option>
          <option value="Thalaimannar">Thalaimannar</option>
          <option value="Trincomalle">Trincomalle</option>
          <option value="Batticoloa">Batticoloa</option>
          <option value="Awissawella">Awissawella</option>
        </select>
        <select className="mb-4 p-2 border border-gray-300 rounded w-full" name="arrival_station" value={trainDetails.arrival_station} onChange={handleChange} required>
          <option value="Choose Depature" selected>To</option>
          <option value="Colombo Fort">Colombo Fort</option>
          <option value="Kandy">Kandy</option>
          <option value="Nanu Oya">Nanu Oya</option>
          <option value="Badulla">Badulla</option>
          <option value="Matara">Matara</option>
          <option value="Beliaththa">Beliaththa</option>
          <option value="Anuradhapura">Anuradhapura</option>
          <option value="Jaffna">Jaffna</option>
          <option value="Thalaimannar">Thalaimannar</option>
          <option value="Trincomalle">Trincomalle</option>
          <option value="Batticoloa">Batticoloa</option>
          <option value="Awissawella">Awissawella</option>
        </select>
        <select className="mb-4 p-2 border border-gray-300 rounded w-full" name="available_days" value={trainDetails.available_days} onChange={handleChange} required>
          <option value="" disabled>Select Available Days</option>
          <option value="Weekdays">Weekdays</option>
          <option value="Weekend">Weekend</option>
          <option value="Daily">Daily</option>
        </select>
        <input className="mb-4 p-2 border border-gray-300 rounded w-full" type="number" name="capacity" placeholder="Capacity" value={trainDetails.capacity} onChange={handleChange} required />
        <input className="mb-4 p-2 border border-gray-300 rounded w-full" type="time" name="depature_time" placeholder="Departure Time" value={trainDetails.depature_time} onChange={handleChange} required />
        <input className="mb-4 p-2 border border-gray-300 rounded w-full" type="time" name="arrival_time" placeholder="Arrival Time" value={trainDetails.arrival_time} onChange={handleChange} required />
        <button className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600" type="submit">Add Train</button>
      </form>
    </div>
  );
};

export default AddTrain;