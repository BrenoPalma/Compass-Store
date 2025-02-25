import { useState, useEffect } from "react";
import { isAuthenticated, logout } from "../services/authService";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  return { isLoggedIn, handleLogout };
};
