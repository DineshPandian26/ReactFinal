import React, { useReducer, useRef } from "react";
import { Link } from "react-router-dom";
import { useHotel } from "../context/HotelContext";

const featuredRooms = [
  { id: 1, name: "Standard Room", price: 1800, type: "Standard", capacity: 2, description: "Simple, peaceful and comfortable." },
  { id: 2, name: "Deluxe Room", price: 2500, type: "Deluxe", capacity: 2, description: "A little more space for a relaxing stay." },
  { id: 3, name: "Luxury Suite", price: 5000, type: "Suite", capacity: 4, description: "Extra space and premium comforts." }
];

function RoomCard({ room }) {
  return (
    <article className="room-card">
      <div className={`room-art room-art-${room.id}`} aria-hidden="true">✦</div>
      <div className="room-info">
        <span className="tag">{room.type}</span>
        <h3>{room.name}</h3>
        <p>{room.description}</p>
        <div className="room-bottom">
          <strong>₹{room.price.toLocaleString("en-IN")} <small>/ night</small></strong>
          <Link className="text-link" to={`/rooms/${room.id}`}>View details →</Link>
        </div>
      </div>
    </article>
  );
}

function GuestCounter() {
  const [guests, dispatch] = useReducer((state, action) => {
    if (action === "increase") return Math.min(state + 1, 10);
    if (action === "decrease") return Math.max(state - 1, 1);
    return state;
  }, 1);

  return (
    <div className="panel guest-counter">
      <div>
        <h3>Planning your stay?</h3>
        <p className="muted">Choose how many guests are travelling.</p>
      </div>
      <div className="counter-controls">
        <button type="button" className="secondary" onClick={() => dispatch("decrease")} aria-label="Decrease guests">−</button>
        <strong>{guests} {guests === 1 ? "guest" : "guests"}</strong>
        <button type="button" className="secondary" onClick={() => dispatch("increase")} aria-label="Increase guests">+</button>
      </div>
    </div>
  );
}

export default function Home() {
  const { setUser } = useHotel();
  const nameRef = useRef(null);

  function saveName(event) {
    event.preventDefault();
    const name = nameRef.current?.value.trim();
    if (name) {
      setUser(name);
      nameRef.current.value = "";
    }
  }

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">WELCOME TO STAYEASE</p>
          <h1>Stay somewhere<br />you love.</h1>
          <p>Discover comfortable rooms, thoughtful service and a stay worth remembering.</p>
          <Link className="btn" to="/rooms">Explore Rooms</Link>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR NEXT GETAWAY</p>
            <h2>Find your perfect stay</h2>
            <p className="muted">Comfortable rooms for every kind of traveller.</p>
          </div>
          <Link to="/rooms" className="text-link">View all rooms →</Link>
        </div>
        <div className="grid">
          {featuredRooms.map(room => <RoomCard key={room.id} room={room} />)}
        </div>

        <div className="home-tools">
          <GuestCounter />
          <div className="panel">
            <h3>Personalise your visit</h3>
            <p className="muted">Enter your name to update the welcome message in the navigation bar.</p>
            <form className="inline-form" onSubmit={saveName}>
              <input ref={nameRef} aria-label="Your name" placeholder="Enter your name" required minLength="2" />
              <button className="btn" type="submit">Save Name</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
