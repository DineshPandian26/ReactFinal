import React from "react";
import { Link, Outlet } from "react-router-dom";

export const services = [
  { id: "restaurant", name: "Restaurant", description: "Enjoy fresh meals and local and international dishes.", detail: "Our sample restaurant offers breakfast, lunch and dinner options.", timings: "7:00 AM – 10:00 PM" },
  { id: "spa", name: "Spa & Wellness", description: "Relax with wellness experiences designed to help you unwind.", detail: "Explore relaxation and wellness services in this sample hotel.", timings: "9:00 AM – 8:00 PM" },
  { id: "room-service", name: "Room Service", description: "Request meals and essentials from the comfort of your room.", detail: "Guests can enquire about food and basic room requirements.", timings: "Please enquire at reception" }
];

export default function Services() {
  return (
    <section className="section">
      <p className="eyebrow">MADE FOR YOU</p>
      <h1>Our Services</h1>
      <p className="muted">Explore our guest services and facilities.</p>
      <div className="grid">
        {services.map(service => (
          <article className="panel" key={service.id}>
            <div className="service-icon">✧</div>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <Link className="text-link" to={`/services/${service.id}`}>Explore service →</Link>
          </article>
        ))}
      </div>
      <Outlet />
    </section>
  );
}
