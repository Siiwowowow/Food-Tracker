🥗 FreshTracker - Food Expiry Tracker System

🚀 Live Website: https://food-tracker-auth.web.app/add-food

🧾 Project Description

FreshTracker is a full-stack web application designed to help users track food items, monitor their expiry dates, and reduce food waste by sending timely alerts. It empowers users to add, view, update, and manage food items with complete authentication and secure data handling.

This project was built to practice modern web development using React, Node.js, MongoDB, and JWT authentication, while ensuring a clean UI and smooth UX with animation and interactivity. Additionally, it integrates advanced features like AI assistance, real-time notifications, and email alerts on login.

✨ Features

🔐 User Authentication (JWT-based)

🥫 Add, Edit, Delete food items

⏳ Live Countdown Timer until food expiry

🗒️ Add Notes to your added food items

📁 User-Specific Access Control (only the owner can modify their items)

📊 Filter and Sort food by category or status

🔔 Toasts & Alerts for feedback and confirmation

📱 Fully Responsive for mobile, tablet, and desktop

New Features:

🤖 AI System – Provides food tracking advice, storage tips, recipe suggestions, and food safety guidance using OpenAI GPT-4 API.

🔔 Notification System – Real-time notifications for expiring foods, expired items, likes, and reviews.

📧 Email Alerts – Sends an email to users automatically when they login successfully.

🛠️ Tech Stack
Frontend:

React + React Router DOM

Tailwind CSS

DaisyUI (UI Components)

React Icons

Framer Motion (Animations)

AOS (Animate on Scroll) (Scroll Animations)

React Hot Toast (Notifications)

SweetAlert2 (Confirmation Dialogs)

TanStack Query (Data fetching and caching)

Backend:

Express.js

MongoDB

JWT Authentication

Cookie-based secure sessions

Nodemailer (Send email system)

OpenAI GPT-4 API (AI system)

🧪 Functionality Walkthrough

Sign up / Login with email

Add a food item with title, category, quantity, expiry date

View all your foods on the dashboard

See expiry countdown timer live

Add private notes to your own items

Get toast/sweetalert feedback on actions

Edit or delete only your items

AI Assistance – Ask questions about food storage, recipes, nutrition

Notifications – Expiring foods, likes, and reviews

Email Alerts – Users get an email when they login

📸 Screenshots

Coming Soon – include GIFs or images of the site on desktop and mobile.

🔒 Security

All POST, PATCH, DELETE routes are protected by JWT

Users cannot manipulate items or notes they didn’t create

Secure authentication flow with token-based cookie management

🧑‍💻 Author

Rafsan Ahmed

📄 License

This project is licensed under the MIT License – feel free to use and expand it!

🌱 Built with passion to help reduce food waste, improve personal organization, and enhance productivity with AI, notifications, and email alerts.