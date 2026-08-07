import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

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
  updateUser: (id: string, updates: Partial<Pick<AuthUser, 'providerStatus' | 'name' | 'profession' | 'businessName'>>) => Promise<AuthUser | undefined>;
};

const CURRENT_USER_KEY = 'quickservice_active_user';
const USER_RECORDS_KEY = 'quickservice_users';

const AuthContext = createContext<AuthContextValue | null>(null);

const MOCK_USERS: AuthUser[] = [
  {
    id: 'mock-customer',
    name: 'Customer User',
    email: 'user@quickservice.com',
    role: 'CUSTOMER',
    joinedAt: new Date().toISOString(),
  },
  {
    id: 'mock-admin',
    name: 'Admin User',
    email: 'admin@quickservice.com',
    role: 'ADMIN',
    joinedAt: new Date().toISOString(),
  },
  {
    id: 'mock-provider',
    name: 'Provider User',
    email: 'provider@quickservice.com',
    role: 'SERVICE_PROVIDER',
    joinedAt: new Date().toISOString(),
    providerStatus: 'APPROVED',
    profession: 'Home Repair',
    businessName: 'QuickFix Co.',
  },
];

function getStoredUsers() {
  if (typeof window === 'undefined') return [] as AuthUser[];
  const storedUsers = window.localStorage.getItem(USER_RECORDS_KEY);
  return storedUsers ? (JSON.parse(storedUsers) as AuthUser[]) : [];
}

function saveUsers(users: AuthUser[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(USER_RECORDS_KEY, JSON.stringify(users));
}

function getStoredActiveUser() {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(CURRENT_USER_KEY);
  return stored ? (JSON.parse(stored) as AuthUser) : null;
}

function saveActiveUser(user: AuthUser | null) {
  if (typeof window === 'undefined') return;
  if (user) {
    window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(CURRENT_USER_KEY);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredActiveUser());

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 250));

    if (!email || !password) {
      return Promise.reject(new Error('Please provide email and password.'));
    }

    const normalized = email.trim().toLowerCase();
    const storedUsers = getStoredUsers();
    const knownUsers = [...storedUsers, ...MOCK_USERS.filter(mock => !storedUsers.some(user => user.email === mock.email))];
    const userMatch = knownUsers.find(u => u.email === normalized);

    const result: AuthUser = userMatch ?? {
      id: `user-${normalized}`,
      name: normalized === 'admin@quickservice.com' ? 'Admin User' : normalized.includes('provider') ? 'Provider User' : 'New Customer',
      email: normalized,
      role: normalized === 'admin@quickservice.com' ? 'ADMIN' : normalized.includes('provider') ? 'SERVICE_PROVIDER' : 'CUSTOMER',
      joinedAt: new Date().toISOString(),
      providerStatus: normalized.includes('provider') ? 'APPROVED' : undefined,
    };

    const nextUsers = knownUsers.some(u => u.email === normalized)
      ? knownUsers
      : [...storedUsers, result];

    saveUsers(nextUsers);
    setUser(result);
    saveActiveUser(result);
    return result;
  };

  const register = async (payload: RegisterPayload) => {
    await new Promise(resolve => setTimeout(resolve, 250));

    const normalizedEmail = payload.email.trim().toLowerCase();
    if (!payload.name.trim() || !normalizedEmail || !payload.mobileNumber.trim() || !payload.password.trim() || !payload.role) {
      return Promise.reject(new Error('Please fill out all required fields.'));
    }

    const storedUsers = getStoredUsers();
    const existingUser = storedUsers.find(user => user.email === normalizedEmail) || MOCK_USERS.find(user => user.email === normalizedEmail);
    if (existingUser) {
      return Promise.reject(new Error('An account with that email already exists.'));
    }

    if (payload.role === 'SERVICE_PROVIDER' && !payload.profession?.trim()) {
      return Promise.reject(new Error('Please add your service profession.'));
    }

    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      name: payload.name.trim(),
      email: normalizedEmail,
      mobileNumber: payload.mobileNumber.trim(),
      role: payload.role,
      joinedAt: new Date().toISOString(),
      profession: payload.profession?.trim() || undefined,
      businessName: payload.businessName?.trim() || undefined,
      providerStatus: payload.role === 'SERVICE_PROVIDER' ? 'PENDING' : undefined,
    };

    const nextUsers = [...storedUsers, newUser];
    saveUsers(nextUsers);
    setUser(newUser);
    saveActiveUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    saveActiveUser(null);
  };

  const fetchUsers = async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const storedUsers = getStoredUsers();
    return [...storedUsers, ...MOCK_USERS.filter((mock) => !storedUsers.some((user) => user.email === mock.email))];
  };

  const updateUser = async (
    id: string,
    updates: Partial<Pick<AuthUser, 'providerStatus' | 'name' | 'profession' | 'businessName'>>,
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const storedUsers = getStoredUsers();
    const knownUsers = [...storedUsers, ...MOCK_USERS.filter((mock) => !storedUsers.some((user) => user.email === mock.email))];
    const index = knownUsers.findIndex((user) => user.id === id);
    if (index === -1) return undefined;

    const updatedUser = { ...knownUsers[index], ...updates };
    const storedIndex = storedUsers.findIndex((user) => user.id === id);
    if (storedIndex >= 0) {
      storedUsers[storedIndex] = updatedUser;
    } else {
      storedUsers.push(updatedUser);
    }

    saveUsers(storedUsers);
    if (user?.id === id) {
      setUser(updatedUser);
      saveActiveUser(updatedUser);
    }
    return updatedUser;
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
