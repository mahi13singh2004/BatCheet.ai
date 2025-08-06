# MERN Authentication System

A full-stack authentication system built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This project implements user signup, login, logout, and protected route handling using **JWT-based cookie authentication, Style it yourself**.

## 🔧 Tech Stack

### 📦 Backend (Node.js + Express)
- **Express.js**: RESTful API server
- **MongoDB + Mongoose**: NoSQL database and ORM
- **JWT (jsonwebtoken)**: Token-based authentication
- **bcrypt**: Password hashing
- **dotenv**: Environment variable management
- **cookie-parser**: Reading HTTP-only cookies
- **CORS**: Cross-origin resource sharing setup

### 💻 Frontend (React.js)
- **React.js**: Frontend framework
- **Zustand**: Lightweight global state management
- **Axios**: API calls with cookie-based auth (`withCredentials: true`)
- **React Router DOM**: Frontend routing
- **Tailwind CSS** *(optional)*: Utility-first styling framework

## 🔐 Features
- User signup and login
- Secure password hashing with bcrypt
- JWT stored in HTTP-only cookies
- Zustand-based auth state management
- Protected frontend routes
- Auth check on page load
- Auto-redirect for unauthorized users

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **npm** or **yarn**

### Installation

#### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   npm install nodemon -D
   ```
3. Create a `.env` file in the `backend` directory and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure
```
mern-auth-system/
├── backend/
│   ├── config/          # Database and other configurations
│   ├── controllers/     # Route handlers
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   ├── .env             # Environment variables (not tracked by Git)
│   └── server.js        # Entry point for backend
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # React page components
│   │   ├── store/       # Zustand store for auth state
│   │   ├── App.js       # Main app component
│   │   └── index.js     # Entry point for frontend
├── .gitignore           # Git ignore file (includes .env)
└── README.md            # Project documentation
```

## 🤝 Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.
