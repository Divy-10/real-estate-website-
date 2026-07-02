import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {

    const [properties, setProperties] = useState([]);
    const [inquiries, setInquiries] = useState([]);

    // Fetch Properties
    const fetchProperties = async () => {
        try {
            const res = await API.get("/properties");
            setProperties(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch Inquiries
    const fetchInquiries = async () => {
        try {
            const res = await API.get("/inquiries");
            setInquiries(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProperties();
        fetchInquiries();
    }, []);

    const totalProperties = properties.length;
    const totalInquiries = inquiries.length;

    const latestProperty = properties[properties.length - 1];
    const latestInquiry = inquiries[inquiries.length - 1];

    return (
        <div className="container py-5">

            <h1 className="fw-bold mb-4">
                Admin Dashboard
            </h1>

            {/* DASHBOARD CARDS */}
            <div className="row g-4">

                {/* Total Properties */}
                <div className="col-md-3">
                    <div className="card shadow-sm p-3 text-center">
                        <h5>Total Properties</h5>
                        <h2>{totalProperties}</h2>
                    </div>
                </div>

                {/* Total Inquiries */}
                <div className="col-md-3">
                    <div className="card shadow-sm p-3 text-center">
                        <h5>Total Inquiries</h5>
                        <h2>{totalInquiries}</h2>
                    </div>
                </div>

                {/* Latest Property */}
                <div className="col-md-3">
                    <div className="card shadow-sm p-3">
                        <h5>Latest Property</h5>
                        <p className="mb-1">
                            <b>{latestProperty?.title || "No Data"}</b>
                        </p>
                        <small>
                            ₹ {latestProperty?.price || 0}
                        </small>
                    </div>
                </div>

                {/* Latest Inquiry */}
                <div className="col-md-3">
                    <div className="card shadow-sm p-3">
                        <h5>Latest Inquiry</h5>
                        <p className="mb-1">
                            <b>{latestInquiry?.name || "No Data"}</b>
                        </p>
                        <small>
                            {latestInquiry?.message?.slice(0, 30) || "No Message"}
                        </small>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;