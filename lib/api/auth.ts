import { User, UserRole } from "@/types";
import { MOCK_USERS } from "@/lib/mocks/data";
import {
  api,
  ApiError,
  AUTH_TOKEN_KEY,
  AUTH_REFRESH_KEY,
  AUTH_USER_KEY,
  AUTH_ROLE_KEY,
  getStoredAccessToken,
  getStoredRefreshToken,
  setStoredTokens,
  clearStoredTokens,
} from "./client";
import { mockDelay } from "./delay";

export { AUTH_TOKEN_KEY, AUTH_REFRESH_KEY, AUTH_USER_KEY, AUTH_ROLE_KEY };

export function notifyAuthChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("tag_auth_changed"));
  try {
    window.dispatchEvent(new StorageEvent("storage", { key: AUTH_TOKEN_KEY }));
  } catch {
    window.dispatchEvent(new Event("storage"));
  }
}

export function getStoredToken(): string | null {
  return getStoredAccessToken();
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function updateStoredUser(fields: Partial<User>): User | null {
  if (typeof window === "undefined") return null;
  const current = getStoredUser();
  if (!current) return null;
  const updated: User = { ...current, ...fields };
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updated));
  notifyAuthChange();
  return updated;
}

export async function getCurrentUser(): Promise<User | null> {
  const token = getStoredAccessToken();
  if (!token) {
    return getStoredUser();
  }

  try {
    const remoteUser = await api.get<User>("/auth/me/");
    if (remoteUser && remoteUser.id) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(remoteUser));
      return remoteUser;
    }
  } catch (err) {
    // If backend is unreachable or token expired, return cached stored user
  }

  return getStoredUser();
}

export async function switchActiveRole(role: UserRole): Promise<User> {
  await mockDelay(80);
  const user = MOCK_USERS[role];
  const token = `tag_jwt_${Date.now()}_${role}`;
  if (typeof window !== "undefined") {
    setStoredTokens({ access: token });
    localStorage.setItem(AUTH_ROLE_KEY, role);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    document.cookie = `${AUTH_ROLE_KEY}=${role}; path=/; max-age=604800; SameSite=Lax`;
    notifyAuthChange();
  }
  return user;
}

export async function signIn(
  email: string,
  role?: UserRole,
  password?: string
): Promise<{ user: User; token: string }> {
  // If password provided, attempt real backend JWT authentication
  if (password) {
    try {
      const res = await api.post<{
        success: boolean;
        message: string;
        tokens: { access: string; refresh: string };
        token: string;
        user: User;
      }>("/auth/login/", {
        email: email.trim().toLowerCase(),
        password,
        role,
      });

      if (res && res.tokens) {
        setStoredTokens(res.tokens);
        const resolvedUser: User = {
          ...res.user,
          role: (res.user.role as UserRole) || role || "candidate",
        };
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(resolvedUser));
        localStorage.setItem(AUTH_ROLE_KEY, resolvedUser.role);
        document.cookie = `${AUTH_ROLE_KEY}=${resolvedUser.role}; path=/; max-age=604800; SameSite=Lax`;
        notifyAuthChange();
        return { user: resolvedUser, token: res.tokens.access };
      }
    } catch (err: any) {
      // If it's an explicit 400/401/404 auth error from the backend, throw it
      if (err instanceof ApiError && err.status >= 400 && err.status < 500) {
        throw err;
      }
      // If backend is offline (status === 0), check for demo account fallback
      const baseMock = role ? MOCK_USERS[role] : null;
      if (baseMock && baseMock.email.toLowerCase() === email.toLowerCase()) {
        return mockDemoSignIn(email, role || "candidate");
      }
      throw err;
    }
  }

  // Demo 1-click fallback
  const userRole = role || (email.includes("recruiter") ? "employer" : "candidate");
  return mockDemoSignIn(email, userRole);
}

function mockDemoSignIn(email: string, role: UserRole): { user: User; token: string } {
  const baseMock = MOCK_USERS[role];
  const isDefaultDemoEmail = Boolean(baseMock && baseMock.email.toLowerCase() === email.toLowerCase());
  const userName = isDefaultDemoEmail
    ? baseMock.name
    : email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const user: User = {
    id: isDefaultDemoEmail ? baseMock.id : `usr_${Date.now()}`,
    name: userName,
    email,
    role,
    avatarUrl: baseMock?.avatarUrl,
    organizationId: role === "employer" ? "org_razorwave" : undefined,
    createdAt: new Date().toISOString(),
  };

  const token = `tag_jwt_${Date.now()}_${role}`;

  if (typeof window !== "undefined") {
    setStoredTokens({ access: token, refresh: `tag_ref_${Date.now()}` });
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    localStorage.setItem(AUTH_ROLE_KEY, role);
    document.cookie = `${AUTH_ROLE_KEY}=${role}; path=/; max-age=604800; SameSite=Lax`;
    notifyAuthChange();
  }

  return { user, token };
}

export async function candidateSignUp(data: {
  fullName: string;
  email: string;
  countryCode?: string;
  phone: string;
  password: string;
  confirmPassword?: string;
  agreeToTerms?: boolean;
}): Promise<{ success: boolean; message: string; user: User; email: string }> {
  try {
    const res = await api.post<{
      success: boolean;
      message: string;
      email: string;
      role: string;
      user: User;
    }>("/auth/register/candidate/", {
      fullName: data.fullName,
      email: data.email,
      countryCode: data.countryCode || "+91",
      phone: data.phone,
      password: data.password,
      confirmPassword: data.confirmPassword || data.password,
      agreeToTerms: data.agreeToTerms ?? true,
    });

    return {
      success: true,
      message: res.message || "Candidate account created.",
      user: res.user,
      email: res.email,
    };
  } catch (err: any) {
    if (err instanceof ApiError && err.status === 0) {
      // Backend not running fallback
      const user: User = {
        id: `usr_${Date.now()}`,
        name: data.fullName,
        email: data.email,
        role: "candidate",
        createdAt: new Date().toISOString(),
      };
      return { success: true, message: "Candidate registered (mock mode).", user, email: data.email };
    }
    throw err;
  }
}

export async function employerSignUp(data: {
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  agreeToTerms?: boolean;
}): Promise<{ success: boolean; message: string; user: User; email: string }> {
  try {
    const res = await api.post<{
      success: boolean;
      message: string;
      email: string;
      role: string;
      user: User;
    }>("/auth/register/employer/", {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword || data.password,
      agreeToTerms: data.agreeToTerms ?? true,
    });

    return {
      success: true,
      message: res.message || "Company account created.",
      user: res.user,
      email: res.email,
    };
  } catch (err: any) {
    if (err instanceof ApiError && err.status === 0) {
      const user: User = {
        id: `usr_${Date.now()}`,
        name: data.fullName,
        email: data.email,
        role: "employer",
        createdAt: new Date().toISOString(),
      };
      return { success: true, message: "Company registered (mock mode).", user, email: data.email };
    }
    throw err;
  }
}

export async function verifyEmailOTP(
  email: string,
  code: string
): Promise<{ user: User; token: string }> {
  const cleanCode = code.trim();
  const cleanEmail = email.trim().toLowerCase();
  const res = await api.post<{
    success: boolean;
    message: string;
    tokens: { access: string; refresh: string };
    user: User;
  }>("/auth/verify-email/", {
    email: cleanEmail,
    code: cleanCode,
    otp_code: cleanCode,
    otp: cleanCode,
  });

  if (res && res.tokens) {
    setStoredTokens(res.tokens);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(res.user));
    localStorage.setItem(AUTH_ROLE_KEY, res.user.role);
    notifyAuthChange();
  }

  return { user: res.user, token: res.tokens.access };
}

export async function resendOTP(
  email: string,
  purpose: "email_verification" | "password_reset" = "email_verification"
): Promise<{ success: boolean; message: string }> {
  return api.post("/auth/resend-otp/", {
    email: email.trim().toLowerCase(),
    purpose,
  });
}

export async function requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
  return api.post("/auth/forgot-password/", {
    email: email.trim().toLowerCase(),
  });
}

export async function verifyPasswordResetOTP(
  email: string,
  code: string
): Promise<{ success: boolean; message: string }> {
  const cleanCode = code.trim();
  const cleanEmail = email.trim().toLowerCase();
  return api.post("/auth/verify-reset-otp/", {
    email: cleanEmail,
    code: cleanCode,
    otp_code: cleanCode,
    otp: cleanCode,
  });
}

export async function resetPasswordWithOTP(data: {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword?: string;
}): Promise<{ success: boolean; message: string }> {
  const cleanCode = data.code.trim();
  const cleanEmail = data.email.trim().toLowerCase();
  return api.post("/auth/reset-password/", {
    email: cleanEmail,
    code: cleanCode,
    otp_code: cleanCode,
    otp: cleanCode,
    new_password: data.newPassword,
    newPassword: data.newPassword,
    confirm_password: data.confirmPassword || data.newPassword,
    confirmPassword: data.confirmPassword || data.newPassword,
  });
}

export async function signOut(): Promise<void> {
  const refresh = getStoredRefreshToken();
  if (refresh) {
    try {
      await api.post("/auth/logout/", { refresh });
    } catch {
      // Ignore network errors on logout
    }
  }

  clearStoredTokens();
  notifyAuthChange();
}

export async function signUp(data: {
  name: string;
  email: string;
  role: UserRole;
  password?: string;
}): Promise<{ user: User; token: string }> {
  if (data.role === "candidate") {
    const res = await candidateSignUp({
      fullName: data.name,
      email: data.email,
      phone: "9876543210",
      password: data.password || "Password123",
    });
    return mockDemoSignIn(data.email, "candidate");
  } else {
    const res = await employerSignUp({
      fullName: data.name,
      email: data.email,
      password: data.password || "Password123",
    });
    return mockDemoSignIn(data.email, "employer");
  }
}
