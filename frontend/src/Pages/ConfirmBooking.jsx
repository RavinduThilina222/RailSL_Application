import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const ConfirmBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, passengers, user } = location.state || {};
  const [numPassengers, setNumPassengers] = useState(passengers || 1);

  if (!train || !passengers || !user) {
    return (
      <div>
        <Navbar />
        <div className="flex flex-col justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://seatreservation.railway.gov.lk/mtktwebslr/gallery/gallery-3.jpg')",
          }}>
          <div className="mt-8 bg-white bg-opacity-90 shadow-lg rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-center text-blue-800">
              Error: Missing booking details.
            </h2>
            <Link to="/home" className="text-blue-600 hover:underline">
              Go back to booking page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const feePerSeat = 20;
  const bookingFee = 5;
  const totalFee = numPassengers * feePerSeat + bookingFee;

  const handleConfirmBooking = async () => {
    const bookingData = {
      user_id: user.User_ID,
      schedule_id: train.schedule_id,
      booking_date: new Date(),
      status: 'Confirmed',
      seats: numPassengers,
      total_fee: totalFee
    };

    const response = await fetch('http://localhost:8080/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (response.ok) {
      navigate('/booking-success');
    } else {
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      {/* Add a large div for confirming the booking details */}
      <div className="flex flex-col justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://seatreservation.railway.gov.lk/mtktwebslr/gallery/gallery-3.jpg')",
        }}>
        <div className="mt-8 bg-white bg-opacity-90 shadow-lg rounded-lg p-8 w-full max-w-md">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-center text-blue-800">
              Confirm Booking
            </h2>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-blue-800 font-semibold">Train Number</label>
                <p className="w-full border border-gray-400 rounded-md p-3 bg-gray-100">
                  {train.number}
                </p>
              </div>
              <div className="w-1/2">
                <label className="text-blue-800 font-semibold">Train Name</label>
                <p className="w-full border border-gray-400 rounded-md p-3 bg-gray-100">
                  {train.name}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-blue-800 font-semibold">Departure</label>
                <p className="w-full border border-gray-400 rounded-md p-3 bg-gray-100">
                  {train.departure}
                </p>
              </div>
              <div className="w-1/2">
                <label className="text-blue-800 font-semibold">Arrival</label>
                <p className="w-full border border-gray-400 rounded-md p-3 bg-gray-100">
                  {train.arrival}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-blue-800 font-semibold">Departure Time</label>
                <p className="w-full border border-gray-400 rounded-md p-3 bg-gray-100">
                  {train.departureTime}
                </p>
              </div>
              <div className="w-1/2">
                <label className="text-blue-800 font-semibold">Arrival Time</label>
                <p className="w-full border border-gray-400 rounded-md p-3 bg-gray-100">
                  {train.arrivalTime}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-blue-800 font-semibold">Number of Seats</label>
                <input
                  type="number"
                  value={numPassengers}
                  onChange={(e) => setNumPassengers(e.target.value)}
                  className="w-full border border-gray-400 rounded-md p-3 bg-gray-100"
                  min="1"
                />
              </div>
              <div className="w-1/2">
                <label className="text-blue-800 font-semibold">Fee per Seat</label>
                <p className="w-full border border-gray-400 rounded-md p-3 bg-gray-100">
                  ${feePerSeat}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-blue-800 font-semibold">Booking Fee</label>
                <p className="w-full border border-gray-400 rounded-md p-3 bg-gray-100">
                  ${bookingFee}
                </p>
              </div>
              <div className="w-1/2">
                <label className="text-blue-800 font-semibold">Total Fee</label>
                <p className="w-full border border-gray-400 rounded-md p-3 bg-gray-100">
                  ${totalFee}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-blue-800 font-semibold">Scheduled Date</label>
                <p className="w-full border border-gray-400 rounded-md p-3 bg-gray-100">
                  {train.scheduled_date}
                </p>
              </div>
              <div className="w-1/2">
                <label className="text-blue-800 font-semibold">Booked Seats</label>
                <p className="w-full border border-gray-400 rounded-md p-3 bg-gray-100">
                  {train.no_of_booked_seats}
                </p>
              </div>
            </div>
            <button
              className="bg-blue-600 text-blue-50 px-8 py-3 rounded-full font-light hover:bg-blue-400"
              onClick={handleConfirmBooking}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmBooking;