"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { getStoredUser, getStoredToken } from "@/lib/api/auth";
import { UserRole } from "@/types";
import { LoadingState } from "@/components/ui/States";
import { Button } from "@/components/ui/Button";
import { ShieldAlert, ArrowLeft, LogOut, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requiredPermissionDescription?: string;
}

export function ProtectedRoute({
  children,
  allowedRoles,
  requiredPermissionDescription,
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, isAuthenticated, switchRole, logout, refreshAuth } = useAuth();

  // Inspect storage synchronously to avoid race conditions when navigating right after session commit
  const storedUser = typeof window !== "undefined" ? getStoredUser() : null;
  const storedToken = typeof window !== "undefined" ? getStoredToken() : null;
  const effectivelyAuthenticated = isAuthenticated || Boolean(storedUser && storedToken);
  const effectiveUser = user || storedUser;

  useEffect(() => {
    if (!isLoading) {
      if (!effectivelyAuthenticated) {
        const redirectUrl = `/sign-in?redirect=${encodeURIComponent(pathname)}&reason=auth_required`;
        router.replace(redirectUrl);
      } else if (!isAuthenticated && storedUser && storedToken) {
        refreshAuth();
      }
    }
  }, [isLoading, effectivelyAuthenticated, isAuthenticated, pathname, router, refreshAuth, storedUser, storedToken]);

  // Role validation: automatically route user to their respective portal so candidate only sees candidate, employer only sees employer
  useEffect(() => {
    if (
      !isLoading &&
      effectivelyAuthenticated &&
      effectiveUser &&
      allowedRoles &&
      !allowedRoles.includes(effectiveUser.role)
    ) {
      router.replace(`/${effectiveUser.role}/dashboard`);
    }
  }, [isLoading, effectivelyAuthenticated, effectiveUser, allowedRoles, router]);

  if (isLoading || (!isAuthenticated && effectivelyAuthenticated)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingState message="Verifying authentication & access permissions..." />
      </div>
    );
  }

  if (!effectivelyAuthenticated || !effectiveUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingState message="Redirecting to sign-in..." />
      </div>
    );
  }

  if (allowedRoles && effectiveUser && !allowedRoles.includes(effectiveUser.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F8FB]">
        <LoadingState message={`Returning to your ${effectiveUser.role} workspace...`} />
      </div>
    );
  }

  return <>{children}</>;
}
