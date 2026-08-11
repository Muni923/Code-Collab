import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { socket } from "../Connections/socket";
import Editor from "@monaco-editor/react";

function Home() {
  const navigate = useNavigate();
  const { roomid, roomname, username } = useParams();

  const [code, setCode] = useState("");
  const [members, setMembers] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!roomid) return;

    const getMembers = async () => {
      try {
        const res = await axios.get(
          `https://code-collab-cafi.onrender.com/room/${roomid}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          setMembers(res.data.members);
        }
      } catch (error) {
        console.log("Error in getting members:", error);
      }
    };

    getMembers();
  }, [roomid]);

  useEffect(() => {
    if (!roomid) return;

    const handleConnect = () => {
      socket.emit("join-room", {
        roomid,
      });
    };

    socket.on("connect", handleConnect);

    if (socket.connected) {
      handleConnect();
    } else {
      socket.connect();
    }

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [roomid]);

  useEffect(() => {
    const handleCodeUpdate = (newCode) => {
      setCode(newCode);
    };

    socket.on("code-update", handleCodeUpdate);

    return () => {
      socket.off("code-update", handleCodeUpdate);
    };
  }, []);

  useEffect(() => {
    const handleRoomUsers = (users) => {
      setMembers(users);
    };

    socket.on("room-users", handleRoomUsers);

    return () => {
      socket.off("room-users", handleRoomUsers);
    };
  }, []);

  const handleCodeChange = (value) => {
    const newCode = value || "";

    setCode(newCode);

    socket.emit("code-change", {
      roomid,
      code: newCode,
    });
  };

  const copyRoomId = async () => {
    await navigator.clipboard.writeText(roomid);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const leaveRoom = async () => {
    try {
      const res = await axios.post(
        "https://code-collab-cafi.onrender.com/room/leave",
        { roomid },
        {
          withCredentials: true,
        }
      );

      if (!res.data.success) {
        alert(res.data.message);
        return;
      }

      socket.emit("leave-room", roomid);
      socket.disconnect();

      navigate("/join");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Error leaving room"
      );
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#070b18] text-white">


      <header className="h-[82px] shrink-0 border-b border-white/10 bg-[#0a1020] flex items-center justify-between px-4 sm:px-7 gap-3">

        <h1 className="text-xl sm:text-2xl font-bold">
          Code
          <span className="text-violet-400">
            Collab
          </span>
        </h1>

        <button
          onClick={copyRoomId}
          className="px-3 sm:px-5 py-2 sm:py-3 rounded-lg bg-violet-600 hover:bg-violet-700 font-medium text-sm sm:text-base transition"
        >
          {copied ? "Copied!" : "Copy Room ID"}
        </button>

      </header>

      <div className="flex flex-1 min-h-0 flex-col md:flex-row">

        <span
          className="
            w-full
            md:w-[330px]
            h-[42vh]
            md:h-full
            bg-[#091121]
            border-b
            md:border-b-0
            md:border-r
            border-white/10
            flex
            flex-col
            shrink-0
          "
        >

          <div className="p-4 sm:p-6 border-b border-white/10 shrink-0">

            <h2 className="text-lg font-semibold">
              Connected Users
            </h2>

          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6">

            {members.length === 0 ? (

              <div className="h-full flex items-center justify-center text-center">

                <p className="text-gray-400 font-medium">
                  No users connected
                </p>

              </div>

            ) : (

              <div className="space-y-3">

                {members.map((member, index) => {

                  const name =
                    member.username || "User";

                  const firstLetter =
                    name.charAt(0).toUpperCase();

                  return (

                    <div
                      key={member._id || index}
                      className="
                        flex
                        items-center
                        gap-3
                        p-3
                        rounded-xl
                        bg-gray-800
                        hover:bg-gray-700
                        transition
                      "
                    >

                      <div className="relative shrink-0">

                        <div
                          className="
                            w-10
                            h-10
                            sm:w-11
                            sm:h-11
                            rounded-full
                            bg-green-500
                            flex
                            items-center
                            justify-center
                            text-white
                            font-semibold
                            text-lg
                          "
                        >
                          {firstLetter}
                        </div>

                        <span
                          className="
                            absolute
                            bottom-0
                            right-0
                            w-3
                            h-3
                            bg-green-500
                            border-2
                            border-gray-800
                            rounded-full
                          "
                        />

                      </div>

                      <div className="flex-1 min-w-0">

                        <p className="font-medium truncate">
                          {name}
                        </p>

                        <p className="text-xs text-green-400">
                          Online
                        </p>

                      </div>

                    </div>

                  );
                })}

              </div>

            )}

          </div>

          <div className="p-4 sm:p-5 border-t border-white/10 shrink-0">

            <button
              onClick={leaveRoom}
              className="
                w-full
                py-3
                rounded-xl
                bg-red-500
                hover:bg-red-600
                font-semibold
                transition
              "
            >
              Leave Room
            </button>

          </div>

        </span>

        <main className="flex-1 min-w-0 min-h-0 flex flex-col bg-[#070b18]">

          <div
            className="
              px-4
              sm:px-8
              py-4
              sm:py-5
              border-b
              border-white/10
              bg-[#0b1222]
              shrink-0
            "
          >

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">

              <div className="min-w-0">

                <p className="text-xs uppercase tracking-widest text-violet-400 font-semibold mb-1">
                  Room Name
                </p>

                <h2 className="text-xl sm:text-2xl font-bold truncate max-w-[150px] sm:max-w-none">
                  {roomname}
                </h2>

              </div>

              <div className="hidden sm:block h-12 w-px bg-white/10" />

              <div className="min-w-0">

                <p className="text-xs text-violet-400 font-semibold mb-1">
                  ROOM ID
                </p>

                <div
                  className="
                    max-w-[200px]
                    sm:max-w-none
                    truncate
                    px-2
                    py-2
                    rounded-lg
                    bg-[#101a30]
                    border
                    border-white/10
                    text-blue-300
                    font-mono
                    text-xs
                    sm:text-sm
                  "
                >
                  {roomid}
                </div>

              </div>

            </div>

          </div>

          <div className="flex-1 min-h-0 p-2 sm:p-5">

            <div
              className="
                h-full
                min-h-0
                rounded-2xl
                overflow-hidden
                border
                border-violet-500/20
                bg-[#111827]
                shadow-2xl
                shadow-black/30
                flex
                flex-col
              "
            >

              <div
                className="
                  h-11
                  sm:h-12
                  shrink-0
                  bg-[#172033]
                  border-b
                  border-white/10
                  flex
                  items-center
                  px-4
                  sm:px-5
                "
              >

                <div className="flex items-center gap-3">

                  <span className="font-medium text-gray-200 text-sm sm:text-base">
                    Code Editor
                  </span>

                  <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />

                </div>

                <div className="ml-auto text-green-400 text-xs sm:text-sm">
                  ● Live
                </div>

              </div>

              <div className="flex-1 min-h-0 relative">

                <Editor height="500px"
                  theme="vs-dark"

                  options={{
                    automaticLayout: true,
                    autoClosingBrackets: "always",
                    autoClosingQuotes: "always",
                    autoClosingOvertype: "always",
                    minimap: { enabled: false },
                  }}

                  value={code}
                  onChange={handleCodeChange}

                />

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Home;