import React from 'react'
import Navbar from '../Components/Navbar'

const ViewScheduleUser = () => {
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

        <div className="mt-8 bg-white bg-opacity-90 shadow-lg rounded-lg p-8 w-full max-w-md">
          <form className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-center text-blue-800">
              Train Schedule
            </h2>
            <table className="w-full border border-gray-400 rounded-md p-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <thead>
              <tr>
                <th>Train Number</th>
                <th>Train Name</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th></th>
              </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </form>
        </div>
        </div>      
    </div>
  )
}

export default ViewScheduleUser
