import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../assets/home.png";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const res = await axios.post(
        "https://code-collab-cafi.onrender.com/user/signup",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (!res.data.success) {
        alert(res.data.message);
        return;
      }

      console.log("Signup successful");

      navigate("/create", { replace: true });

    } catch (err) {
      console.log(
        "Signup error:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
        "Something went wrong during signup"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center bg-gray-100 min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div>
        <h1>SignUp</h1>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
            autoComplete="username"
            className="w-full h-10 px-3 border-2 border-amber-800 rounded-md text-lg text-black"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            autoComplete="email"
            className="w-full h-10 px-3 border-2 border-amber-800 rounded-md text-lg text-black"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            autoComplete="new-password"
            className="w-full h-10 px-3 border-2 border-amber-800 rounded-md text-lg text-black"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "SignUp"}
          </button>
        </form>

        <div className="flex justify-center mt-2">
          Already have an Account?
          <Link
            className="text-blue-500 ml-1"
            to="/signin"
          >
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;