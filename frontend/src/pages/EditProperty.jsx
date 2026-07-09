import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { getBackendUrl } from "../utils/config";

function EditProperty() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [units, setUnits] = useState([]);
    const [unitNumber, setUnitNumber] = useState("");
    const [unitPrice, setUnitPrice] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        location: "",
        type: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        image: "",
        propertyMap: "",
        description: "",
    });

    const fetchProperty = async () => {
        try {
            const res = await API.get(`/properties/${id}`);

            setFormData(res.data);

            setUnits(res.data.units || []);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProperty();
    }, [id]);


    const handleChange = (e) => {

        const { name, value, files } = e.target;

        if (files) {

            setFormData({
                ...formData,
                [name]: files[0],
            });

        } else {

            setFormData({
                ...formData,
                [name]: value,
            });

        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();

            data.append("title", formData.title);
            data.append("price", formData.price);
            data.append("location", formData.location);
            data.append("category", formData.category);
            data.append("bedrooms", formData.bedrooms);
            data.append("bathrooms", formData.bathrooms);
            data.append("area", formData.area);
            data.append("description", formData.description);
            data.append("image", formData.image);
            data.append("propertyMap", formData.propertyMap);
            data.append("units", JSON.stringify(units));


            if (formData.image instanceof File) {
                data.append("image", formData.image);
            }

            await API.put(`/properties/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Property Updated Successfully");
            navigate("/admin/properties");

        } catch (error) {
            console.log(error);
        }
    };

    const addUnit = () => {
        if (!unitNumber || !unitPrice) return;

        setUnits([
            ...units,
            {
                unitNumber,
                price: Number(unitPrice),
                status: "available"
            }
        ]);

        setUnitNumber("");
        setUnitPrice("");
    };

    const removeUnit = (index) => {
        const updated = [...units];
        updated.splice(index, 1);
        setUnits(updated);
    };

    return (
        <div className="container py-5">
            <h1 className="mb-4">Edit Property</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    className="form-control mb-3"
                    value={formData.title}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    className="form-control mb-3"
                    value={formData.price}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="location"
                    className="form-control mb-3"
                    value={formData.location}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category (Villa, Apartment, Farm House, Office, Plot)"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="bedrooms"
                    className="form-control mb-3"
                    value={formData.bedrooms}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="bathrooms"
                    className="form-control mb-3"
                    value={formData.bathrooms}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="area"
                    className="form-control mb-3"
                    value={formData.area}
                    onChange={handleChange}
                />

                {formData.image && typeof formData.image === "string" && (
                    <>
                        <label className="form-label">Current Property Image</label>

                        <img
                            src={getBackendUrl(formData.image)}
                            alt="Property"
                            className="img-fluid rounded mb-3"
                            style={{
                                width: "250px",
                                height: "180px",
                                objectFit: "cover"
                            }}
                        />
                    </>
                )}

                <input
                    type="file"
                    name="image"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    className="form-control mb-3"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                />

                <hr />

                <h4> Edit Units (House Numbers)</h4>

                <div className="d-flex gap-2 mb-3">
                    <input
                        type="text"
                        placeholder="Unit Number (A-101)"
                        value={unitNumber}
                        onChange={(e) => setUnitNumber(e.target.value)}
                        className="form-control"
                    />

                    <input
                        type="number"
                        placeholder="Unit Price"
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(e.target.value)}
                        className="form-control"
                    />

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={addUnit}
                    >
                        Add
                    </button>
                </div>

                <div className="mb-3">
                    {units.map((u, i) => (
                        <div
                            key={i}
                            className="d-flex justify-content-between border p-2 mb-2"
                        >
                            <span>
                                {u.unitNumber} — ₹{u.price} — {u.status}
                            </span>

                            <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() => removeUnit(i)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>

                <button className="btn btn-primary">
                    Update Property
                </button>

            </form>
        </div>
    );
}

export default EditProperty;