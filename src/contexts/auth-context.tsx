"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

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
      // Simular registro - em produção, isso seria uma chamada para API
      const newUser = { name, email };
      
      // Salvar dados do usuário no localStorage (em produção, seria no backend)
      localStorage.setItem("userData", JSON.stringify({ name, email, password }));
      
      return true;
    } catch (error) {
      console.error("Erro no registro:", error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simular verificação de login - em produção, isso seria uma chamada para API
      const userData = localStorage.getItem("userData");
      
      if (userData) {
        const savedUser = JSON.parse(userData);
        
        // Verificar se email e senha correspondem
        if (savedUser.email === email && savedUser.password === password) {
          const user = { name: savedUser.name, email: savedUser.email };
          
          setUser(user);
          setIsLoggedIn(true);
          
          // Salvar no localStorage
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("isLoggedIn", "true");
          
          return true;
        }
      }
      
      // Login padrão para teste (remover em produção)
      if (email === "teste@teste.com" && password === "123456") {
        const defaultUser = { name: "Usuário Teste", email: "teste@teste.com" };
        
        setUser(defaultUser);
        setIsLoggedIn(true);
        
        localStorage.setItem("user", JSON.stringify(defaultUser));
        localStorage.setItem("isLoggedIn", "true");
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    
    // Limpar localStorage
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