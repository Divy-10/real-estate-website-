import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProperties from "./pages/AdminProperties";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";
import AdminInquiries from "./pages/AdminInquiries";
import AdminAI from "./pages/AdminAI"; // AI Admin Assistant
import AdminLayout from "./layout/AdminLayout";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatBot from "./components/ChatBot/ChatBot";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import BackendWakeUp from "./components/BackendWakeUp";

// New Pages
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Gallery from "./pages/Gallery";
import Career from "./pages/Career";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import NotFound from "./pages/NotFound";

// Utility widgets
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <BackendWakeUp>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chatbot" element={<ChatBot />} />

        {/* New SEO Pages */}
        <Route path="/services" element={<Services />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />

        <Route
          path="/admin"
          element = {
            <ProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/properties"
          element = {
            <ProtectedRoute>
              <AdminLayout>
                <AdminProperties />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-property"
          element = {
            <ProtectedRoute>
              <AdminLayout>
                <AddProperty />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/properties/edit/:id"
          element = {
            <ProtectedRoute>
              <AdminLayout>
                <EditProperty />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/inquiries"
          element = {
            <ProtectedRoute>
              <AdminLayout>
                <AdminInquiries />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* AI Admin Assistant — admin only */}
        <Route
          path="/admin/ai-assistant"
          element = {
            <ProtectedRoute>
              <AdminLayout>
                <AdminAI />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element = {
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/favorites" element={<Favorites />} />

        {/* 404 Catch All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <WhatsAppButton />
    </BackendWakeUp>
  );
}

export default App;