import React, { useState } from "react";
import OCRScanner from "./OCRScanner";
import Form from "./Form";
import QRScanner from "./QRScanner";
import LeadsTable from "./LeadsTable";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [formData, setFormData] = useState({});

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-center p-2">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
        {screen === "home" && (
          <div className="space-y-6 w-full">
            <button className="btn text-lg py-4" onClick={() => setScreen("qr")}>📷 Scan QR</button>
            <button className="btn text-lg py-4" onClick={() => setScreen("ocr")}>📇 Scan Business Card (OCR)</button>
            <button className="btn text-lg py-4" onClick={() => setScreen("form")}>✏️ Manual Entry</button>
            <button className="btn text-lg py-4 bg-green-600 hover:bg-green-700" onClick={() => setScreen("leads")}>👥 Vezi Leads</button>
          </div>
        )}
        {screen === "qr" && (
          <QRScanner
            onParsed={data => { setFormData(data); setScreen("form"); }}
            onCancel={() => setScreen("home")}
          />
        )}
        {screen === "ocr" && (
          <OCRScanner
            onParsed={data => { setFormData(data); setScreen("form"); }}
            onCancel={() => setScreen("home")}
          />
        )}
        {screen === "form" && (
          <Form
            initialData={formData}
            onBack={() => setScreen("home")}
          />
        )}
        {screen === "leads" && (
          <LeadsTable onBack={() => setScreen("home")} />
        )}
      </div>
    </div>
  );
}
