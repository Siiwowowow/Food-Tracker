// TestNotification.jsx - Ei component temporary banao
import React, { useState, useEffect } from 'react';

const TestNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const checkNotifications = () => {
    fetch('https://foodtracker-server-2.onrender.com/notifications', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      console.log('API Response:', data);
      setNotifications(data);
    })
    .catch(error => console.error('Fetch Error:', error));
  };

  const addTestNotification = () => {
    fetch('https://foodtracker-server-2.onrender.com/foods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        foodTitle: "Test Food",
        foodImage: "test.jpg",
        category: "Fruits",
        quantity: "1 kg",
        expiryDate: "2024-12-31",
        description: "Test food item",
        userEmail: "test@example.com",
        addedDate: new Date().toISOString(),
        likedBy: []
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Food Added:', data);
      alert('Food added! Now check notifications');
      checkNotifications(); // Refresh notifications
    })
    .catch(error => console.error('Add Food Error:', error));
  };

  useEffect(() => {
    checkNotifications();
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid red', margin: '10px' }}>
      <h3>🔧 Notification Test Panel</h3>
      
      <button onClick={checkNotifications} style={{ margin: '5px', padding: '10px' }}>
        🔄 Check Notifications
      </button>
      
      <button onClick={addTestNotification} style={{ margin: '5px', padding: '10px', background: 'green', color: 'white' }}>
        ➕ Add Test Food
      </button>

      <div style={{ marginTop: '20px' }}>
        <h4>Current Notifications ({notifications.length}):</h4>
        {notifications.length === 0 ? (
          <p>No notifications found</p>
        ) : (
          notifications.map((notif, index) => (
            <div key={index} style={{ 
              border: '1px solid #ccc', 
              padding: '10px', 
              margin: '5px',
              background: '#f0f8ff'
            }}>
              <p><strong>Message:</strong> {notif.message}</p>
              <p><strong>Time:</strong> {new Date(notif.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TestNotification;