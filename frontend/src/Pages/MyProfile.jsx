import React from 'react';
import Navbar from '../Components/Navbar';

const MyProfile = () => {
  const email = "john.doe@example.com"; // Assuming email is a constant for now

  return (
    <div>
      <Navbar />
      {/* Add a large div for the user profile */}
      <div className="flex flex-col justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://seatreservation.railway.gov.lk/mtktwebslr/gallery/gallery-3.jpg')",
        }}>
        <div className="mt-8 bg-white bg-opacity-90 shadow-lg rounded-lg p-8 w-full max-w-md">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-center text-blue-800">
              My Profile
            </h2>
            <div className="flex gap-6">
              <div className="w-1/2">
                <label className="text-blue-800 font-semibold">First Name</label>
                <p className="w-full border border-gray-400 rounded-md p-3 bg-gray-100">
                  John
                </p>
              </div>
              <div className="w-1/2">
                <label className="text-blue-800 font-semibold">Last Name</label>
                <p className="w-full border border-gray-400 rounded-md p-3 bg-gray-100">
                  Doe
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-1/2">
                <label className="text-blue-800 font-semibold">Email</label>
                <p className="w-full border border-gray-400 rounded-md p-3 bg-gray-100">
                  {email}
                </p>
              </div>
              <div className="w-1/2">
                <label className="text-blue-800 font-semibold">Phone Number</label>
                <p className="w-full border border-gray-400 rounded-md p-3 bg-gray-100">
                  1234567890
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;