import React from "react";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import CreateRoom from "./Pages/CreateRoom";
import JoinRoom from "./Pages/JoinRoom";
import Home from "./Pages/Home";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Auth from "./Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/signup" replace />}
        />

        <Route
          path="/signin"
          element={<Signin />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />


        <Route
          path="/home/:roomid/:roomname/:username"
          element={
            <Auth>
              <Home />
            </Auth>
          }
        />

        <Route
          path="/create"
          element={
            <Auth>
              <CreateRoom />
            </Auth>
          }
        />

        <Route
          path="/join"
          element={
            <Auth>
              <JoinRoom />
            </Auth>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;