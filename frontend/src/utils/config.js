// Helper to get the correct API/backend host URL dynamically.
// This allows the website to connect to the backend server even when accessed from a mobile phone on the same network.
export const getBackendUrl = (path = "") => {
  const hostname = typeof window !== "undefined" ? window.location.hostname : "localhost";
  // The backend server is expected to run on port 5009
  return `http://${hostname}:5009${path}`;
};
