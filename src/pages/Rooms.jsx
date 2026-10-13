import React from "react";
import { Link, useSearchParams } from "react-router-dom";

export const rooms = [
  { id: 1, name: "Standard Room", price: 1800, type: "Standard", capacity: 2, description: "An affordable room with all essential comforts." },
  { id: 2, name: "Deluxe Room", price: 2500, type: "Deluxe", capacity: 2, description: "A comfortable room with a king-size bed and modern amenities." },
  { id: 3, name: "Luxury Suite", price: 5000, type: "Suite", capacity: 4, description: "A spacious suite with a separate sitting area and premium facilities." },
  { id: 4, name: "Family Room", price: 3500, type: "Family", capacity: 4, description: "A relaxing room designed for families and small groups." }
];

function RoomCard({ room }) {
  return (
    <article className="room-card">
      <div className={`room-art room-art-${room.id}`} aria-hidden="true">✦</div>
      <div className="room-info">
        <span className="tag">{room.type}</span>
        <h3>{room.name}</h3>
        <p>{room.description}</p>
        <p className="muted">Up to {room.capacity} guests</p>
        <div className="room-bottom">
          <strong>₹{room.price.toLocaleString("en-IN")} <small>/ night</small></strong>
          <Link className="text-link" to={`/rooms/${room.id}`}>View details →</Link>
        </div>
      </div>
    </article>
  );
}

export default function Rooms() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") || "All";
  const filteredRooms = type === "All" ? rooms : rooms.filter(room => room.type === type);

  return (
    <section className="section">
      <p className="eyebrow">ACCOMMODATION</p>
      <h1>Our Rooms</h1>
      <p className="muted">Choose a room that suits your trip and budget.</p>

      <div className="filter-row">
        <label htmlFor="room-type">Filter by room type</label>
        <select id="room-type" value={type} onChange={event => {
          if (event.target.value === "All") setSearchParams({});
          else setSearchParams({ type: event.target.value });
        }}>
          {["All", "Standard", "Deluxe", "Suite", "Family"].map(option => <option key={option}>{option}</option>)}
        </select>
        <span className="muted">{filteredRooms.length} room types</span>
      </div>

      <div className="grid">
        {filteredRooms.map(room => <RoomCard key={room.id} room={room} />)}
      </div>
      {filteredRooms.length === 0 && <div className="empty">No rooms match this filter.</div>}
    </section>
  );
}
