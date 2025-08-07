import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store.js";
import logo from "../../assets/logo.png";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login, err, loading, clearError } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);
    if (res) navigate("/");
  };

  const handleButtonSubmit = async (e) => {
    e.preventDefault();
    clearError();
    navigate("/signup");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#000106] via-[#282f51] to-[#000106] flex items-center justify-center pt-12 pb-12 px-2">
      <div
        className="
          w-full
          max-w-[420px]
          md:w-[30%]
          bg-gradient-to-r from-[rgba(0,3,10,1)] via-[#1b1a1a] to-[rgba(0,3,10,1)]
          flex flex-col justify-start items-center p-4 gap-4 rounded-xl text-white shadow-xl
        "
      >
        <div className="flex flex-col justify-center items-center text-center">
          <img src={logo} alt="Logo" className="w-28 md:w-36 rounded-3xl" />
          <p className="text-base md:text-lg">Chat With Your PDF's Now!</p>
        </div>
        <form
          className="flex flex-col w-full gap-2 p-3 md:p-5 text-white"
          onSubmit={handleSubmit}
        >
          <label className="font-semibold">Email</label>
          <input
            autoComplete="off"
            type="email"
            className="border-2 w-full p-2 rounded-lg bg-transparent"
            placeholder="Enter Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <label className="font-semibold">Password</label>
          <input
            autoComplete="off"
            type="password"
            className="border-2 w-full p-2 rounded-lg mb-4 bg-transparent"
            placeholder="Enter Your Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            className="border-2 hover:bg-[rgb(30,154,182)] hover:text-black transition w-full p-2 rounded-lg mb-2"
            disabled={loading}
            type="submit"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        {err && <p className="text-base text-red-600 mb-2">{err}</p>}
        <div>
          <p className="font-bold text-center text-sm md:text-base">
            Don&apos;t Have An Account?
            <Link
              className="ml-1 text-[rgb(30,154,182)] underline"
              to="/signup"
              onClick={handleButtonSubmit}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
