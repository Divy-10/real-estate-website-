import { BrowserRouter, Routes, Route } from "react-router-dom"

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
import AdminLayout from "./layout/AdminLayout";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatBot from "./components/ChatBot/ChatBot";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/properties" element={<Properties />} />

        <Route path="/property/:id" element={<PropertyDetails />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/chatbot" element={<ChatBot />} />

        <Route
          path="/admin"
          element={

            <ProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>


          }
        />

        <Route
          path="/admin/properties"
          element={

            <ProtectedRoute>
              <AdminLayout>
                <AdminProperties />
              </AdminLayout>
            </ProtectedRoute>

          }
        />

        <Route
          path="/admin/add-property"
          element={

            <ProtectedRoute>
              <AdminLayout>
                <AddProperty />
              </AdminLayout>
            </ProtectedRoute>


          }
        />

        <Route
          path="/admin/properties/edit/:id"
          element={

            <ProtectedRoute>
              <AdminLayout>
                <EditProperty />
              </AdminLayout>
            </ProtectedRoute>



          }
        />

        <Route
          path="/admin/inquiries"
          element={

            <ProtectedRoute>
              <AdminLayout>
                <AdminInquiries />
              </AdminLayout>
            </ProtectedRoute>

          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;