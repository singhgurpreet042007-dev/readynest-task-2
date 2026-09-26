import { apiClient, setStoredToken, removeStoredToken } from './api';
import { User } from '../types';
import { mockUsers } from './mockData';

export interface AuthResponse {
  success: boolean;
  message?: string;
  token: string;
  user: User;
}

const USERS_STORAGE_KEY = 'smart_campus_custom_users';

function getLocalUsers(): Record<string, { user: User; passwordPlain: string }> {
  if (typeof window === 'undefined') return mockUsers;
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    const custom = stored ? JSON.parse(stored) : {};
    return { ...mockUsers, ...custom };
  } catch {
    return mockUsers;
  }
}

function saveLocalUser(email: string, user: User, passwordPlain: string) {
  if (typeof window === 'undefined') return;
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    const custom = stored ? JSON.parse(stored) : {};
    custom[email.toLowerCase().trim()] = { user, passwordPlain };
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(custom));
  } catch (err) {
    console.warn('Failed to save local user fallback', err);
  }
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const cleanEmail = email.toLowerCase().trim();

  // Try live backend first
  try {
    const res = await apiClient<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: cleanEmail, password }),
    });

    if (res.token) {
      setStoredToken(res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      localStorage.setItem('role', res.user.role);
    }

    return res;
  } catch (err: any) {
    // Graceful offline / demo fallback if live backend is unreachable or not configured
    const users = getLocalUsers();
    const matched = users[cleanEmail];

    if (matched) {
      if (matched.passwordPlain !== password) {
        throw new Error('Incorrect password. Please verify your credentials.');
      }

      const demoToken = `demo_jwt_token_${matched.user.id}_${Date.now()}`;
      setStoredToken(demoToken);
      localStorage.setItem('user', JSON.stringify(matched.user));
      localStorage.setItem('role', matched.user.role);

      console.info('[Auth] Signed in using local demo credentials for:', cleanEmail);

      return {
        success: true,
        message: 'Signed in successfully (Demo Mode)',
        token: demoToken,
        user: matched.user,
      };
    }

    // If it's a specific live API error from server (e.g. invalid credentials when backend is connected)
    if (err.message && !err.message.includes('BACKEND_NOT_CONFIGURED') && !err.message.includes('Unable to connect')) {
      throw err;
    }

    throw new Error('Account does not exist with this email. Please register first.');
  }
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
  enrollmentNumber?: string;
  course?: string;
  semester?: string;
  department?: string;
}): Promise<AuthResponse> {
  const cleanEmail = data.email.toLowerCase().trim();

  // Try live backend first
  try {
    const res = await apiClient<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.token) {
      setStoredToken(res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      localStorage.setItem('role', res.user.role);
    }

    return res;
  } catch (err: any) {
    // If backend returned a real validation error
    if (err.message && !err.message.includes('BACKEND_NOT_CONFIGURED') && !err.message.includes('Unable to connect')) {
      throw err;
    }

    // Offline / Demo fallback registration
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: data.name,
      email: cleanEmail,
      role: 'STUDENT',
      student: {
        id: `std_${Date.now()}`,
        userId: `usr_${Date.now()}`,
        enrollmentNumber: data.enrollmentNumber || `21BCSE${Math.floor(100 + Math.random() * 900)}`,
        course: data.course || 'B.Tech Computer Science & Engineering',
        semester: data.semester || 'Semester 6',
        department: data.department || 'School of Computing & Data Sciences',
      },
    };

    saveLocalUser(cleanEmail, newUser, data.password);

    const demoToken = `demo_jwt_token_${newUser.id}_${Date.now()}`;
    setStoredToken(demoToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('role', newUser.role);

    console.info('[Auth] Registered and stored locally:', cleanEmail);

    return {
      success: true,
      message: 'Account created successfully',
      token: demoToken,
      user: newUser,
    };
  }
}

export async function getMe(): Promise<{ success: boolean; user: User }> {
  try {
    const res = await apiClient<{ success: boolean; user: User }>('/auth/me');
    if (res.user) {
      localStorage.setItem('user', JSON.stringify(res.user));
      localStorage.setItem('role', res.user.role);
    }
    return res;
  } catch {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (stored) {
      return { success: true, user: JSON.parse(stored) };
    }
    throw new Error('Not authenticated');
  }
}

export function logout(): void {
  removeStoredToken();
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}
