import React, { useState } from 'react';
import Navbar from '/src/Components/Navbar';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainDetails({
      ...trainDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/trains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(trainDetails)
      });
      if (response.ok) {
        alert('Train added successfully');
      } else {
        alert('Failed to add train');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding train');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar />
      <h2 className="text-2xl font-bold mb-4">Add Train</h2>
      <form className="bg-white p-6 rounded shadow-md max-w-md mx-auto" onSubmit={handleSubmit}>
        <input className="mb-4 p-2 border border-gray-300 rounded w-full" type="text" name="train_no" placeholder="Train No" value={trainDetails.train_no} onChange={handleChange} required />
        <input className="mb-4 p-2 border border-gray-300 rounded w-full" type="text" name="train_name" placeholder="Train Name" value={trainDetails.train_name} onChange={handleChange} required />
        <input className="mb-4 p-2 border border-gray-300 rounded w-full" type="text" name="Train_Line" placeholder="Train Line" value={trainDetails.Train_Line} onChange={handleChange} required />
        <input className="mb-4 p-2 border border-gray-300 rounded w-full" type="text" name="departure_station" placeholder="Departure Station" value={trainDetails.departure_station} onChange={handleChange} required />
        <input className="mb-4 p-2 border border-gray-300 rounded w-full" type="text" name="arrival_station" placeholder="Arrival Station" value={trainDetails.arrival_station} onChange={handleChange} required />
        <input className="mb-4 p-2 border border-gray-300 rounded w-full" type="text" name="available_days" placeholder="Available Days" value={trainDetails.available_days} onChange={handleChange} required />
        <input className="mb-4 p-2 border border-gray-300 rounded w-full" type="number" name="capacity" placeholder="Capacity" value={trainDetails.capacity} onChange={handleChange} required />
        <input className="mb-4 p-2 border border-gray-300 rounded w-full" type="time" name="depature_time" placeholder="Departure Time" value={trainDetails.depature_time} onChange={handleChange} required />
        <input className="mb-4 p-2 border border-gray-300 rounded w-full" type="time" name="arrival_time" placeholder="Arrival Time" value={trainDetails.arrival_time} onChange={handleChange} required />
        <button className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600" type="submit">Add Train</button>
      </form>
    </div>
  );
};

export default AddTrain;