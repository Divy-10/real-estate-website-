import { useEffect, useState } from "react";
import axios from "axios";
import { getBackendUrl } from "../utils/config";

function BackendWakeUp({ children }) {
  const [isReady, setIsReady] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const backendUrl = getBackendUrl("");
    let isMounted = true;
    let timer;

    // Show the loader only if the backend takes longer than 800ms to respond
    timer = setTimeout(() => {
      if (isMounted && !isReady) {
        setShowLoader(true);
      }
    }, 800);

    const pingBackend = async () => {
      try {
        // Send a request directly to the root of the backend
        await axios.get(backendUrl, { timeout: 15000 });
        if (isMounted) {
          setIsReady(true);
          clearTimeout(timer);
        }
      } catch (err) {
        console.warn("Backend ping failed, retrying...", err);
        // Keep retrying every 3 seconds if failed
        if (isMounted) {
          setTimeout(pingBackend, 3000);
        }
      }
    };

    pingBackend();

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [isReady]);

  if (!isReady && showLoader) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 9999,
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <div
          className="text-center p-5 rounded-4 shadow-lg"
          style={{
            maxWidth: "500px",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(15px)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
          }}
        >
          {/* Animated Spinner */}
          <div className="mb-4">
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ width: "4rem", height: "4rem", borderWidth: "0.3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>

          <h3 className="fw-bold mb-3 text-dark" style={{ letterSpacing: "-0.5px" }}>
            Connecting to Server...
          </h3>

          <p className="text-secondary mb-4" style={{ fontSize: "15px", lineHeight: "1.6" }}>
            Our backend server runs on a free tier and is currently waking up. 
            This process is automatic and takes about 30 to 50 seconds. 
            Thank you for your patience!
          </p>

          <div className="d-flex justify-content-center gap-1">
            <span className="badge rounded-pill bg-primary px-3 py-2">
              Waking up backend...
            </span>
          </div>
        </div>
      </div>
    );
  }

  // If ready, or if it loaded so quickly we didn't need to show the loader, render the child pages
  return children;
}

export default BackendWakeUp;
