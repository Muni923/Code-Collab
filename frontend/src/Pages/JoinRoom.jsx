import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/home.png";
import axios from "axios";

function JoinRoom() {
    const [roomname, setRoomname] = useState("");
    const [roomid, setRoomid] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (loading) return;

        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:5000/room/join",
                {
                    roomname,
                    roomid
                },
                {
                    withCredentials: true
                }
            );


            if (res.data.success) {
                navigate(
                    `/home/${roomid}/${roomname}/${res.data.username}`
                );
            } else {
                alert(res.data.message);
            }

        } catch (err) {
            console.log("JOIN ERROR:", err);

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
                    Join Room
                </h1>

                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        id="roomname"
                        name="roomname"
                        placeholder="Room Name"
                        required
                        value={roomname}
                        onChange={(event) =>
                            setRoomname(event.target.value)
                        }
                        className="w-full h-10 px-3 border-2 border-amber-800 rounded-md text-lg text-black"
                    />

                    <input
                        type="text"
                        id="roomid"
                        name="roomid"
                        placeholder="Room ID"
                        required
                        value={roomid}
                        onChange={(event) =>
                            setRoomid(event.target.value)
                        }
                        className="w-full h-10 px-3 border-2 border-amber-800 rounded-md text-lg text-black"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Joining..." : "Join Room"}
                    </button>

                </form>

                <div className="flex justify-center mt-2">
                    Don't have Room ID?

                    <Link
                        className="text-blue-500 ml-1"
                        to="/create"
                    >
                        Create a Room
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default JoinRoom;
