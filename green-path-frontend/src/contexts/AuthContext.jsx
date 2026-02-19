import { createContext, useContext, useState, useEffect } from "react";

// Create Context
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
	// Auth state
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);

	/*
        Restore token on app start
    */
	useEffect(() => {
		const storedToken = localStorage.getItem("token");

		if (storedToken) {
			setToken(storedToken);
		}

		setLoading(false);
	}, []);

	/*
        Login function
        Called after successful signin/signup
    */
	const login = (newToken) => {
		localStorage.setItem("token", "Bearer "+newToken);

		setToken(newToken);
	};

	/*
        Logout function
    */
	const logout = () => {
		localStorage.removeItem("token");

		setToken(null);
        
	};

	/*
        Derived state
    */
	const isAuthenticated = !!token;

	/*
        Context value
    */
	const value = {
		token,
		login,
		logout,
		isAuthenticated,
		loading,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/*
    Custom hook for easy use
*/
export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}

	return context;
};
