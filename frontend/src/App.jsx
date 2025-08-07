import { Routes, Route, useLocation } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Login from "./pages/auth/Login.jsx"
import Signup from "./pages/auth/Signup.jsx"
import { useEffect } from "react";
import { useAuthStore } from "./store/auth.store.js"
import { useNavigationStore } from "./store/navigation.store.js"
import ProtectedRoute from "./components/ProtectedRoute"
import RedirectRoute from "./components/RedirectRoute"
import Navbar from "./components/Navbar"
import Upload from "./pages/Upload.jsx";
import Profile from "./pages/Profile.jsx";
import ChatPage from "./pages/ChatPage";
import Spinner from "./components/Spinner.jsx";
import TopSpinner from "./components/TopSpinner.jsx";

const App = () => {
  const { checkAuth, checkAuthLoading } = useAuthStore()
  const { isLoading, startLoading } = useNavigationStore()
  const location = useLocation();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    startLoading()
  }, [location.pathname, startLoading])

  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {checkAuthLoading && <TopSpinner />}
      {isLoading && <Spinner />}
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<RedirectRoute><Login /></RedirectRoute>} />
        <Route path="/signup" element={<RedirectRoute><Signup /></RedirectRoute>} />
        <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/chat/:id" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default App;