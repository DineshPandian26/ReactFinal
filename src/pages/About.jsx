import React from "react";

export default function About() {
  return (
    <section className="section">
      <p className="eyebrow">OUR STORY</p>
      <h1>About StayEase</h1>
      <p className="intro-text">
        StayEase is a sample hotel brand created for this React training project.
        Our goal is to make room discovery and reservation management simple.
      </p>
      <div className="grid">
        <article className="panel"><div className="service-icon">✧</div><h3>Our Mission</h3><p>Provide guests with a comfortable, safe and enjoyable stay.</p></article>
        <article className="panel"><div className="service-icon">⌂</div><h3>Our Vision</h3><p>Become a trusted choice for families, tourists and business travellers.</p></article>
        <article className="panel"><div className="service-icon">♡</div><h3>Our Values</h3><p>Hospitality, cleanliness, honesty and guest satisfaction come first.</p></article>
      </div>
      <div className="notice"><strong>Student project:</strong> Hotel details and contact information in this application are sample content.</div>
    </section>
  );
}
