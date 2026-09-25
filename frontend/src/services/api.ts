const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const cleanBaseUrl = rawBaseUrl.replace(/\/+$/, '');
const API_BASE_URL = cleanBaseUrl.endsWith('/api') ? cleanBaseUrl : `${cleanBaseUrl}/api`;

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function setStoredToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('token', token);
}

export function removeStoredToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getStoredToken();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  // Check for HTTPS -> localhost mixed content in live browser environments
  if (
    typeof window !== 'undefined' &&
    window.location.protocol === 'https:' &&
    API_BASE_URL.startsWith('http://localhost')
  ) {
    throw new Error(
      'Deployment Configuration Error: The frontend is running on HTTPS, but NEXT_PUBLIC_API_URL is pointing to localhost. Please configure your live Backend URL in Vercel Environment Variables.'
    );
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || `API Error: ${response.status} ${response.statusText}`);
    }

    return data as T;
  } catch (error: any) {
    // If it's a network fetch failure (e.g. Render sleeping or connection refused)
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error(
        'Unable to connect to backend server. If hosted on a free cloud tier (like Render), it may take 30-45 seconds to wake up from cold sleep. Please retry in a moment.'
      );
    }
    throw error;
  }
}
