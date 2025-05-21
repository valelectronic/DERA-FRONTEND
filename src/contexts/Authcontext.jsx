// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in when app loads
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await axios.get("/api/auth/profile", { withCredentials: true });
      console.log("User profile:", res.data);
      setUser(res.data);
    } catch (err) {
      console.error("Profile fetch error", err.response?.data || err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);


  const logout = async () => {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
