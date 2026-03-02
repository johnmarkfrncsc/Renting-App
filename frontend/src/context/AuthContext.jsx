import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token) {
      const parsed = storedUser ? JSON.parse(storedUser) : { token };
      setUser(parsed.token ? parsed : { token });
    }

    setAuthLoading(false);
  }, []);

  const login = (token, userObj) => {
    localStorage.setItem("token", token);
    if (userObj) localStorage.setItem("user", JSON.stringify(userObj));
    setUser(userObj ? { ...userObj, token } : { token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
