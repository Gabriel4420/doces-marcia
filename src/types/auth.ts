export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface AuthContextType {
  user: Omit<User, 'password'> | null;
  isLoggedIn: boolean;
  login: (email: string, password: string, router?: any) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
} 