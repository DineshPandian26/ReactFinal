import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBooking, updateBooking, deleteBooking } from "../redux/bookingSlice";
import { rooms } from "./Rooms";

const emptyForm = {
  guest: "",
  email: "",
  roomId: "1",
  checkIn: "",
  checkOut: "",
  guests: "1"
};

function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function Bookings() {
  const dispatch = useDispatch();
  const bookings = useSelector(state => state.bookings.items);
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(() => ({
    ...emptyForm,
    roomId: searchParams.get("room") || "1"
  }));
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const today = localDateString();
  const room = rooms.find(item => item.id === Number(form.roomId));

  function handleChange(event) {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
    setMessage("");
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!room) {
      setMessage("Please select a valid room.");
      return;
    }
    if (form.checkIn < today || form.checkOut <= form.checkIn) {
      setMessage("Choose a valid check-in date and a check-out date after check-in.");
      return;
    }
    if (Number(form.guests) > room.capacity) {
      setMessage(`This room allows up to ${room.capacity} guests.`);
      return;
    }

    const booking = {
      ...form,
      id: editingId || Date.now(),
      roomName: room.name,
      price: room.price
    };

    if (editingId) {
      dispatch(updateBooking(booking));
      setMessage("Booking updated successfully.");
    } else {
      dispatch(addBooking(booking));
      setMessage("Booking created successfully.");
    }
    resetForm();
  }

  function handleEdit(booking) {
    setEditingId(booking.id);
    setForm({
      guest: booking.guest,
      email: booking.email,
      roomId: booking.roomId,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      guests: booking.guests
    });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    if (window.confirm("Delete this booking?")) {
      dispatch(deleteBooking(id));
      if (editingId === id) resetForm();
      setMessage("Booking deleted.");
    }
  }

  return (
    <section className="section">
      <p className="eyebrow">RESERVATION DESK</p>
      <h1>Manage Bookings</h1>
      <p className="muted">Create, view, edit and delete demo reservations.</p>

      <form className="booking-form" onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit Booking" : "New Reservation"}</h2>
        <div className="form-grid">
          <label>Guest name
            <input name="guest" value={form.guest} onChange={handleChange} required minLength="2" placeholder="Full name" />
          </label>
          <label>Email address
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="guest@example.com" />
          </label>
          <label>Room
            <select name="roomId" value={form.roomId} onChange={handleChange}>
              {rooms.map(item => <option key={item.id} value={item.id}>{item.name} — ₹{item.price}/night</option>)}
            </select>
          </label>
          <label>Number of guests
            <input name="guests" type="number" min="1" max={room?.capacity || 4} value={form.guests} onChange={handleChange} required />
          </label>
          <label>Check-in
            <input name="checkIn" type="date" min={today} value={form.checkIn} onChange={handleChange} required />
          </label>
          <label>Check-out
            <input name="checkOut" type="date" min={form.checkIn || today} value={form.checkOut} onChange={handleChange} required />
          </label>
        </div>
        {room && <p className="muted">Selected: {room.name} · ₹{room.price} per night · Up to {room.capacity} guests</p>}
        <div className="button-row">
          <button className="btn" type="submit">{editingId ? "Save Changes" : "Create Booking"}</button>
          {editingId && <button className="secondary" type="button" onClick={resetForm}>Cancel</button>}
        </div>
        {message && <p className="form-message" role="status">{message}</p>}
      </form>

      <div className="section-heading list-heading">
        <h2>Reservations ({bookings.length})</h2>
      </div>
      {bookings.length === 0 && <div className="empty">No reservations yet. Create your first booking above.</div>}
      <div className="booking-list">
        {bookings.map(booking => (
          <article className="booking-card" key={booking.id}>
            <div>
              <span className="tag">{booking.roomName}</span>
              <h3>{booking.guest}</h3>
              <p>{booking.email}</p>
              <p>{booking.checkIn} → {booking.checkOut} · {booking.guests} guest(s)</p>
              <strong>₹{booking.price.toLocaleString("en-IN")} / night</strong>
            </div>
            <div className="actions">
              <button className="secondary" type="button" onClick={() => handleEdit(booking)}>Edit</button>
              <button className="danger" type="button" onClick={() => handleDelete(booking.id)}>Delete</button>
            </div>
          </article>
        ))}
      </div>
      <p className="small-note">Demo note: reservations are held in Redux memory and clear when the page is refreshed.</p>
    </section>
  );
}
