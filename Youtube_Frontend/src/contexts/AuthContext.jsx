import { createContext, useContext, useEffect, useState } from "react";

// create context
const AuthContext = createContext();

// custom hook
export const useAuth = () => useContext(AuthContext);

// provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // ==============================
    // 🔁 LOAD USER ON APP START
    // ==============================
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (storedUser && token) {
            const parsedUser = JSON.parse(storedUser);

            // ✅ attach token again (CRITICAL FIX)
            setUser({
                ...parsedUser,
                token: token
            });
        }
    }, []);

    // ==============================
    // 💾 SAVE USER ON CHANGE
    // ==============================
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    // ==============================
    // 🚪 LOGOUT
    // ==============================
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