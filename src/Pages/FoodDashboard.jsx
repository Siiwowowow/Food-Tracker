import React from 'react';
import BarcodeScanner from './Component Card/BarcodeScanner';
import CalendarSync from './Component Card/CalendarSync';
import RecipeSuggestions from './Component Card/RecipeSuggestions';
import PWAPrompt from './Component Card/PWAPrompt';
import CSVImport from './Component Card/CSVImport';


const FoodDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gray-100 min-h-screen">
      <BarcodeScanner />
      <RecipeSuggestions />
      <CalendarSync />
      <PWAPrompt />
      <CSVImport />
    </div>
  );
};

export default FoodDashboard;
