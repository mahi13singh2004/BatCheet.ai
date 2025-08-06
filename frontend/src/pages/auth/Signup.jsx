import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../store/auth.store"
import logo from "../../assets/logo.png"

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const navigate = useNavigate()
  const { signup, err ,loading, clearError} = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(form);
    if (res) navigate("/")
  };    

  const handleButtonSubmit=async(e)=>{
    e.preventDefault()
    clearError()
    navigate("/login")
  }

  return (
    <>
      <div className="w-full bg-gradient-to-r from-[#000106] via-[#282f51] to-[#000106] h-screen pt-20 flex items-center justify-center">
        <div className="w-[30%] bg-gradient-to-r from-[rgba(0,3,10,1)] via-[#1b1a1a] to-[rgba(0,3,10,1)] h-[87%] flex justify-start items-center flex-col p-2 gap-1 rounded-xl text-white">
          <div className="flex flex-col justify-center text-center items-center">
            <img src={logo} className="w-36 rounded-3xl" />
            <p className="text-lg">Chat With Your PDF's Now!</p>
          </div>
          <form
            className="flex flex-col w-full gap-2 p-5 text-white"
            onSubmit={handleSubmit}
          >
            <label>Full Name</label>
            <input
              autoComplete="off"
              className="border-2 w-full p-2 rounded-lg"
              type="text"
              placeholder="Enter Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <label>Email</label>
            <input
              autoComplete="off"
              type="email"
              className="border-2 w-full p-2 rounded-lg"
              placeholder="Enter Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <label>Password</label>
            <input
              autoComplete="off"
              type="password"
              className="border-2 w-full p-2 rounded-lg mb-5"
              placeholder="Enter Your Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button
              className="border-2 hover:bg-[rgb(30,154,182)] hover:text-black hover:cursor-pointer w-full p-2 rounded-lg mb-1"
              disabled={loading}
              type="submit"
            >
              {loading ? "Loading..." : "Create Account"}
            </button>
          </form>

          {err && <p className="text-lg text-red-600 mb-2">{err}</p>}

          <div>
            <p className="font-bold">
              Already Have An Account?{" "}
              <Link  onClick={handleButtonSubmit} className="text-[rgb(30,154,182)]" to="/login">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;