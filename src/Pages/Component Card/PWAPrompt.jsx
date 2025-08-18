import React, { useState } from "react";

const PWAPrompt = () => {
  const [installed, setInstalled] = useState(false);

  const handleInstall = () => {
    setInstalled(true);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-3">📲 অ্যাপ ইনস্টল</h2>
      {!installed ? (
        <button
          onClick={handleInstall}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
        >
          ইনস্টল করুন
        </button>
      ) : (
        <p className="text-green-600">✅ অ্যাপ ইনস্টল করা হয়েছে!</p>
      )}
    </div>
  );
};

export default PWAPrompt;
