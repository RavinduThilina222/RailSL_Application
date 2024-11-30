import React, { useState, useEffect } from 'react';
import Navbar from '/src/Components/Navbar';

const AddSchedule = () => {
  const [scheduleDetails, setScheduleDetails] = useState({
    schedule_id: '',
    train_no: '',
    scheduled_date: '',
    no_of_booked_seats: 0
  });

  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Fetch the list of trains to populate the train_no dropdown
    const fetchTrains = async () => {
      try {
        const response = await fetch('/api/trains');
        const data = await response.json();
        setTrains(data);
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
    try {
      const response = await fetch('/api/schedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(scheduleDetails)
      });
      if (response.ok) {
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
          name="train_no"
          value={scheduleDetails.train_no}
          onChange={handleChange}
          required
        >
          <option value="">Select Train No</option>
          {trains.map((train) => (
            <option key={train.train_no} value={train.train_no}>
              {train.train_no} - {train.train_name}
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