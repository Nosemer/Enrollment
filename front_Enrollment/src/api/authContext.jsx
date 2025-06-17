import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  // Load auth data from localStorage on mount
  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem("auth");
      if (storedAuth) {
        const parsed = JSON.parse(storedAuth);
        setUser(parsed.user);
        setToken(parsed.token);
        setRole(parsed.role);
      }
    } catch (error) {
      console.error("Failed to load auth from localStorage:", error);
      localStorage.removeItem("auth");
    }
  }, []);

  const login = (userData, tokenValue, roleValue) => {
    setUser(userData);
    setToken(tokenValue);
    setRole(roleValue);

    try {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: userData,
          token: tokenValue,
          role: roleValue,
        })
      );
    } catch (error) {
      console.error("Failed to save auth to localStorage:", error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the context
export const useAuth = () => useContext(AuthContext);
