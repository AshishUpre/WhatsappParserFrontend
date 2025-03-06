import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const AuthCallback = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("reached /callback successfully");

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/me`, { withCredentials: true })
            .then((res) => {
                console.log("Authenticated user:", res.data);
                localStorage.setItem("user", JSON.stringify(res.data)); // Store user data
                navigate("/dashboard"); // Redirect to dashboard
            })
            .catch((err) => {
                console.error("============= Authentication failed:", err);
                setError("Authentication failed. Redirecting to login...");
                // setTimeout(() => navigate("/login"), 3000); // Redirect after 3 sec
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
            {loading && (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" size="lg" />
                    <h4 className="mt-3 text-primary">Authenticating...</h4>
                </div>
            )}
            {error && (
                <div className="alert alert-danger text-center w-50">
                    <h5>{error}</h5>
                    <p>You will be redirected shortly...</p>
                </div>
            )}
        </div>
    );
};

export default AuthCallback;
