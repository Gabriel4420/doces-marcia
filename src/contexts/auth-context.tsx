"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthContextType, UserPublic, AuthProviderProps } from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserPublic | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Buscar usuário autenticado ao carregar
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setIsLoggedIn(true);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          setUser(null);
          setIsLoggedIn(false);
          localStorage.removeItem("user");
        }
      } catch {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("user");
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, type: "register" }),
      });
      if (!res.ok) return false;
      // Login automático após registro
      await login(email, password);
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
      // Buscar usuário autenticado após login
      const meRes = await fetch("/api/auth/me");
      if (meRes.ok) {
        const data = await meRes.json();
        setUser(data.user);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(data.user));
        if (router) {
          router.push("/");
        } else {
          window.location.href = "/";
        }
        return true;
      } else {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("user");
        return false;
      }
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  const value: AuthContextType = {
    user,
    isLoggedIn,
    login,
    logout,
    register,
    loading,
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