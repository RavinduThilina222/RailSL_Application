import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from "@mui/material";
import axios from "axios";
import Navbar from '/src/Components/Navbar';
import { useNavigate } from 'react-router-dom';

const TrainSettings = () => {
    const [trains, setTrains] = useState([]);
    const [filter, setFilter] = useState('');
    const navigate = useNavigate();
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
        train.Train_Line && train.Train_Line.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="p-4">
            <Navbar/>
            <h1>Train Settings - Admin {username}</h1>
            <div className="flex justify-between items-center mb-4">
                <TextField
                    label="Filter by Train Line"
                    variant="outlined"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-1/3"
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigate('/addtrain')}
                    className="bg-blue-500 text-white"
                >
                    Add Train
                </Button>
            </div>
            <TableContainer component={Paper} className="shadow-lg">
                <Table>
                    <TableHead className="bg-gray-200">
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
                                <TableRow key={train.train_no} className="hover:bg-gray-100">
                                    <TableCell>{train.train_no}</TableCell>
                                    <TableCell>{train.train_name}</TableCell>
                                    <TableCell>{train.arrival_time}</TableCell>
                                    <TableCell>{train.depature_time}</TableCell>
                                    <TableCell>{train.capacity}</TableCell>
                                    <TableCell>{train.available_days}</TableCell>
                                    <TableCell>
                                        <Button 
                                            onClick={() => handleUpdate(train)} 
                                            className="mr-2 bg-yellow-500 text-white"
                                        >
                                            Update
                                        </Button>
                                        <Button 
                                            onClick={() => handleDelete(train.train_no)} 
                                            className="bg-red-500 text-white"
                                        >
                                            Delete
                                        </Button>
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