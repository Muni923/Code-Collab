import React,{useState} from 'react'
import bgImage from '../assets/home.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function CreateRoom() {
  const [roomname,SetRoomname] =useState('')
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const req = await axios.post('http://localhost:5000/room/create',
        {
          roomname

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
      console.log(err);
      alert(err.response.data.message ||"some error");

    }

  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100"
      style={{ backgroundImage: `url(${bgImage})` }}>
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
            placeholder="Room Name"
            name="roomname"
            required
            className="w-full h-10 px-3 border-2 border-amber-800 rounded-md text-lg text-black"
          onChange={(e) => SetRoomname(e.target.value)} 
          />

          <div className="flex justify-between gap-4 mt-2">


            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Create Room
            </button>
          </div>
        </form>

        <div className="flex justify-center mt-2">Want to join existing room?
          <Link className=" text-blue-500 ml-1" to='/join'>Join Room</Link>
        </div>
      </div>
    </div>
  );
}

export default CreateRoom
