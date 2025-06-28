export interface User {
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string, router?: any) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
} 