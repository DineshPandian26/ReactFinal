import React from "react";
import { Link, useParams } from "react-router-dom";
import { services } from "./Services";

export default function ServiceDetails() {
  const { serviceId } = useParams();
  const service = services.find(item => item.id === serviceId);

  if (!service) {
    return <div className="panel service-detail"><h2>Service not found</h2><Link to="/services">Back to services</Link></div>;
  }

  return (
    <div className="panel service-detail">
      <p className="eyebrow">SERVICE DETAILS</p>
      <h2>{service.name}</h2>
      <p>{service.detail}</p>
      <p><strong>Sample timings:</strong> {service.timings}</p>
      <p className="muted">Contact reception to confirm actual availability and charges.</p>
      <Link to="/services" className="text-link">← Back to Services</Link>
    </div>
  );
}
