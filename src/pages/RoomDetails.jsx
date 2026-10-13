import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { rooms } from "./Rooms";

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = rooms.find(item => item.id === Number(id));

  if (!room) {
    return <section className="section"><h1>Room not found</h1><Link to="/rooms">Back to rooms</Link></section>;
  }

  return (
    <section className="section">
      <button className="secondary back-button" onClick={() => navigate("/rooms")}>← Back to Rooms</button>
      <div className="detail-layout">
        <div className={`room-art large room-art-${room.id}`} aria-hidden="true">✦</div>
        <div className="detail-copy">
          <p className="eyebrow">ROOM DETAILS</p>
          <span className="tag">{room.type}</span>
          <h1>{room.name}</h1>
          <p>{room.description}</p>
          <p>Maximum guests: {room.capacity}</p>
          <h2>₹{room.price.toLocaleString("en-IN")} <small>/ night</small></h2>
          <Link className="btn" to={`/bookings?room=${room.id}`}>Book this room</Link>
        </div>
      </div>
    </section>
  );
}
