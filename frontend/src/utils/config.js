// Helper to get the correct API/backend host URL dynamically.
// This allows the website to connect to the backend server even when accessed from a mobile phone on the same network.
export const getBackendUrl = (path = "") => {
  // If the path is already a full external URL, return it directly
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // If a production API URL is set in environment variables, use it
  if (import.meta.env.VITE_API_URL) {
    let baseUrl = import.meta.env.VITE_API_URL;
    // Strip trailing slash if present
    if (baseUrl.endsWith("/")) {
      baseUrl = baseUrl.slice(0, -1);
    }
    // If it's an upload/static asset, and baseUrl ends with "/api", strip it
    if (path.startsWith("/uploads") && baseUrl.endsWith("/api")) {
      baseUrl = baseUrl.slice(0, -4);
    }
    return `${baseUrl}${path}`;
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
