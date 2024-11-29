import React, { useState } from 'react';

function SignUpUser() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        username: '',
        password: '',
        nic: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        const phoneRegex = /^[0-9]{10}$/;
        const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&])[A-Za-z\d!@#$%^&]{8,}$/;
        const nicRegex = /^[0-9]{9}[vVxX]|[0-9]{12}$/;

        if (!formData.fullName.trim() || !nameRegex.test(formData.fullName)) {
            newErrors.fullName = "Please enter a valid full name.";
        }

        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.phoneNumber.trim() || !phoneRegex.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Please enter a valid phone number (10 digits).";
        }

        if (!formData.username.trim() || !usernameRegex.test(formData.username)) {
            newErrors.username = "Please enter a valid username (at least 3 characters).";
        }

        if (!passwordRegex.test(formData.password)) {
            newErrors.password = "Password must include uppercase, lowercase, a number, and a special character.";
        }

        if (!formData.nic.trim() || !nicRegex.test(formData.nic)) {
            newErrors.nic = "Please enter a valid NIC (9 digits with V/X or 12 digits).";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form data submitted:", formData);
        }
    };

    return (
      <div style={{ backgroundImage: "url('https://seatreservation.railway.gov.lk/mtktwebslr/gallery/gallery-3.jpg')" }}>
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md" >
            <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your full name"
                    />
                    {errors.fullName && <div className="text-red-500 text-sm mt-1">{errors.fullName}</div>}
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your email"
                    />
                    {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                </div>

                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your phone number"
                    />
                    {errors.phoneNumber && <div className="text-red-500 text-sm mt-1">{errors.phoneNumber}</div>}
                </div>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your username"
                    />
                    {errors.username && <div className="text-red-500 text-sm mt-1">{errors.username}</div>}
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Create a strong password"
                    />
                    {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                </div>

                <div className="mb-4">
                    <label htmlFor="nic" className="block text-sm font-medium text-gray-700">NIC</label>
                    <input
                        type="text"
                        id="nic"
                        name="nic"
                        value={formData.nic}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your NIC"
                    />
                    {errors.nic && <div className="text-red-500 text-sm mt-1">{errors.nic}</div>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Signup
                </button>
            </form>
        </div>
      </div>
    );
}

export default SignUpUser;
