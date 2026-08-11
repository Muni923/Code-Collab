import { io } from "socket.io-client";

export const socket = io(
  "https://code-collab-cafi.onrender.com",
  {
    withCredentials: true,
  }
);