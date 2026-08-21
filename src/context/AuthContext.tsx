import { createContext, useContext, useMemo, useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';

export type UserRole = 'CUSTOMER' | 'SERVICE_PROVIDER' | 'ADMIN';
export type ProviderStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  mobileNumber?: string;
  role: UserRole;
  joinedAt: string;
  providerStatus?: ProviderStatus;
  profession?: string;
  businessName?: string;
};

type RegisterPayload = {
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
  role: UserRole;
  profession?: string;
  businessName?: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (payload: RegisterPayload) => Promise<AuthUser>;
  logout: () => void;
  fetchUsers: () => Promise<AuthUser[]>;
  updateUser: (id: string, updates: Partial<Pick<AuthUser, 'providerStatus' | 'name' | 'email' | 'mobileNumber' | 'profession' | 'businessName'>>) => Promise<AuthUser | undefined>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const API_URL = 'http://localhost:5000/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // Quick session restore if token exists (normally we'd hit /me endpoint)
    const storedUser = localStorage.getItem('quickservice_active_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const loggedInUser = response.data.user;
      localStorage.setItem('quickservice_token', response.data.token);
      localStorage.setItem('quickservice_active_user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  };

  const register = async (payload: RegisterPayload) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, payload);
      const newUser = response.data.user;
      localStorage.setItem('quickservice_token', response.data.token);
      localStorage.setItem('quickservice_active_user', JSON.stringify(newUser));
      setUser(newUser);
      return newUser;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quickservice_token');
    localStorage.removeItem('quickservice_active_user');
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch users', error);
      return [];
    }
  };

  const updateUser = async (
    id: string,
    updates: Partial<Pick<AuthUser, 'providerStatus' | 'name' | 'email' | 'mobileNumber' | 'profession' | 'businessName'>>
  ) => {
    try {
      const response = await axios.patch(`${API_URL}/users/${id}`, updates);
      if (user?.id === id) {
        setUser(response.data);
        localStorage.setItem('quickservice_active_user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error('Failed to update user', error);
      return undefined;
    }
  };

  const value = useMemo(() => ({ user, login, register, logout, fetchUsers, updateUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
