import React, { useState } from "react";

export default function Form({ initialData, onBack }) {
  const [fields, setFields] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    company: initialData.company || "",
    notes: initialData.notes || "",
    location: initialData.location || "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = e => setFields({ ...fields, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    let loc = fields.location;
    if (!loc && navigator.geolocation) {
      await new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(
          pos => {
            loc = `${pos.coords.latitude},${pos.coords.longitude}`;
            setFields(f => ({ ...f, location: loc }));
            resolve();
          },
          () => resolve(),
          { timeout: 5000 }
        );
      });
    }
    const res = await fetch("https://yourdomain.com/api.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...fields, location: loc }),
    });
    const json = await res.json();
    setMsg(json.success ? "Lead saved!" : "Error saving lead.");
    setLoading(false);
  };

  return (
    <form className="space-y-4 p-4" onSubmit={handleSubmit}>
      <input name="name" value={fields.name} onChange={handleChange} placeholder="Name" className="input" />
      <input name="email" value={fields.email} onChange={handleChange} placeholder="Email" className="input" />
      <input name="phone" value={fields.phone} onChange={handleChange} placeholder="Phone" className="input" />
      <input name="company" value={fields.company} onChange={handleChange} placeholder="Company" className="input" />
      <textarea name="notes" value={fields.notes} onChange={handleChange} placeholder="Notes" className="input" />
      <input name="location" value={fields.location} onChange={handleChange} placeholder="Location (auto)" className="input" />
      <button className="btn" type="submit" disabled={loading}>{loading ? "Saving..." : "Submit"}</button>
      <button className="btn" type="button" onClick={onBack}>Back</button>
      {msg && <div>{msg}</div>}
    </form>
  );
}
