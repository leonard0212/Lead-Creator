import React, { useState } from "react";
import OCRScanner from "./OCRScanner";
import Form from "./Form";
import QRScanner from "./QRScanner";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [formData, setFormData] = useState({});

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {screen === "home" && (
        <div className="space-y-6 w-full max-w-xs">
          <button className="btn" onClick={() => setScreen("qr")}>📷 Scan QR</button>
          <button className="btn" onClick={() => setScreen("ocr")}>📇 Scan Business Card (OCR)</button>
          <button className="btn" onClick={() => setScreen("form")}>✏️ Manual Entry</button>
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
    </div>
  );
}
