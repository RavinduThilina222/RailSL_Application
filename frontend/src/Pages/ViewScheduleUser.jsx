import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const ViewScheduleUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [trains, setTrains] = useState([]);
  const user = location.state?.user;

  useEffect(() => {
    if (!location.state) return;
    // Fetch trains based on search criteria from location.state
    const fetchTrains = async () => {
      const response = await fetch('/api/trains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(location.state),
      });
      const data = await response.json();
      setTrains(data);
    };

    fetchTrains();
  }, [location.state]);

  const handleSelectTrain = (train) => {
    if (!location.state) return;
    navigate('/confirm-booking', { state: { ...location.state, train, user } });
  };

  return (
    <div>
      <Navbar />
      {/*Add a table in large dev for train schedule */}
      <div className="flex flex-col justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://seatreservation.railway.gov.lk/mtktwebslr/gallery/gallery-3.jpg')",
        }}
      >

        <div className="mt-8 bg-white bg-opacity-90 shadow-lg rounded-lg p-8 w-full max-w-4xl">
          <form className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-center text-blue-800">
              Train Schedule
            </h2>
            <table className="w-full border border-gray-400 rounded-md p-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <thead>
              <tr>
                <th className="px-4 py-2">Train Number</th>
                <th className="px-4 py-2">Train Name</th>
                <th className="px-4 py-2">Departure</th>
                <th className="px-4 py-2">Arrival</th>
                <th className="px-4 py-2">Departure Time</th>
                <th className="px-4 py-2">Arrival Time</th>
                <th className="px-4 py-2">Scheduled Date</th>
                <th className="px-4 py-2">Booked Seats</th>
                <th className="px-4 py-2"></th>
              </tr>
              </thead>
              <tbody>
                {trains.map((train) => (
                  <tr key={train.number} onClick={() => handleSelectTrain(train)}>
                    <td className="border px-4 py-2">{train.number}</td>
                    <td className="border px-4 py-2">{train.name}</td>
                    <td className="border px-4 py-2">{train.departure}</td>
                    <td className="border px-4 py-2">{train.arrival}</td>
                    <td className="border px-4 py-2">{train.departureTime}</td>
                    <td className="border px-4 py-2">{train.arrivalTime}</td>
                    <td className="border px-4 py-2">{train.scheduled_date}</td>
                    <td className="border px-4 py-2">{train.no_of_booked_seats}</td>
                    <td className="border px-4 py-2">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
        </div>      
    </div>
  )
}

export default ViewScheduleUser;
