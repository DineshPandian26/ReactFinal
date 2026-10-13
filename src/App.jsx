
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
  useSearchParams,
  useNavigate,
  Navigate
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import { addBooking, deleteBooking, updateBooking } from "./redux/bookingSlice";
import { HotelProvider, useHotel } from "./context/HotelContext";
import { useFetch } from "./hooks/useFetch";
import "./index.css";

const rooms = [
  { id: 1, name: "Deluxe Room", price: 2500, type: "Deluxe", capacity: 2, description: "A comfortable room with a king-size bed and modern amenities." },
  { id: 2, name: "Luxury Suite", price: 5000, type: "Suite", capacity: 4, description: "A spacious suite with a separate living area and premium facilities." },
  { id: 3, name: "Family Room", price: 3500, type: "Family", capacity: 4, description: "A relaxing room designed for families and small groups." },
  { id: 4, name: "Standard Room", price: 1800, type: "Standard", capacity: 2, description: "An affordable room with all essential comforts." }
];

function Navbar() {
  const { user } = useHotel();
  const count = useSelector(state => state.bookings.items.length);

  return (
    <nav className="navbar">
      <Link className="brand" to="/">StayEase<span>.</span></Link>
      <div className="navlinks">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/services">Services</Link>
        <Link to="/bookings">Bookings ({count})</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <span className="welcome">Hi, {user}</span>
    </nav>
  );
}

function Footer() {
  return (
    <footer>
      <h3>StayEase Hotel</h3>
      <p>Your comfort, our priority.</p>
      <p>© 2026 StayEase. All rights reserved.</p>
    </footer>
  );
}

function Layout() {
  return (
    <>
      <Navbar />
      <main className="container"><Outlet /></main>
      <Footer />
    </>
  );
}

function Home() {
  const { setUser } = useHotel();
  const nameRef = React.useRef(null);

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
        <h2>Find your perfect stay</h2>
        <p className="muted">From affordable rooms to spacious luxury suites, we have something for everyone.</p>
        <div className="grid">
          {rooms.slice(0, 3).map(room => <RoomCard key={room.id} room={room} />)}
        </div>
        <div className="panel">
          <h3>Personalise your experience</h3>
          <p>Enter your name to update the welcome message.</p>
          <form onSubmit={e => {
            e.preventDefault();
            if (nameRef.current.value.trim()) setUser(nameRef.current.value.trim());
          }}>
            <input ref={nameRef} placeholder="Enter your name" required />
            <button className="btn">Save Name</button>
          </form>
        </div>
      </section>
    </>
  );
}

function About() {
  return (
    <section className="section">
      <p className="eyebrow">OUR STORY</p>
      <h1>About StayEase</h1>
      <p className="muted">StayEase is a sample hotel management application built to make room discovery and reservation management simple.</p>
      <div className="grid">
        <article className="panel"><h3>Comfort</h3><p>Thoughtfully designed spaces for relaxing stays.</p></article>
        <article className="panel"><h3>Hospitality</h3><p>Friendly service that puts guests first.</p></article>
        <article className="panel"><h3>Convenience</h3><p>Browse rooms and manage bookings in one place.</p></article>
      </div>
    </section>
  );
}

function RoomCard({ room }) {
  return (
    <article className="room-card">
      <div className="room-art">✦</div>
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

function Rooms() {
  const [params, setParams] = useSearchParams();
  const type = params.get("type") || "All";
  const filtered = type === "All" ? rooms : rooms.filter(r => r.type === type);

  return (
    <section className="section">
      <p className="eyebrow">ACCOMMODATION</p>
      <h1>Our Rooms</h1>
      <p className="muted">Choose a room that suits your trip and budget.</p>
      <label>Filter by room type: </label>{" "}
      <select value={type} onChange={e => setParams(e.target.value === "All" ? {} : { type: e.target.value })}>
        {["All", "Standard", "Deluxe", "Suite", "Family"].map(t => <option key={t}>{t}</option>)}
      </select>
      <p className="muted">{filtered.length} room types available</p>
      <div className="grid">
        {filtered.map(room => <RoomCard key={room.id} room={room} />)}
      </div>
      {filtered.length === 0 && <p>No rooms match this filter.</p>}
    </section>
  );
}

function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = rooms.find(r => r.id === Number(id));

  if (!room) return <section className="section"><h2>Room not found</h2><Link to="/rooms">Back to rooms</Link></section>;

  return (
    <section className="section">
      <button className="secondary" onClick={() => navigate("/rooms")}>← Back to Rooms</button>
      <div className="detail-layout">
        <div className="room-art large">✦</div>
        <div>
          <span className="tag">{room.type}</span>
          <h1>{room.name}</h1>
          <p>{room.description}</p>
          <p>Maximum guests: {room.capacity}</p>
          <h2>₹{room.price.toLocaleString("en-IN")} / night</h2>
          <Link className="btn" to={`/bookings?room=${room.id}`}>Book this room</Link>
        </div>
      </div>
    </section>
  );
}

const services = [
  { id: "restaurant", name: "Restaurant", description: "Enjoy fresh meals and a range of local and international dishes." },
  { id: "spa", name: "Spa & Wellness", description: "Relax with wellness experiences designed to help you unwind." },
  { id: "room-service", name: "Room Service", description: "Request meals and everyday essentials from the comfort of your room." }
];

function Services() {
  return (
    <section className="section">
      <p className="eyebrow">MADE FOR YOU</p>
      <h1>Our Services</h1>
      <p className="muted">Explore our guest services and facilities.</p>
      <div className="grid">
        {services.map(s => (
          <article className="panel" key={s.id}>
            <div className="service-icon">✧</div>
            <h3>{s.name}</h3>
            <p>{s.description}</p>
            <Link className="text-link" to={`/services/${s.id}`}>Explore service →</Link>
          </article>
        ))}
      </div>
      <Outlet />
    </section>
  );
}

function ServiceDetails() {
  const { serviceId } = useParams();
  const service = services.find(s => s.id === serviceId);

  if (!service) return <div className="panel"><h3>Service not found</h3><Link to="/services">Back to services</Link></div>;

  return (
    <div className="panel service-detail">
      <h2>{service.name}</h2>
      <p>{service.description}</p>
      <p>Contact the reception desk for availability, timings and charges.</p>
    </div>
  );
}

function Bookings() {
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const bookings = useSelector(state => state.bookings.items);
  const [editingId, setEditingId] = React.useState(null);
  const [form, setForm] = React.useState({
    guest: "", email: "", roomId: params.get("room") || "1",
    checkIn: "", checkOut: "", guests: "1"
  });

  const selectedRoom = rooms.find(r => r.id === Number(form.roomId));
  const today = new Date().toISOString().slice(0, 10);

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    if (!selectedRoom) return;
    if (form.checkIn < today || form.checkOut <= form.checkIn) {
      alert("Choose a valid check-in date and a check-out date after check-in.");
      return;
    }
    if (Number(form.guests) > selectedRoom.capacity) {
      alert(`This room allows up to ${selectedRoom.capacity} guests.`);
      return;
    }

    const booking = {
      ...form,
      id: editingId || Date.now(),
      roomName: selectedRoom.name,
      price: selectedRoom.price
    };

    if (editingId) dispatch(updateBooking(booking));
    else dispatch(addBooking(booking));

    setEditingId(null);
    setForm({ guest: "", email: "", roomId: "1", checkIn: "", checkOut: "", guests: "1" });
  }

  function edit(b) {
    setEditingId(b.id);
    setForm({
      guest: b.guest, email: b.email, roomId: b.roomId,
      checkIn: b.checkIn, checkOut: b.checkOut, guests: b.guests
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="section">
      <p className="eyebrow">RESERVATION DESK</p>
      <h1>Manage Bookings</h1>
      <p className="muted">Create, edit and delete sample reservations.</p>

      <form className="booking-form" onSubmit={submit}>
        <h2>{editingId ? "Edit Booking" : "New Reservation"}</h2>
        <div className="form-grid">
          <label>Guest name<input name="guest" value={form.guest} onChange={change} required minLength="2" placeholder="Full name" /></label>
          <label>Email<input name="email" type="email" value={form.email} onChange={change} required placeholder="guest@example.com" /></label>
          <label>Room<select name="roomId" value={form.roomId} onChange={change}>{rooms.map(r => <option key={r.id} value={r.id}>{r.name} — ₹{r.price}/night</option>)}</select></label>
          <label>Guests<input name="guests" type="number" min="1" max={selectedRoom?.capacity || 4} value={form.guests} onChange={change} required /></label>
          <label>Check-in<input name="checkIn" type="date" min={today} value={form.checkIn} onChange={change} required /></label>
          <label>Check-out<input name="checkOut" type="date" min={form.checkIn || today} value={form.checkOut} onChange={change} required /></label>
        </div>
        {selectedRoom && <p className="muted">Selected: {selectedRoom.name} · ₹{selectedRoom.price} per night</p>}
        <button className="btn">{editingId ? "Save Changes" : "Create Booking"}</button>
        {editingId && <button type="button" className="secondary" onClick={() => { setEditingId(null); setForm({ guest: "", email: "", roomId: "1", checkIn: "", checkOut: "", guests: "1" }); }}>Cancel</button>}
      </form>

      <h2 className="list-heading">Reservations ({bookings.length})</h2>
      {bookings.length === 0 && <div className="empty">No reservations yet. Create your first booking above.</div>}
      <div className="booking-list">
        {bookings.map(b => (
          <article className="booking-card" key={b.id}>
            <div>
              <span className="tag">{b.roomName}</span>
              <h3>{b.guest}</h3>
              <p>{b.email}</p>
              <p>{b.checkIn} → {b.checkOut} · {b.guests} guest(s)</p>
            </div>
            <div className="actions">
              <button className="secondary" onClick={() => edit(b)}>Edit</button>
              <button className="danger" onClick={() => { if (confirm("Delete this booking?")) dispatch(deleteBooking(b.id)); }}>Delete</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = React.useState(false);
  return (
    <section className="section">
      <p className="eyebrow">GET IN TOUCH</p>
      <h1>Contact Us</h1>
      <div className="detail-layout">
        <div className="panel">
          <h3>StayEase Hotel</h3>
          <p>Address: 12 Garden Road, Chennai, Tamil Nadu</p>
          <p>Phone: +91 98765 43210</p>
          <p>Email: hello@stayease.example</p>
          <p className="muted">Sample contact information for this demo application.</p>
        </div>
        <form className="booking-form" onSubmit={e => { e.preventDefault(); setSent(true); }}>
          <h2>Send an Enquiry</h2>
          <label>Name<input required minLength="2" placeholder="Your name" /></label>
          <label>Email<input type="email" required placeholder="Your email" /></label>
          <label>Message<textarea required minLength="10" placeholder="How can we help?" rows="4" /></label>
          <button className="btn">Send Message</button>
          {sent && <p className="success">Your demo enquiry has been submitted.</p>}
        </form>
      </div>
    </section>
  );
}

// API integration example: fetch public user data for the staff directory.
function Staff() {
  const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/users");
  return (
    <section className="section">
      <h1>Staff Directory Demo</h1>
      <p className="muted">Example API integration using public placeholder data.</p>
      {loading && <p>Loading staff data...</p>}
      {error && <p>Could not load data. Please try again later.</p>}
      <div className="grid">
        {data.map(person => (
          <article className="panel" key={person.id}>
            <h3>{person.name}</h3><p>{person.email}</p><p>{person.address.city}</p>
          </article>
        ))}
      </div>
    </section>
  );
}


function GuestCounter() {
  const [guests, dispatch] = React.useReducer(
    (state, action) => {
      if (action === "increase") return Math.min(state + 1, 10);
      if (action === "decrease") return Math.max(state - 1, 1);
      return state;
    },
    1
  );

  return (
    <div className="panel">
      <h3>Plan Your Stay</h3>
      <p>Number of guests: <strong>{guests}</strong></p>
      <button className="secondary" onClick={() => dispatch("decrease")}>
        −
      </button>{" "}
      <button className="secondary" onClick={() => dispatch("increase")}>
        +
      </button>
      <p className="muted">Choose between 1 and 10 guests.</p>
    </div>
  );
}


function App() {
  return (
    <Provider store={store}>
      <HotelProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/rooms/:id" element={<RoomDetails />} />
              <Route path="/services" element={<Services />}>
                <Route path=":serviceId" element={<ServiceDetails />} />
              </Route>
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </HotelProvider>
    </Provider>
  );
}

export default App;
