import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddProperty() {

    const navigate = useNavigate();
    const [units, setUnits] = useState([]);
    const [unitNumber, setUnitNumber] = useState("");
    const [unitPrice, setUnitPrice] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        location: "",
        category: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        image: null,
        propertyMap: null,
        description: "",
    });

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

            await API.post("/properties", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Property Added Successfully");

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

            <h1 className="mb-4">
                Add Property
            </h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    placeholder="Property Title"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    className="form-control mb-3"
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
                    placeholder="Bedrooms"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="bathrooms"
                    placeholder="Bathrooms"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="area"
                    placeholder="sqft"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <label>enter property image</label>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    placeholder="enter property image"
                    className="form-control mb-3"
                    onChange={handleChange}
                />


                <textarea
                    name="description"
                    placeholder="Description"
                    className="form-control mb-3"
                    rows="4"
                    onChange={handleChange}
                ></textarea>

                <hr />

                <h4> Property Units (House Numbers)</h4>

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

                {/* LIST */}
                <div className="mb-3">
                    {units.map((u, i) => (
                        <div
                            key={i}
                            className="d-flex justify-content-between align-items-center border p-2 mb-2"
                        >
                            <span>
                                {u.unitNumber} — ₹{u.price}
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

                <button
                    type="submit"
                    className="btn btn-dark"
                >
                    Add Property
                </button>

            </form>

        </div>
    );
}

export default AddProperty;