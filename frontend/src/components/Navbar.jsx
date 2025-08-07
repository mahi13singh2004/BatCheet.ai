import { useAuthStore } from "../store/auth.store.js";
import { useNavigationStore } from "../store/navigation.store.js";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const { startLoading } = useNavigationStore();

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
    setMenuOpen(false);
  };

  const handleProfileClick = () => {
    startLoading();
    setMenuOpen(false);
  };

  const handleUploadClick = () => {
    startLoading();
    setMenuOpen(false);
  };

  return (
    <nav
      className="
        fixed top-0 left-0 right-0 z-50 h-20
        flex justify-between items-center
        px-4 sm:px-6 md:px-10
        bg-white/20 dark:bg-white/10
        backdrop-blur-[30px] 
        border border-white/20 dark:border-white/10
        shadow-lg shadow-white/10 dark:shadow-black/20
        rounded-b-xl
      "
      aria-label="Primary Navigation"
    >
      {/* Logo Section */}
      <div
        className="flex items-center cursor-pointer select-none"
        onClick={handleLogoClick}
      >
        <img className="w-14 h-14 md:w-16 md:h-16" src={logo} alt="Logo" />
        <h1
          className="
            ml-2 text-2xl sm:text-3xl lg:text-5xl
            bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500
            bg-clip-text text-transparent font-bold select-text
          "
        >
          B
          <span className="text-lg sm:text-2xl lg:text-4xl">atcheet</span>
          <span className="text-base sm:text-xl lg:text-3xl">.ai</span>
        </h1>
      </div>

      {/* Hamburger button for mobile */}
      <button
        className="sm:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-white/30 dark:hover:bg-white/20 transition"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        type="button"
      >
        <span
          className={`block h-1 w-6 rounded-full bg-cyan-400 transition-all duration-300 ${
            menuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-1 w-6 rounded-full bg-cyan-400 my-1 transition-all duration-300 ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-1 w-6 rounded-full bg-cyan-400 transition-all duration-300 ${
            menuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Nav Links & Actions */}
      <div
        className={`flex-col sm:flex-row sm:static fixed sm:flex right-0 top-20 bg-white/30 dark:bg-white/20 backdrop-blur-[30px] sm:bg-transparent
          items-center transition-all
          gap-3 sm:gap-6
          px-6 py-5 sm:p-0 rounded-b-xl shadow-lg sm:shadow-none
          ${menuOpen ? "flex" : "hidden"}
          sm:flex
        `}
        style={{
          minWidth: menuOpen ? "65vw" : "",
          maxWidth: "90vw",
          boxShadow: menuOpen ? "0 12px 40px rgb(0 0 0 / 0.12)" : undefined,
        }}
      >
        {user && (
          <Link
            to="/profile"
            onClick={handleProfileClick}
            className="
              block w-full sm:w-auto
              px-5 py-2 rounded-lg font-semibold
              bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500
              text-white shadow-md
              hover:brightness-110 transition text-center
              select-none
            "
          >
            My Documents
          </Link>
        )}

        <Link to="/upload" onClick={handleUploadClick} className="block w-full sm:w-auto">
          <button
            className="
              w-full px-5 py-2 rounded-lg font-semibold
              bg-cyan-500 text-white
              hover:bg-cyan-600 transition shadow-md
              select-none
            "
          >
            Upload Now
          </button>
        </Link>

        <button
          className="
            w-full sm:w-auto px-5 py-2 rounded-lg font-semibold
            bg-red-500 text-white
            hover:bg-red-600 transition mt-2 sm:mt-0 shadow-md
            select-none
          "
          onClick={handleButton}
          type="button"
        >
          {user ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
