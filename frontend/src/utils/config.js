// Helper to get the correct API/backend host URL dynamically.
// This allows the website to connect to the backend server even when accessed from a mobile phone on the same network.
export const getBackendUrl = (path = "") => {
  // If a production API URL is set in environment variables, use it
  if (import.meta.env.VITE_API_URL) {
    return `${import.meta.env.VITE_API_URL}${path}`;
  }

  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    // If running via tunnelmole, route requests to the secure backend tunnel
    if (hostname.includes("tunnelmole.net")) {
      return `https://qldvye-ip-116-72-9-181.tunnelmole.net${path}`;
    }
    // If running via localtunnel, route requests to the secure backend tunnel
    if (hostname.includes("loca.lt")) {
      return `https://fifty-poets-argue.loca.lt${path}`;
    }
    return `http://${hostname}:5009${path}`;
  }
  return `http://localhost:5009${path}`;
};
