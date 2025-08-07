import { useAuthStore } from "../store/auth.store.js"
import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"
const Navbar = () => {
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()
  const handleButton = async () => {
    if (user) {
      await logout()
      navigate("/login")
    }
    else navigate("/login")
  }
  return (
    <nav className="h-20 w-full backdrop-blur-md border-b border-white/10 flex justify-between items-center fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-10">
      <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
        <img className="w-16 h-16" src={logo} alt="Logo" />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent font-bold">B<span className="text-2xl sm:text-3xl lg:text-4xl">atcheet</span><span className="text-xl sm:text-2xl lg:text-3xl">.ai</span></h1>
      </div>
      <div className="flex items-center space-x-4">
        {user && (
          <Link to="/profile" className="text-gray-700 hover:text-blue-600 font-medium">
            My Documents
          </Link>
        )}
        <button className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white font-semibold px-4 py-2 transition-all hover:from-gray-700 hover:via-gray-800 hover:to-black hover:cursor-pointer rounded-full" onClick={handleButton}>
          {user ? "Logout" : "Login"}
        </button>
        <button><Link to="/upload">Upload Now</Link></button>
      </div>
    </nav>
  );
};
export default Navbar;