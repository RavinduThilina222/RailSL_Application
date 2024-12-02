import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from "@mui/material";
import axios from "axios";
import Navbar from '/src/Components/Navbar';

const TrainScheduleSettings = () => {
    const [trains, setTrains] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [filter, setFilter] = useState('');

    const username = localStorage.getItem('username');
    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        // Fetch train data from the server
        axios.get('http://localhost:8080/api/train/trains')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setTrains(response.data);
                } else {
                    console.error('Unexpected response data:', response.data);
                }
            })
            .catch(error => console.error('Error fetching train data:', error));

        // Fetch schedule data from the server
        axios.get('http://localhost:8080/api/schedule/schedules')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setSchedules(response.data);
                } else {
                    console.error('Unexpected response data:', response.data);
                }
            })
            .catch(error => console.error('Error fetching schedule data:', error));
    }, []);

    const handleAddSchedule = () => {
        // Handle add schedule logic here
        navigate('/addSchedule');

    };

    const filteredSchedules = schedules.filter(schedule => 
        schedule.scheduled_date.includes(filter)
    );

    return (
        <div>
            <Navbar/>
            <h1>Train Schedule Settings - Admin {username}</h1>
            <TextField
                label="Filter by Departure Date"
                variant="outlined"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            <Button variant="contained" color="primary" onClick={handleAddSchedule} style={{ marginBottom: '20px' }}>
                Add Schedule
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Train No</TableCell>
                            <TableCell>Train Name</TableCell>
                            <TableCell>Train Line</TableCell>
                            <TableCell>Departure Station</TableCell>
                            <TableCell>Arrival Station</TableCell>
                            <TableCell>Available Days</TableCell>
                            <TableCell>Capacity</TableCell>
                            <TableCell>Departure Time</TableCell>
                            <TableCell>Arrival Time</TableCell>
                            <TableCell>Scheduled Date</TableCell>
                            <TableCell>Booked Seats</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredSchedules.length > 0 ? (
                            filteredSchedules.map((schedule) => {
                                const train = trains.find(train => train.train_no === schedule.train_no);
                                return (
                                    <TableRow key={schedule.schedule_id}>
                                        <TableCell>{train?.train_no}</TableCell>
                                        <TableCell>{train?.train_name}</TableCell>
                                        <TableCell>{train?.train_line}</TableCell>
                                        <TableCell>{train?.departure_station}</TableCell>
                                        <TableCell>{train?.arrival_station}</TableCell>
                                        <TableCell>{train?.available_days}</TableCell>
                                        <TableCell>{train?.capacity}</TableCell>
                                        <TableCell>{train?.departure_time}</TableCell>
                                        <TableCell>{train?.arrival_time}</TableCell>
                                        <TableCell>{schedule.scheduled_date}</TableCell>
                                        <TableCell>{schedule.no_of_booked_seats}</TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={11} align="center">No Schedules Available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TrainScheduleSettings;