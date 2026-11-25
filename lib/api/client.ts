export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
export const AUTH_TOKEN_KEY = "tag_auth_token";
export const AUTH_REFRESH_KEY = "tag_refresh_token";
export const AUTH_USER_KEY = "tag_auth_user";
export const AUTH_ROLE_KEY = "tag_active_role";

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export function getStoredAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getStoredRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_REFRESH_KEY);
}

export function setStoredTokens(tokens: { access?: string; refresh?: string }) {
  if (typeof window === "undefined") return;
  if (tokens.access) {
    localStorage.setItem(AUTH_TOKEN_KEY, tokens.access);
    document.cookie = `${AUTH_TOKEN_KEY}=${tokens.access}; path=/; max-age=86400; SameSite=Lax`;
  }
  if (tokens.refresh) {
    localStorage.setItem(AUTH_REFRESH_KEY, tokens.refresh);
    document.cookie = `${AUTH_REFRESH_KEY}=${tokens.refresh}; path=/; max-age=604800; SameSite=Lax`;
  }
}

export function clearStoredTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_REFRESH_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(AUTH_ROLE_KEY);
  document.cookie = `${AUTH_TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  document.cookie = `${AUTH_REFRESH_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  document.cookie = `${AUTH_ROLE_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

function normalizeErrorMessage(data: any, fallback: string): string {
  if (!data) return fallback;
  if (typeof data === "string") return data;
  if (data.detail && typeof data.detail === "string") return data.detail;
  if (data.message && typeof data.message === "string") return data.message;
  if (data.error && typeof data.error === "string") return data.error;

  // DRF field errors dictionary: { email: ["Invalid email"], otp: ["Verification code is required"] }
  if (typeof data === "object") {
    const messages: string[] = [];
    for (const [key, value] of Object.entries(data)) {
      const fieldText = Array.isArray(value) ? value.join(", ") : typeof value === "string" ? value : "";
      if (fieldText) {
        if (key === "otp" || key === "otp_code" || key === "code" || key === "non_field_errors" || key === "detail") {
          messages.push(fieldText);
        } else {
          messages.push(`${key}: ${fieldText}`);
        }
      }
    }
    if (messages.length > 0) return messages.join(" | ");
  }

  return fallback;
}

export async function apiClient<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${API_BASE}${cleanEndpoint}`;

  const headers = new Headers(options.headers || {});

  // Add auth header if available and not explicitly provided
  const token = getStoredAccessToken();
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Set Content-Type only if not sending FormData
  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 204) {
      return {} as T;
    }

    const contentType = response.headers.get("content-type") || "";
    let data: any = null;
    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const errorMessage = normalizeErrorMessage(
        data,
        `Request failed with status ${response.status}`
      );
      throw new ApiError(errorMessage, response.status, data);
    }

    return data as T;
  } catch (err: any) {
    if (err instanceof ApiError) {
      throw err;
    }
    // Network or server unreachable error
    if (err.name === "TypeError" && err.message?.includes("fetch")) {
      throw new ApiError(
        `Unable to connect to backend at ${API_BASE}. Please ensure the Django backend server is running.`,
        0,
        { original: err.message }
      );
    }
    throw new ApiError(err.message || "An unexpected error occurred.", 500, err);
  }
}

export const api = {
  get: <T = any>(endpoint: string, headers?: Record<string, string>) =>
    apiClient<T>(endpoint, { method: "GET", headers }),

  post: <T = any>(endpoint: string, body?: any, headers?: Record<string, string>) =>
    apiClient<T>(endpoint, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
      headers,
    }),

  patch: <T = any>(endpoint: string, body?: any, headers?: Record<string, string>) =>
    apiClient<T>(endpoint, {
      method: "PATCH",
      body: body instanceof FormData ? body : JSON.stringify(body),
      headers,
    }),

  put: <T = any>(endpoint: string, body?: any, headers?: Record<string, string>) =>
    apiClient<T>(endpoint, {
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body),
      headers,
    }),

  delete: <T = any>(endpoint: string, headers?: Record<string, string>) =>
    apiClient<T>(endpoint, { method: "DELETE", headers }),
};
