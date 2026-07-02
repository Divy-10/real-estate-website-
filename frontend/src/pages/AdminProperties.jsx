import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminProperties() {

    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();

    const fetchProperties = async () => {
        try {
            const response = await API.get("/properties");
            setProperties(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handelDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure want to delete this property?"
            );

        if (!confirmDelete) return;

        try {
            await API.delete(`/properties/${id}`);

            fetchProperties();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-4">
                Manage Properties
            </h1>

            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property) => (
                            <tr key={property._id}>
                                <td>{property.title}</td>

                                <td>
                                    ₹ {property.price}
                                </td>

                                <td>
                                    {property.location}
                                </td>

                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => navigate(`/admin/properties/edit/${property._id}`)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handelDelete(property._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );

}

export default AdminProperties;