import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import GoogleLoginButton from "../components/GoogleLoginButton";

function Signup() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.name.trim()) {
            return alert("Please enter your name");
        }

        if (!formData.email.trim()) {
            return alert("Please enter your email");
        }

        if (formData.password.length < 6) {
            return alert("Password must be at least 6 characters");
        }

        if (formData.password !== formData.confirmPassword) {
            return alert("Passwords do not match");
        }

        try {

            setLoading(true);

            const response = await signupUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            login(response.user, response.token);

            alert("Account Created Successfully");

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Signup Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-lg-5">

                    <div className="card shadow-lg border-0 rounded-4">

                        <div className="card-body p-5">

                            <h2 className="text-center fw-bold mb-4">
                                Create Account
                            </h2>

                            <form onSubmit={handleSubmit}>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    className="form-control mb-3"
                                    value={formData.name}
                                    onChange={handleChange}
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className="form-control mb-3"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="form-control mb-3"
                                    value={formData.password}
                                    onChange={handleChange}
                                />

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    className="form-control mb-4"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />

                                <button
                                    className="btn btn-dark w-100"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Creating Account..."
                                        : "Create Account"}
                                </button>

                            </form>

                            <hr className="my-4" />

                            <GoogleLoginButton />

                            <p className="text-center mb-0">

                                Already have an account?

                                <Link
                                    to="/login"
                                    className="ms-2 text-decoration-none fw-bold"
                                >
                                    Login
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Signup;