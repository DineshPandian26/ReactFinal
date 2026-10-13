import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <section className="section">
      <p className="eyebrow">GET IN TOUCH</p>
      <h1>Contact Us</h1>
      <p className="muted">Have a question? Send our sample hotel team an enquiry.</p>
      <div className="detail-layout contact-layout">
        <div className="panel contact-info">
          <h2>StayEase Hotel</h2>
          <p><strong>Address</strong><br />12 Garden Road, Chennai, Tamil Nadu</p>
          <p><strong>Phone</strong><br />+91 98765 43210</p>
          <p><strong>Email</strong><br />hello@stayease.example</p>
          <p className="muted">These are example contact details for the training project.</p>
        </div>
        <form className="booking-form" onSubmit={handleSubmit}>
          <h2>Send an Enquiry</h2>
          <label>Your name
            <input name="name" value={form.name} onChange={handleChange} required minLength="2" placeholder="Enter your name" />
          </label>
          <label>Email address
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
          </label>
          <label>Message
            <textarea name="message" value={form.message} onChange={handleChange} required minLength="10" rows="4" placeholder="How can we help?" />
          </label>
          <button className="btn" type="submit">Send Message</button>
          {submitted && <p className="success" role="status">Your demo enquiry has been submitted.</p>}
        </form>
      </div>
    </section>
  );
}
