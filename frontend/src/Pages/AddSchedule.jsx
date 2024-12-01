import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar'; // Corrected import path

const AddSchedule = () => {
  const [scheduleDetails, setScheduleDetails] = useState({
    schedule_id: '',
    train_no: '', 
    scheduled_date: '',
    no_of_booked_seats: 0,
    createdAt: '', // Initialize as empty string
    updatedAt: ''  // Initialize as empty string
  });

  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Fetch the list of trains to populate the train_no dropdown
    const fetchTrains = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/train/trains'); // Corrected API endpoint
        if (response.headers['content-type'].includes('application/json')) {
          setTrains(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching trains:', error);
      }
    };

    fetchTrains();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScheduleDetails({
      ...scheduleDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();
    try {
      const response = await axios.post('http://localhost:8080/api/schedule/schedules', {
        ...scheduleDetails,
        createdAt: timestamp,
        updatedAt: timestamp
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        alert('Schedule added successfully');
      } else {
        alert('Failed to add schedule');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding schedule');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar />
      <h2 className="text-2xl font-bold mb-4">Add Schedule</h2>
      <form className="bg-white p-6 rounded shadow-md max-w-md mx-auto" onSubmit={handleSubmit}>
        
        <select
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          name="train_model"
          value={scheduleDetails.train_model} // Corrected value attribute
          onChange={handleChange}
          required
        >
          <option value="">Select Train </option>
          {Array.isArray(trains) && trains.map((train) => (
            <option key={train.train_no} value={train.train_name}>
              {train.train_name} ({train.train_no})
            </option>
          ))}
        </select>
        <input
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          type="date"
          name="scheduled_date"
          value={scheduleDetails.scheduled_date}
          onChange={handleChange}
          required
        />
       
        <button className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600" type="submit">
          Add Schedule
        </button>
      </form>
    </div>
  );
};

export default AddSchedule;
