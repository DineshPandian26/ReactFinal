import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHotel } from "../context/HotelContext";

export default function Navbar() {
  const count = useSelector(state => state.bookings.items.length);
  const { user } = useHotel();

  const navClass = ({ isActive }) => isActive ? "nav-link active" : "nav-link";

  return (
    <header className="site-header">
      <nav className="navbar">
        <Link to="/" className="brand" aria-label="StayEase home">
          StayEase<span>.</span>
        </Link>
        <div className="navlinks">
          <NavLink end to="/" className={navClass}>Home</NavLink>
          <NavLink to="/about" className={navClass}>About</NavLink>
          <NavLink to="/rooms" className={navClass}>Rooms</NavLink>
          <NavLink to="/services" className={navClass}>Services</NavLink>
          <NavLink to="/bookings" className={navClass}>Bookings ({count})</NavLink>
          <NavLink to="/contact" className={navClass}>Contact</NavLink>
          <NavLink to="/staff" className={navClass}>Staff Demo</NavLink>
        </div>
        <span className="welcome">Hello, {user}</span>
      </nav>
    </header>
  );
}
