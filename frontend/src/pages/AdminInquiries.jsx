import { useEffect, useState } from "react";
import API from "../services/api";
import { getBackendUrl } from "../utils/config";

function AdminInquiries() {

    const [inquiries, setInquiries] = useState([]);

    // Fetch inquiries
    const fetchInquiries = async () => {
        try {
            const res = await API.get("/inquiries");
            setInquiries(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    return (
        <div className="container py-5">

            <h1 className="fw-bold mb-4">
                Customer Inquiries
            </h1>

            <div className="table-responsive">

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Message</th>
                            <th>Inquired Property</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {inquiries.length > 0 ? (
                            inquiries.map((item) => {
                                const prop = item.property?.property_id;
                                return (
                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.message}</td>
                                        <td>
                                            {prop ? (
                                                <div className="d-flex align-items-center gap-2">
                                                    <img 
                                                        src={prop.image ? getBackendUrl(prop.image) : "https://via.placeholder.com/80"} 
                                                        alt={prop.title || item.property?.title}
                                                        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }}
                                                    />
                                                    <div>
                                                        <div className="fw-bold">{prop.title}</div>
                                                        <div className="text-muted" style={{ fontSize: "12px" }}>
                                                            {prop.location} | ₹{typeof prop.price === "number" ? prop.price.toLocaleString("en-IN") : prop.price}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-muted">{item.property?.title || "N/A"}</span>
                                            )}
                                        </td>
                                        <td>
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No inquiries found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default AdminInquiries;