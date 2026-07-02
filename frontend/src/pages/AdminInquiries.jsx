import { useEffect, useState } from "react";
import API from "../services/api";

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
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {inquiries.length > 0 ? (
                            inquiries.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.message}</td>
                                    <td>
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
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