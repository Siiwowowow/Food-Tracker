import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

const BarcodeScanner = ({ onDetected }) => {
  const videoRef = useRef(null);
  const qrScanner = useRef(null);
  const [scannedCode, setScannedCode] = useState(null);
  const [useCamera, setUseCamera] = useState(true);

  useEffect(() => {
    if (useCamera && videoRef.current) {
      qrScanner.current = new QrScanner(
        videoRef.current,
        (result) => {
          setScannedCode(result);
          if (onDetected) onDetected(result);
        }
      );
      qrScanner.current.start();
    }

    return () => {
      if (qrScanner.current) {
        qrScanner.current.stop();
        qrScanner.current.destroy();
        qrScanner.current = null;
      }
    };
  }, [useCamera, onDetected]);

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      {useCamera ? (
        <video ref={videoRef} style={{ width: "100%", borderRadius: 8 }} muted />
      ) : (
        <p>Manual input disabled for simplicity</p>
      )}

      <button
        onClick={() => setUseCamera((prev) => !prev)}
        style={{
          marginTop: 10,
          padding: "6px 12px",
          borderRadius: 6,
          cursor: "pointer",
          backgroundColor: "#64748b",
          color: "white",
          border: "none",
          fontWeight: "600",
        }}
      >
        {useCamera ? "Stop Camera" : "Start Camera"}
      </button>

      {scannedCode && (
        <p style={{ marginTop: 10, fontWeight: "bold" }}>Scanned Code: {scannedCode}</p>
      )}
    </div>
  );
};

export default BarcodeScanner;
