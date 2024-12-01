import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';
import Navbar from '../Components/Navbar';

const ViewScheduleUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [trains, setTrains] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const user = location.state?.user;

  useEffect(() => {
    if (!location.state) return;
    const fetchTrains = async () => {
      const response = await fetch('http://localhost:8080/api/train/trains', {
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

    axios.get('http://localhost:8080/api/schedule/schedules')
      .then(response => {
        if (Array.isArray(response.data)) {
          setSchedules(response.data);
        } else {
          console.error('Unexpected response data:', response.data);
        }
      })
      .catch(error => console.error('Error fetching schedule data:', error));
  }, [location.state]);

  const handleSelectTrain = (train) => {
    if (!location.state) return;
    navigate('/confirmBooking', { state: { ...location.state, train, user } });
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://seatreservation.railway.gov.lk/mtktwebslr/gallery/gallery-3.jpg')",
        }}
      >
        <div className="mt-8 bg-white bg-opacity-90 shadow-lg rounded-lg p-8 w-full max-w-4xl">
          <h2 className="text-2xl font-semibold text-center text-blue-800">
            Train Schedule
          </h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Train Number</TableCell>
                  <TableCell>Train Name</TableCell>
                  <TableCell>Departure</TableCell>
                  <TableCell>Arrival</TableCell>
                  <TableCell>Departure Time</TableCell>
                  <TableCell>Arrival Time</TableCell>
                  <TableCell>Scheduled Date</TableCell>
                  <TableCell>Booked Seats</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedules.map((schedule) => {
                  const train = trains.find(train => train.number === schedule.train_no);
                  return (
                    <TableRow key={schedule.schedule_id} onClick={() => handleSelectTrain(train)}>
                      <TableCell>{train?.number}</TableCell>
                      <TableCell>{train?.name}</TableCell>
                      <TableCell>{train?.departure}</TableCell>
                      <TableCell>{train?.arrival}</TableCell>
                      <TableCell>{train?.departureTime}</TableCell>
                      <TableCell>{train?.arrivalTime}</TableCell>
                      <TableCell>{schedule.scheduled_date}</TableCell>
                      <TableCell>{schedule.no_of_booked_seats}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary">
                          Select
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default ViewScheduleUser;
