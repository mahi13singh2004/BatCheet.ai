import { useAuthStore } from "../store/auth.store.js"
import { Link, useNavigate } from "react-router-dom"
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
    <nav className="h-20 w-full  backdrop-blur-md border-b border-white/10 flex justify-between items-center fixed top-0 left-0 right-0 z-50 px-10">
      <h1 onClick={()=>navigate("/")} className="text-3xl cursor-pointer bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">Title</h1>
      <button className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white font-semibold px-4 py-2 transition-all hover:from-gray-700 hover:via-gray-800 hover:to-black hover:cursor-pointer rounded-full " onClick={handleButton}>
        {user ? "Logout" : "Login"}
      </button>
    </nav>
  );
};
export default Navbar;