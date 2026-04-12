import { createContext, useContext, useEffect, useState } from "react";

// create context
const AuthContext = createContext();

// custom hook
export const useAuth = () => useContext(AuthContext);

// provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // load user from localStorage on app start
    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // save user whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    // logout function (important for UI + marks)
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("username");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};