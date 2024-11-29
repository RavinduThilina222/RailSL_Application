import React from 'react';
import Navbar from '../Components/Navbar';

const ConfirmBooking = () => {
  const numberOfSeats = 3;
  const feePerSeat = 20;
  const bookingFee = 5;
  const totalFee = numberOfSeats * feePerSeat + bookingFee;

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
                  12345
                </p>
              </div>
              <div className="w-1/2">
                <label className="text-blue-800 font-semibold">Train Name</label>
                <p className="w-full border border-gray-400 rounded-md p-3 bg-gray-100">
                  Express Train
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-blue-800 font-semibold">Departure</label>
                <p className="w-full border border-gray-400 rounded-md p-3 bg-gray-100">
                  Colombo
                </p>
              </div>
              <div className="w-1/2">
                <label className="text-blue-800 font-semibold">Arrival</label>
                <p className="w-full border border-gray-400 rounded-md p-3 bg-gray-100">
                  Kandy
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-blue-800 font-semibold">Departure Time</label>
                <p className="w-full border border-gray-400 rounded-md p-3 bg-gray-100">
                  08:00 AM
                </p>
              </div>
              <div className="w-1/2">
                <label className="text-blue-800 font-semibold">Arrival Time</label>
                <p className="w-full border border-gray-400 rounded-md p-3 bg-gray-100">
                  10:00 AM
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-blue-800 font-semibold">Number of Seats</label>
                <p className="w-full border border-gray-400 rounded-md p-3 bg-gray-100">
                  {numberOfSeats}
                </p>
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
            <button
              className="bg-blue-600 text-blue-50 px-8 py-3 rounded-full font-light hover:bg-blue-400"
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