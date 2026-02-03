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
    const res = await fetch("api.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...fields, location: loc }),
    });
    const json = await res.json();
    setMsg(json.success ? "Lead saved!" : "Error saving lead.");
    setLoading(false);
  };

  return (
    <form className="space-y-4 w-full" onSubmit={handleSubmit}>
      <input name="name" value={fields.name} onChange={handleChange} placeholder="Nume" className="input text-lg" autoComplete="off" />
      <input name="email" value={fields.email} onChange={handleChange} placeholder="Email" className="input text-lg" autoComplete="off" />
      <input name="phone" value={fields.phone} onChange={handleChange} placeholder="Telefon" className="input text-lg" autoComplete="off" />
      <input name="company" value={fields.company} onChange={handleChange} placeholder="Companie" className="input text-lg" autoComplete="off" />
      <textarea name="notes" value={fields.notes} onChange={handleChange} placeholder="Note" className="input text-lg" rows={2} />
      <input name="location" value={fields.location} onChange={handleChange} placeholder="Locație (auto)" className="input text-lg" autoComplete="off" />
      <button className="btn text-lg py-3" type="submit" disabled={loading}>{loading ? "Se salvează..." : "Salvează"}</button>
      <button className="btn text-lg py-3 bg-gray-400 hover:bg-gray-500" type="button" onClick={onBack}>Înapoi</button>
      {msg && <div className="text-center text-green-700 font-semibold mt-2">{msg}</div>}
    </form>
  );
}
