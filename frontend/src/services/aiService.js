import axios from "axios";
import { getBackendUrl } from "../utils/config";

// Simulated responses for Phase 1 local testing
const getMockResponse = (message) => {
  const msg = message.toLowerCase();
  
  if (msg.includes("create") && msg.includes("property")) {
    return {
      reply: "Sure! Let's create a new property. What is the title of the property?",
      action: "ASK_DETAIL",
      data: { field: "title" }
    };
  }
  
  if (msg.includes("update") && msg.includes("price") || msg.includes("update property")) {
    return {
      reply: "Which property would you like to update? Please provide the property title or ID.",
      action: "SEARCH_PROPERTY",
      data: {}
    };
  }
  
  if (msg.includes("delete") && msg.includes("property")) {
    return {
      reply: "Please specify the title or ID of the property you wish to delete.",
      action: "CONFIRM_DELETE",
      data: {}
    };
  }
  
  if (msg.includes("stat") || msg.includes("statistics") || msg.includes("count")) {
    return {
      reply: "Here are the current dashboard statistics:\n- Total Properties: 45\n- Total Inquiries: 12\n- Active Users: 156\n- Available Units: 38",
      action: "SHOW_DASHBOARD",
      data: { stats: { properties: 45, inquiries: 12, users: 156, units: 38 } }
    };
  }
  
  if (msg.includes("inquiry") || msg.includes("inquiries")) {
    return {
      reply: "Here are the latest inquiries submitted by clients:\n1. Rajesh Sharma - Interested in luxury villa\n2. Priya Mehta - Scheduled a visit for commercial office",
      action: "SHOW_INQUIRIES",
      data: { inquiries: [{ name: "Rajesh Sharma", interest: "Luxury Villa" }, { name: "Priya Mehta", interest: "Commercial Office" }] }
    };
  }

  if (msg.includes("seo")) {
    return {
      reply: "I've generated the following SEO tags for your property:\n- **Title**: Ultra Luxury 3 BHK Villa in Surat | Royal Crest\n- **Keywords**: luxury villa, 3 BHK villa Surat, premium properties\n- **Meta Description**: Experience the ultimate luxury lifestyle in this spacious 3 BHK villa located in the prime locality of Surat.",
      action: "GENERATE_SEO",
      data: { seo: { title: "Ultra Luxury 3 BHK Villa in Surat", keywords: "luxury villa", description: "Experience the ultimate luxury lifestyle..." } }
    };
  }

  if (msg.includes("description") || msg.includes("describe")) {
    return {
      reply: "Here is a premium description generated for the property:\n'This stunning villa represents contemporary luxury at its finest. Featuring spacious bedrooms, a private pool, landscaped gardens, and a modular kitchen, this home is designed for those who appreciate the finer things in life.'",
      action: "GENERATE_DESCRIPTION",
      data: { description: "This stunning villa represents contemporary luxury at its finest..." }
    };
  }

  return {
    reply: `I received your message: "${message}". As the AI Assistant, I can help you manage properties, units, inquiries, and users. Try asking me to "Create a property" or "Show dashboard statistics"!`,
    action: "HELP",
    data: {}
  };
};

export const sendAssistantMessage = async (message, file = null, sessionId = "default-session") => {
  // If we are in local UI demo mode, or the backend endpoint is not implemented yet
  try {
    const token = localStorage.getItem("adminToken");
    
    // Setup form data for multer image upload compatibility
    const formData = new FormData();
    formData.append("message", message);
    formData.append("sessionId", sessionId);
    if (file) {
      formData.append("image", file);
    }

    const response = await axios.post(
      getBackendUrl("/api/admin/assistant"),
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return response.data;
  } catch (error) {
    console.warn("Backend assistant API not available, falling back to mock UI responses.", error);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return getMockResponse(message);
  }
};
