import { NavLink, useNavigate } from 'react-router-dom';
import logo from "/src/assets/railsl-logo.png";
import dropdown_icon from "/src/assets/dropdown_arrow.png";
import profile_pic from "/src/assets/profile_img.png";
import React, { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(true); // Adjust this to manage authentication state

  return (
    <div className="bg-blue-300 flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400 shadow-md">
      <img src={logo} alt="Train Booking Logo" className="w-24 ml-6 cursor-pointer " />
      <ul className="hidden md:flex items-center gap-8 font-medium">
        <NavLink to="/" className="relative group">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden group-hover:block" />
        </NavLink>
        <NavLink to="/about" className="relative group">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden group-hover:block" />
        </NavLink>
        <NavLink to="/contact" className="relative group">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden group-hover:block" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-12 h-12 rounded-full" src={profile_pic} alt="Profile" />
            <img className="w-2.5 mr-6" src={dropdown_icon} alt="Dropdown Icon" />
            <div className="absolute top-0 right-0 pt-12 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-white rounded shadow-lg flex flex-col gap-4 p-4">
                <p onClick={() => navigate('/myprofile')} className="hover:text-black cursor-pointer">
                  My Profile
                </p>
                <p onClick={() => navigate('/mybookings')} className="hover:text-black cursor-pointer">
                  My Bookings
                </p>
                <p onClick={() => setToken(false)} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="bg-primary text-blue px-8 py-3 rounded-full font-light hidden md:block hover:bg-primary-dark"
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;