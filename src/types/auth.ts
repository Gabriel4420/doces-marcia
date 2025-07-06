export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface UserPublic {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: UserPublic | null;
  isLoggedIn: boolean;
  login: (email: string, password: string, router?: any) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  loading: boolean;
}

export interface AuthProviderProps {
  children: React.ReactNode;
} 