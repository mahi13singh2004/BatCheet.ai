import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import {useAuthStore} from "../../store/auth.store.js"
import logo from "../../assets/logo.png"
const Login = () => {
  const [form,setForm]=useState({
    email:"", 
    password:"",
  }) 

  const navigate=useNavigate()
  const {login,err,loading,clearError}=useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res=await login(form);
    if(res) navigate("/")
  };

  const handleButtonSubmit=async(e)=>{
    e.preventDefault()
    clearError()
    navigate("/signup")
  }

  return (
    <>
      <div className="w-full bg-gradient-to-r from-[#000106] via-[#282f51] to-[#000106] h-screen pt-20 flex items-center justify-center">
        <div className="w-[30%] bg-gradient-to-r from-[rgba(0,3,10,1)] via-[#1b1a1a] to-[rgba(0,3,10,1)] h-[78%] flex justify-start items-center flex-col p-2 gap-2 rounded-xl text-white">
          <div className="flex flex-col justify-center items-center text-center">
            <img src={logo} className="w-36 rounded-3xl" />
            <p className="text-lg">Chat With Your PDF's Now!</p>
          </div>
          <form
            className="flex flex-col w-full gap-2 p-5 text-white"
            onSubmit={handleSubmit}
          >
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
              className="border-2 hover:bg-[rgb(30,154,182)] hover:text-black hover:cursor-pointer w-full p-2 rounded-lg mb-3"
              disabled={loading}
              type="submit"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
          {err && <p className="text-lg text-red-600 mb-2">{err}</p>}
          <div>
            <p className="font-bold">
              Don't Have An Account? 
              <Link
                className="text-[rgb(30,154,182)]"
                to="/signup"
                onClick={handleButtonSubmit}
              >
                {" "}Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;