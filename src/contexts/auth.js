import { createContext, useEffect, useState } from "react";
import apiClient from "../api/httpCommon";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (token) {
            apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    }, [token]);

    const handleLogin = async (username, password) => {
        setIsLoading(true);
        try {
            const res = await apiClient.post("/v1/auth/admin/login", { username, password });
            const jwt = res.data.access_token;
            apiClient.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
            localStorage.setItem("token", jwt);
            setToken(jwt);
            navigate("/players");
            setIsLoading(false);
            setError(null);
        } catch (err) {
            setError(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/signin")
    };

    const value = {
        token,
        isLoading,
        error,
        onLogin: handleLogin,
        onLogout: handleLogout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};