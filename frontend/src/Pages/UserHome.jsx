import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '/src/Components/Navbar';

const UserHome = () => {
  const navigate = useNavigate();
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [passengers, setPassengers] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/view-schedule', {
      state: { departure, arrival, date, passengers },
    });
  };

  return (
    <>
      <Navbar />

      <div
        className="flex flex-col justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://seatreservation.railway.gov.lk/mtktwebslr/gallery/gallery-3.jpg')",
        }}
      >
        <h1 className="text-4xl font-extrabold text-white bg-black bg-opacity-50 px-4 py-2 rounded-md shadow-lg">
          Welcome to RailSL Booking System
        </h1>

        <div className="mt-8 bg-white bg-opacity-90 shadow-lg rounded-lg p-8 w-full max-w-md">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold text-center text-blue-800">
              Book a Train
            </h2>
            <select
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="w-full border border-gray-400 rounded-md p-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Choose Depature"  selected>
                From
              </option>
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

            <select
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              className="w-full border border-gray-400 rounded-md p-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Choose Arrival"  selected>
                To
              </option>
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

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-400 rounded-md p-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              placeholder="Number of Passengers"
              max={5}
              min={1}
              className="w-full border border-gray-400 rounded-md p-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserHome;
