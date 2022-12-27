import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SpotifyContext } from "./context/SpotifyContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SpotifyContext>
      <App />
    </SpotifyContext>
  </React.StrictMode>
);
