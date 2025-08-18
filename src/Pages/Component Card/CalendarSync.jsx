import React, { useState } from "react";

const CalendarSync = () => {
  const [synced, setSynced] = useState(false);

  const handleSync = () => {
    setSynced(true);
    setTimeout(() => setSynced(false), 2000);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-3">📅 ক্যালেন্ডার সিঙ্ক</h2>
      <button
        onClick={handleSync}
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
      >
        ক্যালেন্ডার সিঙ্ক করুন
      </button>
      {synced && <p className="text-green-600 mt-2">✅ সিঙ্ক সম্পন্ন!</p>}
    </div>
  );
};

export default CalendarSync;
