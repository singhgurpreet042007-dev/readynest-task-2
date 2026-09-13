import { apiClient, setStoredToken, removeStoredToken } from './api';
import { User } from '../types';

export interface AuthResponse {
  success: boolean;
  message?: string;
  token: string;
  user: User;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await apiClient<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (res.token) {
    setStoredToken(res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    localStorage.setItem('role', res.user.role);
  }

  return res;
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
  const res = await apiClient<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return res;
}

export async function getMe(): Promise<{ success: boolean; user: User }> {
  const res = await apiClient<{ success: boolean; user: User }>('/auth/me');
  if (res.user) {
    localStorage.setItem('user', JSON.stringify(res.user));
    localStorage.setItem('role', res.user.role);
  }
  return res;
}

export function logout(): void {
  removeStoredToken();
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}
