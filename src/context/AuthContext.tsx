import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { UserType } from '@/types';
import * as authApi from '../api/auth';

interface AuthState {
  token: string | null;
  userType: UserType | null;
}

interface RegisterParams {
  email: string;
  password: string;
  userType: UserType;
  fullName?: string;
  location?: string;
  currentRole?: string;
  companyName?: string;
  website?: string;
}

interface AuthContextType {
  token: string | null;
  userType: UserType | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<UserType>;
  register: (params: RegisterParams) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function loadStoredAuth(): AuthState {
  return {
    token: localStorage.getItem('sp_token'),
    userType: localStorage.getItem('sp_user_type') as UserType | null,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(loadStoredAuth);

  const login = useCallback(async (email: string, password: string): Promise<UserType> => {
    const response = await authApi.login({ email, password });
    localStorage.setItem('sp_token', response.token);
    localStorage.setItem('sp_user_type', response.userType);
    setAuth({ token: response.token, userType: response.userType });
    return response.userType;
  }, []);

  const register = useCallback(async (params: RegisterParams): Promise<void> => {
    await authApi.register(params);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('sp_token');
    localStorage.removeItem('sp_user_type');
    setAuth({ token: null, userType: null });
  }, []);

  return (
    <AuthContext.Provider value={{
      token: auth.token,
      userType: auth.userType,
      isAuthenticated: !!auth.token,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
