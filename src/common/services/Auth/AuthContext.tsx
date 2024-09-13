import React, { ReactNode } from 'react';
import { User } from './types';
import {
  getCurrentUser,
  loginUser as loginService,
  logout as logoutService,
} from './api';

type AuthContextType = {
  user: User | null;
  login: (id: string, password: string) => Promise<void>;
  logout: () => void;
  isLoginLoading: boolean;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoginLoading, setIsLoginLoading] = React.useState(false);

  React.useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }

    setIsLoading(false);
  }, []);

  const login = async (id: string, password: string) => {
    setIsLoginLoading(true);
    const user = await loginService(id, password);
    setUser(user);
    setIsLoginLoading(false);
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoginLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
