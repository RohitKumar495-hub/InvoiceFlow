# 🚀 InvoiceFlow – Full Stack Invoice Management System

A full-stack invoicing application built using the MERN stack. This project allows users to manage items, generate invoices with real-time calculations, store them in a database, and download professional PDF invoices.

---

## 🌐 Live Demo

- 🔗 Frontend: https://invoice-flow-six-rho.vercel.app
- 🔗 Backend API: https://invoiceflow-am41.onrender.com

---

## ✨ Features

### 📦 Item Management
- Add, edit, and delete items
- Support for variants (size, color, weight)
- Stored in MongoDB

### 🧾 Invoice Generation
- Auto-generated invoice number & date
- Customer details form
- Dynamic line items (fetched from DB)

### ⚡ Real-Time Calculations
- Quantity, GST, Discount (% / ₹)
- Live row total updates
- Summary:
  - Subtotal
  - Total GST
  - Total Discount
  - Grand Total

### 💾 Data Persistence
- Save invoices to MongoDB
- Fetch and display in dashboard

### 📊 Dashboard
- View all invoices
- Search functionality (invoice, name, email)
- Dynamic data (no hardcoding)

### 📄 PDF Generation
- Download invoice as PDF
- Includes:
  - Customer details
  - Line items table
  - Calculation summary
  - Terms & conditions

---

## 🛠 Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)

---

## 📁 Project Structure

InvoiceFlow/
├── client/ # Frontend (Next.js)
├── server/ # Backend (Node + Express)


---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/invoice-flow.git
cd InvoiceFlow

2️⃣ Backend Setup
cd server
npm install

Create .env file:
MONGO_URI=your_mongodb_connection_string
PORT=5000

Run backend:
npm start

3️⃣ Frontend Setup

cd client
npm install

Create .env.local:
NEXT_PUBLIC_API_URL=http://localhost:5000/api

Run frontend:
npm run dev

🧠 Key Highlights
Full CRUD operations (Items & Invoices)
Dynamic invoice calculation engine
Reusable PDF generation utility
Global search using Context API
Clean and scalable architecture
Production-ready deployment
🎯 Assessment Submission

This project was built as part of a Full-Stack Developer assessment.

👨‍💻 Author

Rohit Kumar

📌 Notes
Backend may take a few seconds to respond initially (Render cold start)
All data is dynamically fetched from database
