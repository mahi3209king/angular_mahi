import React, { createContext, useContext, useMemo, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  ageGroup: string;
  bio?: string;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState(() => localStorage.getItem("jivo_token"));
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("jivo_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (nextToken: string, nextUser: User) => {
    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem("jivo_token", nextToken);
    localStorage.setItem("jivo_user", JSON.stringify(nextUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("jivo_token");
    localStorage.removeItem("jivo_user");
  };

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
