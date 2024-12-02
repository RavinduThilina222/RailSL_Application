import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/src/assets/railsl-logo.png";
import ReCAPTCHA from "react-google-recaptcha";
import api from "../services/api";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false); // State to toggle between user and admin login
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const navigate = useNavigate();

    console.log("RECAPTCHA SITE KEY:", import.meta.env.VITE_RECAPTCHA_SITE_KEY);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!recaptchaToken) {
            alert("Please complete the reCAPTCHA");
            return;
        }
        try {
            const endpoint = isAdmin ? '/admin/login' : '/user/login';
            const response = await api.post(endpoint, { username, password }); // Send plain password
            console.log("Response data:", response.data);
            
            const role = isAdmin ? 'admin' : 'user';
            const { token } = response.data;

            localStorage.setItem('userRole', role); // Store user role in localStorage
            localStorage.setItem('authToken', token); // Store auth token in localStorage
            localStorage.setItem('username', username); // Store username in localStorage
            setSessionTimeout(); // Set session timeout
            console.log("Role:", role);
            if (role === 'admin') {
                console.log("Navigating to /adminHome");
                navigate('/adminHome');
            } else if (role === 'user') {
                console.log("Navigating to /userHome");
                navigate('/home');
            }
        } catch (error) {
            console.error("Login failed:", error);
            if (error.code === 'ERR_NETWORK') {
                alert("Network error. Please check your internet connection and try again.");
            } else {
                alert("Invalid login credentials");
            }
        }
    };

    const setSessionTimeout = () => {
        setTimeout(() => {
            alert("Session expired. Please log in again.");
            localStorage.clear(); // Clear session data
            navigate('/login'); // Redirect to login page
        }, 10 * 60 * 1000); // 10 minutes
    };

    const handleRecaptchaChange = (value) => {
        console.log("Captcha value:", value);
        setRecaptchaToken(value);
    };

    return (
        <>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
            <div className="flex justify-center items-center h-screen bg-cover bg-center bg-fixed relative" style={{ backgroundImage: "url('https://seatreservation.railway.gov.lk/mtktwebslr/gallery/gallery-3.jpg')" }}>
                <div className="bg-white flex flex-col items-center justify-center border border-blue-500 rounded-2xl p-4 w-11/12 max-w-md shadow-lg hover:shadow-xl transition-shadow duration-200">
                    <img src={logo} alt="logo" width="100" height="100" />
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xs">
                        <div>
                            <label className="block text-xs text-blue-900 mb-1 ml-2">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                                className="p-2 text-sm border border-blue-500 rounded-full w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-blue-900 mb-1 ml-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                className="p-2 text-sm border border-blue-500 rounded-full w-full"
                            />
                            
                            <button type="button" className="text-blue-500 text-xs mt-1 ml-36 hover:underline">Forgot password?</button>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                                className="mr-2"
                            />
                            <label className="text-xs text-blue-900">Login as Admin</label>
                        </div>
                        <ReCAPTCHA
                            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                            onChange={handleRecaptchaChange}
                        />
                        <button type="submit" className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-700">Login</button>
                        <div className="text-center text-sm">
                            <span>Don't have an account?</span>
                        </div>
                        <button 
                            type="button" 
                            className="p-2 text-white bg-blue-700 rounded-full hover:bg-blue-500" 
                            onClick={() => navigate('/signup')}
                        >
                            Signup
                        </button>
                    </form>
                </div>
                <p className="absolute bottom-0 w-full text-center text-xs text-white p-2">&copy; 2024 RT Solutions. All rights reserved.</p>
            </div>
        </>
    );
};

export default LoginPage;