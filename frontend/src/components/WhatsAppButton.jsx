import { useState, useRef } from "react";

function WhatsAppButton() {
  const phoneNumber = "919999999999";
  const message = encodeURIComponent("Hi! I'm interested in your real estate services. Can you help me find my dream property?");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const [position, setPosition] = useState({ x: 24, y: 24 });
  const [activeDrag, setActiveDrag] = useState(false);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const startPosition = useRef({ x: 24, y: 24 });

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left click
    
    isDragging.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY };
    startPosition.current = { ...position };

    const handleMouseMove = (moveEvent) => {
      const dx = dragStart.current.x - moveEvent.clientX;
      const dy = dragStart.current.y - moveEvent.clientY;

      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        isDragging.current = true;
        setActiveDrag(true);
      }

      let newX = startPosition.current.x + dx;
      let newY = startPosition.current.y + dy;

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
    dragStart.current = { x: touch.clientX, y: touch.clientY };
    startPosition.current = { ...position };

    const handleTouchMove = (moveEvent) => {
      const touchMove = moveEvent.touches[0];
      const dx = dragStart.current.x - touchMove.clientX;
      const dy = dragStart.current.y - touchMove.clientY;

      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        isDragging.current = true;
        setActiveDrag(true);
      }

      let newX = startPosition.current.x + dx;
      let newY = startPosition.current.y + dy;

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
      style={{
        bottom: `${position.y}px`,
        right: `${position.x}px`,
        transition: activeDrag ? "none" : "transform 0.3s ease, box-shadow 0.3s ease",
        touchAction: "none",
        userSelect: "none"
      }}
    >
      <i className="bi bi-whatsapp" style={{ pointerEvents: "none" }}></i>
      <span className="whatsapp-tooltip" style={{ pointerEvents: "none" }}>Chat with us!</span>
    </a>
  );
}

export default WhatsAppButton;
