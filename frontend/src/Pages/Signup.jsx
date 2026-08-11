import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../assets/home.png";

function Signup() {
  const navigate = useNavigate();

  const [username, Setusename] = useState("");
  const [email, Setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const req = await axios.post(
        "https://code-collab-editor.onrender.com/user/signup",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (req.data.success) {
        navigate("/create");
      } else {
        alert(req.data.message);
      }
    } catch (err) {
      console.log("Signup error:", err);

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
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          SignUp
        </h1>

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
            className="w-full h-10 px-3 border-2 border-amber-800 rounded-md text-lg text-black"
            onChange={(e) => Setusename(e.target.value)}
          />

          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            required
            className="w-full h-10 px-3 border-2 border-amber-800 rounded-md text-lg text-black"
            onChange={(e) => Setemail(e.target.value)}
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            required
            className="w-full h-10 px-3 border-2 border-amber-800 rounded-md text-lg text-black"
            onChange={(e) => setpassword(e.target.value)}
          />

          <div className="flex justify-between gap-4 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Signing Up..." : "SignUp"}
            </button>
          </div>
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

