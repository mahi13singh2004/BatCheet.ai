import { Routes, Route, useLocation } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Login from "./pages/auth/Login.jsx"
import Signup from "./pages/auth/Signup.jsx"
import { useEffect } from "react";
import { useAuthStore } from "./store/auth.store.js"
import ProtectedRoute from "./components/ProtectedRoute"
import RedirectRoute from "./components/RedirectRoute"
import Navbar from "./components/Navbar"
import Upload from "./pages/Upload.jsx";
const App = () => {
  const { checkAuth } = useAuthStore()
  const location = useLocation();
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<RedirectRoute><Login /></RedirectRoute>} />
        <Route path="/signup" element={<RedirectRoute><Signup /></RedirectRoute>} />
        <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default App;