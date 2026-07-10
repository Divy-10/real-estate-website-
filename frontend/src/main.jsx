import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { FavoriteProvider } from "./context/FavoriteContext";

// Read Google Client ID from environment variable or default to a placeholder
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID_PLACEHOLDER.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(

  <StrictMode>

    <BrowserRouter>

      <GoogleOAuthProvider clientId={googleClientId}>

        <AuthProvider>

          <FavoriteProvider>

            <App />

          </FavoriteProvider>

        </AuthProvider>

      </GoogleOAuthProvider>

    </BrowserRouter>

  </StrictMode>

);

// Register service worker for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("Service Worker registered successfully:", reg.scope))
      .catch((err) => console.error("Service Worker registration failed:", err));
  });
}