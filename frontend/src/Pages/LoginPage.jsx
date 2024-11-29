import React, { useState } from "react";
import logo from "/src/assets/railsl-logo.png";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Username:", username);
        console.log("Password:", password);
    };

    return (
        <>
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
                        <button type="submit" className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-700">Login</button>
                        <div className="text-center text-sm">
                            <span>Don't have an account?</span>
                        </div>
                        <button type="submit" className="p-2 text-white bg-blue-700 rounded-full hover:bg-blue-500">Signup</button>
                    </form>
                </div>
                <p className="absolute bottom-0 w-full text-center text-xs text-white p-2">&copy; 2024 RT Solutions. All rights reserved.</p>
            </div>
        </>
    );
};

export default LoginPage;
