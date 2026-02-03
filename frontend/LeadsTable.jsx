import React, { useEffect, useState } from "react";

function downloadVCard(lead) {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${lead.name}`,
    `EMAIL:${lead.email}`,
    `TEL:${lead.phone}`,
    `ORG:${lead.company}`,
    `NOTE:${lead.notes}`,
    "END:VCARD"
  ].join("\n");
  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${lead.name || 'contact'}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function LeadsTable({ onBack }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("leads.php")
      .then(res => res.json())
      .then(data => {
        setLeads(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center">Se încarcă...</div>;

  return (
    <div className="w-full">
      <button className="btn mb-4" onClick={onBack}>Înapoi</button>
      <table className="w-full text-sm bg-white rounded-xl shadow overflow-hidden">
        <thead>
          <tr className="bg-blue-200">
            <th className="p-2">Nume</th>
            <th className="p-2">Email</th>
            <th className="p-2">Telefon</th>
            <th className="p-2">Companie</th>
            <th className="p-2">Note</th>
            <th className="p-2">Locație</th>
            <th className="p-2">Adaugă în agendă</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, idx) => (
            <tr key={idx} className="border-b last:border-b-0">
              <td className="p-2">{lead.name}</td>
              <td className="p-2">{lead.email}</td>
              <td className="p-2">{lead.phone}</td>
              <td className="p-2">{lead.company}</td>
              <td className="p-2">{lead.notes}</td>
              <td className="p-2">{lead.location}</td>
              <td className="p-2 text-center">
                <button className="btn py-1 px-2 text-xs" onClick={() => downloadVCard(lead)}>
                  Adaugă
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
