import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import bgImage from '../assets/home.png';
import axios from 'axios';
function JoinRoom() {
    const [roomname, SetRoomname] = useState('');
    const [roomid, SetRoomid] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const req = await axios.post('http://localhost:5000/room/join',
                {
                    roomname,
                    roomid

                },
                {
                    withCredentials: true,
                }
            );

            if (req.data.success) {
                navigate('/home')
            }
            else {
                alert(req.data.message);
            }
        }
        catch (err) {
            alert(err.response.data.message);

        }
    }
    return (
        <div
            //   className="min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="min-h-screen flex justify-center items-center">
                <div className="bg-white p-8 rounded-xl shadow-xl w-96">
                    <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
                        Code Collab
                    </h1>

                    <form className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >


                        <input
                            type="text"
                            id="roomname"
                            name="roomname"
                            placeholder="Room Name"
                            required
                            className="w-full h-10 px-3 border-2 border-amber-800 rounded-md text-lg text-black"
                            onChange={
                                (event) => SetRoomname(event.target.value)}

                        />
                        <input
                            type="text"
                            id="roomid"
                            name="roomid"
                            placeholder="Room ID"
                            required
                            className="w-full h-10 px-3 border-2 border-amber-800 rounded-md text-lg text-black "
                            onChange={(event) => SetRoomid(event.target.value)}
                        />
                        <div className="flex justify-between gap-4 mt-2">


                            <button
                                type="submit"
                                className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                            >
                                Join Room
                            </button>
                        </div>
                    </form>
                    <div className="flex justify-center mt-2">Dont have Room ID?
                        <Link className=" text-blue-500 ml-1" to='/create'>Create a Room</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JoinRoom
