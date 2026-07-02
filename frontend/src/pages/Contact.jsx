import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/inquiries", {
                name,
                email,
                phone,
                message,
            });

            setSuccess(true);
            setLoading(true);

            setName("");
            setEmail("");
            setPhone("");
            setMessage("");

        } catch (error) {
            console.log(error);
            alert("Failed to send inquiry");
            setLoading(false);
        }
    };
    return (
        <>
            <Navbar />

            <div className="container py-5">

                <div className="text-center mb-5 max-w-700 mx-auto">
                    <h1 className="fw-bold mb-3" style={{ fontSize: "44px", letterSpacing: "-1.5px" }}>Contact Us</h1>
                    <p className="lead text-muted" style={{ fontSize: "18px", lineHeight: "1.6" }}>
                        Have questions or interested in a listing? We'd love to assist you.
                    </p>
                </div>

                <div className="row justify-content-center">

                    <div className="col-md-8 col-lg-6">

                        <div className="card border-0 p-4 p-md-5" style={{ boxShadow: "0 15px 45px rgba(0,0,0,0.06)", borderRadius: "12px", border: "1px solid rgba(226, 232, 240, 0.8)" }}>

                            {
                                success && (
                                    <div className="alert alert-success mb-4">
                                        Inquiry sent successfully!
                                    </div>
                                )
                            }

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-dark-custom" style={{ fontSize: "14px" }}>
                                        Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control py-2.5 px-3"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        style={{ borderRadius: "6px", fontSize: "14px" }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-dark-custom" style={{ fontSize: "14px" }}>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control py-2.5 px-3"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{ borderRadius: "6px", fontSize: "14px" }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-dark-custom" style={{ fontSize: "14px" }}>
                                        Phone
                                    </label>

                                    <input
                                        type="tel"
                                        className="form-control py-2.5 px-3"
                                        placeholder="Enter your phone number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        style={{ borderRadius: "6px", fontSize: "14px" }}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-semibold text-dark-custom" style={{ fontSize: "14px" }}>
                                        Message
                                    </label>

                                    <textarea
                                        className="form-control p-3"
                                        rows="5"
                                        placeholder="Write your message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        style={{ borderRadius: "6px", fontSize: "14px" }}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-luxury-dark w-100 py-3"
                                    style={{ borderRadius: "6px" }}
                                >
                                    {
                                        loading
                                            ? "Sending..."
                                            : "Send Inquiry"
                                    }
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />
        </>
    );
}

export default Contact;