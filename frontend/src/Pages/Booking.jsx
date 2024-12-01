import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from "@mui/material";
import axios from "axios";
import Navbar from "/src/components/Navbar";

const Booking = () => {
    const [bookings, setBookings] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [users, setUsers] = useState([]);
    const [trainFilter, setTrainFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    const username = localStorage.getItem('username');
    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        // Fetch booking data from the server
        axios.get('/api/bookings')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setBookings(response.data);
                } else {
                    console.error('Unexpected response data:', response.data);
                }
            })
            .catch(error => console.error('Error fetching booking data:', error));

        // Fetch schedule data from the server
        axios.get('/api/schedules')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setSchedules(response.data);
                } else {
                    console.error('Unexpected response data:', response.data);
                }
            })
            .catch(error => console.error('Error fetching schedule data:', error));

        // Fetch user data from the server
        axios.get('/api/users')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setUsers(response.data);
                } else {
                    console.error('Unexpected response data:', response.data);
                }
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    const filteredBookings = bookings.filter(booking => {
        const schedule = schedules.find(schedule => schedule.schedule_id === booking.schedule_id);
        return (
            (!trainFilter || schedule?.train_no.includes(trainFilter)) &&
            (!dateFilter || new Date(schedule?.scheduled_date).toDateString() === new Date(dateFilter).toDateString())
        );
    });

    return (
        <div>
            <Navbar/>
            <h1>Booking - Admin {username}</h1>
            <TextField
                label="Filter by Train Number"
                variant="outlined"
                value={trainFilter}
                onChange={(e) => setTrainFilter(e.target.value)}
                style={{ marginBottom: '20px', marginRight: '20px' }}
            />
            <TextField
                label="Filter by Departure Date"
                type="date"
                variant="outlined"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
                style={{ marginBottom: '20px' }}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Booking Id</TableCell>
                            <TableCell>Train Number</TableCell>
                            <TableCell>Departure Date</TableCell>
                            <TableCell>User Id</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>Seat No</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredBookings.length > 0 ? (
                            filteredBookings.map((booking) => {
                                const schedule = schedules.find(schedule => schedule.schedule_id === booking.schedule_id);
                                const user = users.find(user => user.user_id === booking.user_id);
                                return (
                                    <TableRow key={booking.booking_id}>
                                        <TableCell>{booking.booking_id}</TableCell>
                                        <TableCell>{schedule?.train_no}</TableCell>
                                        <TableCell>{schedule?.scheduled_date}</TableCell>
                                        <TableCell>{booking.user_id}</TableCell>
                                        <TableCell>{user?.name}</TableCell>
                                        <TableCell>{booking.seat_no}</TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">No Bookings Available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Booking;