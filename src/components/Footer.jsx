import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <Link to="/" className="footer-brand">StayEase<span>.</span></Link>
        <p>Your comfort, our priority.</p>
      </div>
      <div>
        <p>12 Garden Road, Chennai, Tamil Nadu</p>
        <p>Phone: +91 98765 43210</p>
      </div>
      <p className="copyright">© 2026 StayEase Hotel. Demo project for React training.</p>
    </footer>
  );
}
