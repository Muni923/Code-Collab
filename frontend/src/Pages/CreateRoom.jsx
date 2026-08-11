import React, { useState } from "react";
import bgImage from "../assets/home.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CreateRoom() {
    const [roomname, setRoomname] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (loading) return;

        setLoading(true);

        try {
            const res = await axios.post(
                "https://code-collab-editor.onrender.com/room/create",
                {
                    roomname
                },
                {
                    withCredentials: true
                }
            );

            console.log("CREATE RESPONSE:", res.data);

            if (res.data.success) {
                navigate(
                    `/home/${res.data.roomid}/${roomname}/${res.data.username}`
                );
            } else {
                alert(res.data.message);
            }

        } catch (err) {
            console.log("CREATE ERROR:", err);

            alert(
                err.response?.data?.message ||
                "Something went wrong"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" flex justify-center items-center bg-gray-100 min-h-screen w-full bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${bgImage})`
            }}
        >

            <div className="bg-white p-8 rounded-xl shadow-xl w-96">

                <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
                    Create Room
                </h1>

                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        id="roomname"
                        placeholder="Room Name"
                        name="roomname"
                        required
                        value={roomname}
                        onChange={(e) =>
                            setRoomname(e.target.value)
                        }
                        className="w-full h-10 px-3 border-2 border-amber-800 rounded-md text-lg text-black"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create Room"}
                    </button>

                </form>

                <div className="flex justify-center mt-2">
                    Want to join existing room?

                    <Link
                        className="text-blue-500 ml-1"
                        to="/join"
                    >
                        Join Room
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default CreateRoom;

