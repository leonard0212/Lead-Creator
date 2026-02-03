import React, { useState } from "react";
import Tesseract from "tesseract.js";

function parseText(text) {
  const email = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] || "";
  const phone = text.match(/(\+?\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{4,}/)?.[0] || "";
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const name = lines.find(l => /^[A-Z][a-z]+(\s[A-Z][a-z]+)+$/.test(l)) || lines[0] || "";
  return { name, email, phone };
}

export default function OCRScanner({ onParsed, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImage = async (file) => {
    setLoading(true);
    setError("");
    try {
      const { data: { text } } = await Tesseract.recognize(file, "eng");
      const parsed = parseText(text);
      onParsed(parsed);
    } catch (e) {
      setError("OCR failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">Scan Business Card</h2>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={e => handleImage(e.target.files[0])}
        className="mb-4"
      />
      {loading && <div>Processing image, please wait...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <button className="btn mt-4" onClick={onCancel}>Cancel</button>
    </div>
  );
}
