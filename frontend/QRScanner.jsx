import React, { useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function QRScanner({ onParsed, onCancel }) {
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(false);
  const [qr, setQr] = useState(null);
  const qrRef = React.useRef();

  React.useEffect(() => {
    if (scanning && qrRef.current) {
      const html5Qr = new Html5Qrcode(qrRef.current.id);
      html5Qr.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        qrCodeMessage => {
          setQr(qrCodeMessage);
          html5Qr.stop();
          onParsed({ notes: qrCodeMessage });
        },
        errorMessage => setError(errorMessage)
      ).catch(err => setError("Camera error: " + err));
      return () => {
        html5Qr.stop().catch(() => {});
      };
    }
  }, [scanning, onParsed]);

  return (
    <div className="p-4">
      <h2 className="mb-4">Scan QR Code</h2>
      {!scanning && (
        <button className="btn" onClick={() => setScanning(true)}>Start Scan</button>
      )}
      {scanning && <div id="qr-reader" ref={qrRef} style={{ width: 300 }} />}
      {error && <div className="text-red-500">{error}</div>}
      <button className="btn mt-4" onClick={onCancel}>Cancel</button>
    </div>
  );
}
