import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";
import { googleLoginUser } from "../services/authService";

function GoogleLoginButton() {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "153516910604-qvs0o8tqlddaanfur2h5iind0v6q0ar0.apps.googleusercontent.com";
    const isPlaceholder = !googleClientId || googleClientId.includes("PLACEHOLDER");

    // Handle OAuth Callback when page loads/mounts
    useEffect(() => {
        const handleCallback = async () => {
            const hash = window.location.hash;
            if (!hash) return;

            const params = new URLSearchParams(hash.substring(1));
            const idToken = params.get("id_token");
            const state = params.get("state");

            if (idToken && state === "google-login") {
                try {
                    setLoading(true);
                    // Clear hash from URL for a clean look
                    window.history.replaceState({}, document.title, window.location.pathname);

                    const googleUser = jwtDecode(idToken);

                    const result = await googleLoginUser({
                        name: googleUser.name,
                        email: googleUser.email,
                        googleId: googleUser.sub,
                        profileImage: googleUser.picture,
                        image: googleUser.picture
                    });

                    login(result.user, result.token);
                    window.location.href = "/";
                } catch (error) {
                    console.error("Google authentication failed:", error);
                    alert("Google login failed. Please try again.");
                } finally {
                    setLoading(false);
                }
            }
        };

        handleCallback();
    }, [login]);

    const oauthSignIn = () => {
        if (isPlaceholder) return;

        // Google's OAuth 2.0 endpoint for requesting an ID token
        const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

        // Generate a simple state token to prevent CSRF
        const state = "google-login";

        // Generate a random nonce for ID Token verification
        const nonce = Math.random().toString(36).substring(2);

        // Parameters to pass to OAuth 2.0 endpoint.
        const params = {
            client_id: googleClientId,
            redirect_uri: window.location.origin + "/login",
            response_type: "id_token",
            scope: "openid email profile",
            state: state,
            nonce: nonce
        };

        // Create <form> element to submit parameters to OAuth 2.0 endpoint.
        const form = document.createElement("form");
        form.setAttribute("method", "GET");
        form.setAttribute("action", oauth2Endpoint);

        // Add form parameters as hidden input values.
        for (const p in params) {
            const input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("name", p);
            input.setAttribute("value", params[p]);
            form.appendChild(input);
        }

        // Add form to page and submit it to open the OAuth 2.0 endpoint.
        document.body.appendChild(form);
        form.submit();
    };

    if (isPlaceholder) {
        return (
            <div className="alert alert-warning text-center p-2 mb-3" style={{ fontSize: "0.875rem" }}>
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Google OAuth is not configured. Add your Client ID in <code>frontend/.env</code>.
            </div>
        );
    }

    return (
        <button
            onClick={oauthSignIn}
            disabled={loading}
            className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2 mb-3 py-2 fw-medium"
        >
            <i className="bi bi-google text-danger"></i>
            {loading ? "Authenticating..." : "Continue with Google"}
        </button>
    );
}

export default GoogleLoginButton;