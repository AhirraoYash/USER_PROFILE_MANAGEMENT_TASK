# 🚀 User Profile Management System

A full-stack **MERN** application (MongoDB, Express, React, Node.js) that handles User Authentication, Profile Management, and Image Uploads with a modern, responsive UI built using **Tailwind CSS**.

---

## 🔗 Live Demo
**Frontend:**  https://user-profile-management-task-frontend.onrender.com/
**Backend:** https://user-profile-management-task.onrender.com

---

## ✨ Features

- **🔐 Authentication:** Secure Login & Registration using **JWT (JSON Web Tokens)**.
- **🛡️ Protected Routes:** Prevents unauthorized access to the Profile Dashboard.
- **👤 Profile Management:** View and update user details (Name, Phone).
- **📸 Image Upload:** Upload and update profile pictures (stored locally using Multer).
- **🎨 Modern UI:** Fully responsive design using **Tailwind CSS** with glass-morphism effects.
- **⚡ Toast Notifications:** Real-time success/error feedback.

---

## 🛠️ Tech Stack

### **Frontend**
- **React.js** (Hooks, Context API)
- **Tailwind CSS** (Styling)
- **Axios** (API Requests)
- **React Router DOM** (Navigation)
- **React Toastify** (Notifications)

### **Backend**
- **Node.js & Express.js** (Server)
- **MongoDB & Mongoose** (Database)
- **JWT** (Authentication)
- **Bcrypt.js** (Password Hashing)
- **Multer** (File Uploads)

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/User_profile_management_task.git](https://github.com/YOUR_USERNAME/User_profile_management_task.git)

cd User_profile_management_task

2. Backend SetupNavigate to the backend folder and install dependencies.Bashcd backend
npm install
Create a .env file in the backend folder:Code snippetPORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/user_profile_db
JWT_SECRET=your_super_secret_key_123
Start the Server:Bashnpm start
Server runs on: http://localhost:50003.

 Frontend SetupOpen a new terminal, navigate to the frontend folder, and install dependencies.Bashcd frontend
npm install
Create a .env file in the frontend folder:Code snippet# Local Development
REACT_APP_API_URL=http://localhost:5000/api


App runs on: http://localhost:3000

 Project StructureBashUser_profile_management_task
├── backend/            # Express Server
│   ├── models/         # Database Schemas
│   ├── routes/         # API Endpoints
│   ├── controllers/    # Logic for routes
│   └── uploads/        # Image storage folder
└── frontend/           # React Application
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── context/    # Global Auth State
    │   ├── pages/      # Login, Register, Profile
    │   └── services/   # Axios API setup

Deployment Guide (Render)
Backend (Web Service)
Create a Web Service on Render.

Connect your repo and set Root Directory to backend.

Build Command: npm install.

Start Command: node server.js.

Environment Variables: Add MONGO_URI (Cloud DB) and JWT_SECRET.


Frontend (Static Site)
Create a Static Site on Render.

Connect your repo and set Root Directory to frontend.

Build Command: npm install && npm run build.

Publish Directory: build.

Environment Variables: Add REACT_APP_API_URL pointing to your deployed backend URL.

Redirects: Add a rewrite rule: Source /* -> Destination /index.html.

API Endpoints

Method,Endpoint,Description
POST,/api/auth/register,Register a new user
POST,/api/auth/login,Login user & get Token
GET,/api/user/profile,Get logged-in user info (Protected)
PUT,/api/user/profile,Update user details (Protected)
POST,/api/user/upload-avatar,Upload profile picture (Protected)