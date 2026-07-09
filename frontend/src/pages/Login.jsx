import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import GoogleLoginButton from "../components/GoogleLoginButton";


function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();


    const [formData, setFormData] = useState({
        email: "",
        password: "",
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


        try {

            setLoading(true);


            const response = await loginUser(formData);


            login(
                response.user,
                response.token
            );


            alert("Login Successfully");


            navigate("/");


        } catch (error) {


            alert(
                error.response?.data?.message ||
                "Login Failed"
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
                                Login
                            </h2>



                            <form onSubmit={handleSubmit}>


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

                                    className="form-control mb-4"

                                    value={formData.password}

                                    onChange={handleChange}

                                />



                                <button

                                    className="btn btn-dark w-100"

                                    disabled={loading}

                                >

                                    {
                                        loading
                                            ?
                                            "Logging in..."
                                            :
                                            "Login"
                                    }


                                </button>


                            </form>



                            <hr />

                           

                            <GoogleLoginButton />



                            <p className="text-center">

                                Don't have account?


                                <Link

                                    to="/signup"

                                    className="ms-2 fw-bold"

                                >

                                    Signup

                                </Link>


                            </p>


                        </div>


                    </div>


                </div>


            </div>


        </div>

    );

}


export default Login;