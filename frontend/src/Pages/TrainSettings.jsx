import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from "@mui/material";
import axios from "axios";
import Navbar from '/src/Components/Navbar';

const TrainSettings = () => {
    const [trains, setTrains] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        // Fetch train data from the server
        axios.get('/api/trains')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setTrains(response.data);
                } else {
                    console.error('Unexpected response data:', response.data);
                }
            })
            .catch(error => console.error('Error fetching train data:', error));
    }, []);

    const handleUpdate = (train) => {
        // Handle update logic here
    };

    const handleDelete = (trainId) => {
        // Handle delete logic here
        axios.delete(`/api/trains/${trainId}`)
            .then(() => setTrains(trains.filter(train => train.train_no !== trainId)))
            .catch(error => console.error('Error deleting train:', error));
    };

    const filteredTrains = trains.filter(train => 
        train.train_line.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <Navbar/>
            <TextField
                label="Filter by Train Line"
                variant="outlined"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Train No</TableCell>
                            <TableCell>Train Name</TableCell>
                            <TableCell>Arrival</TableCell>
                            <TableCell>Departure</TableCell>
                            <TableCell>Available Seats</TableCell>
                            <TableCell>Available Days</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTrains.length > 0 ? (
                            filteredTrains.map((train) => (
                                <TableRow key={train.train_no}>
                                    <TableCell>{train.train_no}</TableCell>
                                    <TableCell>{train.train_name}</TableCell>
                                    <TableCell>{train.arrival}</TableCell>
                                    <TableCell>{train.departure}</TableCell>
                                    <TableCell>{train.available_seats}</TableCell>
                                    <TableCell>{train.available_days}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleUpdate(train)}>Update</Button>
                                        <Button onClick={() => handleDelete(train.train_no)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">No Trains Available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TrainSettings;