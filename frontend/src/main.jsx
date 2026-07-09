import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { FavoriteProvider } from "./context/FavoriteContext";

createRoot(document.getElementById("root")).render(

  <StrictMode>

    <BrowserRouter>

      <AuthProvider>

        <FavoriteProvider>

          <App />

        </FavoriteProvider>

      </AuthProvider>

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