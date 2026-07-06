import { createContext, useContext, useState } from "react";
import { defaultProfile } from "../data/profileData";

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(defaultProfile);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const updateProfile = (updates) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const login = (email) => {
    setProfile((prev) => ({ ...prev, email: email || prev.email }));
    setIsAuthenticated(true);
  };

  const signup = ({ name, email }) => {
    setProfile((prev) => ({
      ...prev,
      name: name || prev.name,
      email: email || prev.email,
    }));
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <ProfileContext.Provider
      value={{ profile, updateProfile, isAuthenticated, login, signup, logout }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
