"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthContextType, User, AuthProviderProps } from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verificar se há usuário logado no localStorage ao carregar
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedLoginStatus = localStorage.getItem("isLoggedIn");

    if (savedUser && savedLoginStatus === "true") {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, type: "register" }),
      });
      if (!res.ok) return false;
      return true;
    } catch (error) {
      console.error("Erro no registro:", error);
      return false;
    }
  };

  const login = async (email: string, password: string, router?: any): Promise<boolean> => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, type: "login" }),
      });
      if (!res.ok) return false;
      const userData = await res.json();
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");
      if (router) {
        router.push("/");
      } else {
        window.location.href = "/";
      }
      return true;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
  };

  const value: AuthContextType = {
    user,
    isLoggedIn,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}; 