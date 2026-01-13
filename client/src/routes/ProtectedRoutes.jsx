import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const AuthenticatedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return null;

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
export const AdminRoute = () => {
    const { isAdmin, loading } = useAuth();

    if (loading) return null;

    return isAdmin ? <Outlet /> : <Navigate to="/home" />;
};
export const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return null;

    return isAuthenticated ? <Navigate to="/home" /> : children;
};