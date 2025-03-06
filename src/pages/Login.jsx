import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Login() {
    let { provider } = useParams();
    console.log("provider: ", provider);
    provider = "google";
    useEffect(() => {
            console.log("sending user to login with google");
            setTimeout(() => {
            window.location.href = `/oauth2/authorization/${provider}`;
            }, 300);
            // Redirect user to backend OAuth login page
    }, []);

    return <h2>Redirecting to login... </h2>;
}

export default Login;
