import { createContext, useContext, useEffect, useState } from "react";
import { useFetchMe, useLogout } from "@/queries/auth.queries";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const { data, isLoading, isError } = useFetchMe();
    const { mutateAsync: logoutMutation } = useLogout();

    useEffect(() => {
        if (data) {
            setUser(data);
        } else if (isError) {
            setUser(null);
        }
    }, [data, isError]);

    const isAuthenticated = !!user;
    const isAdmin = user?.role === "admin";

    const login = (userData) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            await logoutMutation();
        } finally {
            setUser(null);
        }
    };
    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isAdmin,
                loading: isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
