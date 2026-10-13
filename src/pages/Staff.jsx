import React from "react";
import { useFetch } from "../hooks/useFetch";

export default function Staff() {
  const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/users");

  return (
    <section className="section">
      <p className="eyebrow">API INTEGRATION DEMO</p>
      <h1>Staff Directory</h1>
      <p className="muted">This page fetches public placeholder data to demonstrate API integration and a custom hook. These are not real hotel employees.</p>
      {loading && <div className="empty">Loading directory...</div>}
      {error && <div className="empty error-text">{error}. Check your internet connection and refresh.</div>}
      {!loading && !error && (
        <div className="grid">
          {data.map(person => (
            <article className="panel" key={person.id}>
              <div className="avatar">{person.name.charAt(0)}</div>
              <h3>{person.name}</h3>
              <p>{person.email}</p>
              <p className="muted">{person.address.city}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
