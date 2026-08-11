import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Auth({ children }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(
                    "https://code-collab-cafi.onrender.com/user/auth",
                    {
                        withCredentials: true,
                    }
                );

                setAuthenticated(res.data.success);
            } catch (error) {
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!authenticated) {
        return <Navigate to="/signup" replace />;
    }

    return children;
}

export default Auth;