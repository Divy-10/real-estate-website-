function WhatsAppButton() {
  const phoneNumber = "919999999999";
  const message = encodeURIComponent("Hi! I'm interested in your real estate services. Can you help me find my dream property?");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <i className="bi bi-whatsapp"></i>
      <span className="whatsapp-tooltip">Chat with us!</span>
    </a>
  );
}

export default WhatsAppButton;
