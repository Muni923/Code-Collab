import React, { useState } from 'react';
import bgImage from '../assets/home.png';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
function Signin() {
    const navigate = useNavigate();
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");

    const handleSubmit = async (event) => {

        event.preventDefault();
        try {
            const res = await axios.post("https://code-collab-cafi.onrender.com/user/signin",
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            );


            if (res.data.success) {
                navigate("/create");
            }
            else {
                alert(res.data.message)
            }


        }
        catch (err) {

            alert(res.data?.message?.err || "Login failed");
        }
    }
    return (
        <div className=" flex justify-center items-center bg-gray-100 min-h-screen w-full bg-cover bg-center bg-no-repeat"

            style={{ backgroundImage: `url(${bgImage})` }}
        >

            <div className="bg-white p-8 rounded-xl shadow-xl w-96">
                <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
                    Login
                </h1>

                <form className="flex flex-col gap-4"
                    onSubmit={handleSubmit}
                >


                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="w-full h-10 px-3 border-2 border-amber-800 rounded-md text-lg text-black"
                        onChange={
                            (event) => setemail(event.target.value)}

                    />
                    <input
                        type="text"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
                        className="w-full h-10 px-3 border-2 border-amber-800 rounded-md text-lg text-black "
                        onChange={(event) => setpassword(event.target.value)}
                    />
                    <div className="flex justify-between gap-4 mt-2">


                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="flex justify-center mt-2">Dont have an Account?
                    <Link className=" text-blue-500 ml-1" to='/signup'> Register Here</Link>
                </div>
            </div>
        </div>
      
    );
}

export default Signin;