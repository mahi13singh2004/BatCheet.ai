import { useAuthStore } from "../store/auth.store.js";
import { useNavigationStore } from "../store/navigation.store.js";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const { startLoading } = useNavigationStore();

  // Hamburger menu toggle state
  const [menuOpen, setMenuOpen] = useState(false);

  const handleButton = async () => {
    if (user) {
      await logout();
      startLoading();
      navigate("/login");
    } else {
      startLoading();
      navigate("/login");
    }
  };

  const handleLogoClick = () => {
    startLoading();
    navigate("/");
    setMenuOpen(false); // Close menu on navigation
  };

  const handleProfileClick = () => {
    startLoading();
    setMenuOpen(false); // Close menu on navigation
  };

  const handleUploadClick = () => {
    startLoading();
    setMenuOpen(false); // Close menu on navigation
  };

  return (
    <nav className="h-20 w-full backdrop-blur-md border-b border-white/10 flex justify-between items-center fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-10 bg-white/50 dark:bg-black/50">
      
      {/* Logo Section */}
      <div
        className="flex items-center cursor-pointer select-none"
        onClick={handleLogoClick}
      >
        <img className="w-14 h-14 md:w-16 md:h-16" src={logo} alt="Logo" />
        <h1 className="ml-2 text-2xl sm:text-3xl lg:text-5xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent font-bold">
          B
          <span className="text-lg sm:text-2xl lg:text-4xl">atcheet</span>
          <span className="text-base sm:text-xl lg:text-3xl">.ai</span>
        </h1>
      </div>
      
      {/* Hamburger button for mobile */}
      <button
        className="sm:hidden flex flex-col justify-center items-center w-10 h-10 rounded hover:bg-indigo-100 transition"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Open Menu"
        type="button"
      >
        <span
          className={`block h-1 w-6 rounded bg-indigo-600 transition-all duration-300 ${
            menuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`block h-1 w-6 rounded bg-indigo-600 my-1 transition-all duration-300 ${
            menuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block h-1 w-6 rounded bg-indigo-600 transition-all duration-300 ${
            menuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>
      
      {/* Nav Links & Actions */}
      <div
        className={`flex-col sm:flex-row sm:static fixed sm:flex right-0 top-20 bg-white/95 dark:bg-black/90 backdrop-blur-md sm:bg-transparent
          items-center transition-all
          gap-2 sm:gap-4 md:gap-6
          px-6 py-4 sm:p-0 rounded-b-xl shadow-lg sm:shadow-none
          ${menuOpen ? "flex" : "hidden"}
          sm:flex
        `}
        style={{
          minWidth: menuOpen ? "66vw" : "",
          maxWidth: "90vw",
          boxShadow: menuOpen ? "0 8px 32px rgba(0,0,0,0.16)" : undefined,
        }}
      >
        {user && (
          <Link
            to="/profile"
            onClick={handleProfileClick}
            className="
              block w-full sm:w-auto
              px-4 py-2 rounded-lg font-medium
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
              text-white shadow hover:from-indigo-600 hover:to-pink-600
              transition text-center
            "
          >
            My Documents
          </Link>
        )}

        <Link to="/upload" onClick={handleUploadClick} className="block w-full sm:w-auto">
          <button className="w-full px-4 py-2 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition">
            Upload Now
          </button>
        </Link>

        <button
          className="w-full sm:w-auto px-4 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition mt-1 sm:mt-0"
          onClick={handleButton}
        >
          {user ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
