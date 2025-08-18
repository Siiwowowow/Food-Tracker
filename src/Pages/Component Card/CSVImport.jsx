import React, { useState } from "react";

const CSVImport = () => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-3">📂 CSV ইমপোর্ট</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="border rounded p-2 w-full"
      />
      {fileName && <p className="mt-2 text-sm">📄 {fileName}</p>}
    </div>
  );
};

export default CSVImport;
