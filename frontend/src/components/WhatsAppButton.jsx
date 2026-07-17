import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

function WhatsAppButton() {
  const location = useLocation();
  const phoneNumber = "919999999999";
  const message = encodeURIComponent("Hi! I'm interested in your real estate services. Can you help me find my dream property?");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  // Initialize at bottom-right of viewport
  const [position, setPosition] = useState({
    x: window.innerWidth - 80,
    y: window.innerHeight - 80,
  });
  const [activeDrag, setActiveDrag] = useState(false);
  
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  // Hide on admin routes
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  // Keep button within screen on resize
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => {
        const maxX = window.innerWidth - 65;
        const maxY = window.innerHeight - 65;
        return {
          x: Math.max(10, Math.min(prev.x, maxX)),
          y: Math.max(10, Math.min(prev.y, maxY)),
        };
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left click
    
    isDragging.current = false;
    // Calculate click offset relative to top-left of the button
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - e.clientX;
      const dy = moveEvent.clientY - e.clientY;

      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        isDragging.current = true;
        setActiveDrag(true);
      }

      let newX = moveEvent.clientX - offset.current.x;
      let newY = moveEvent.clientY - offset.current.y;

      const maxX = window.innerWidth - 65;
      const maxY = window.innerHeight - 65;
      newX = Math.max(10, Math.min(newX, maxX));
      newY = Math.max(10, Math.min(newY, maxY));

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setActiveDrag(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e) => {
    isDragging.current = false;
    const touch = e.touches[0];
    
    offset.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    };

    const handleTouchMove = (moveEvent) => {
      const touchMove = moveEvent.touches[0];
      const dx = touchMove.clientX - touch.clientX;
      const dy = touchMove.clientY - touch.clientY;

      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        isDragging.current = true;
        setActiveDrag(true);
      }

      let newX = touchMove.clientX - offset.current.x;
      let newY = touchMove.clientY - offset.current.y;

      const maxX = window.innerWidth - 65;
      const maxY = window.innerHeight - 65;
      newX = Math.max(10, Math.min(newX, maxX));
      newY = Math.max(10, Math.min(newY, maxY));

      setPosition({ x: newX, y: newY });
      
      if (isDragging.current) {
        moveEvent.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      setActiveDrag(false);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleClick = (e) => {
    if (isDragging.current) {
      e.preventDefault();
    }
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
      onDragStart={(e) => e.preventDefault()}
      draggable="false"
      style={{
        position: "fixed",
        top: `${position.y}px`,
        left: `${position.x}px`,
        bottom: "auto",
        right: "auto",
        transition: activeDrag ? "none" : "transform 0.3s ease, box-shadow 0.3s ease",
        touchAction: "none",
        userSelect: "none",
      }}
    >
      <i className="bi bi-whatsapp" style={{ pointerEvents: "none" }}></i>
      <span className="whatsapp-tooltip" style={{ pointerEvents: "none" }}>Chat with us!</span>
    </a>
  );
}

export default WhatsAppButton;
