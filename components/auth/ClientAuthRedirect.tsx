"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStoredToken, getStoredUser } from "@/lib/api/auth";

export function ClientAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const token = getStoredToken();
    const user = getStoredUser();
    const activeRole = typeof window !== "undefined" ? localStorage.getItem("tag_active_role") : null;
    const role = user?.role || activeRole || "candidate";

    if (token) {
      if (role === "employer") {
        router.replace("/employer/dashboard");
      } else if (role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/candidate/dashboard");
      }
    }
  }, [router]);

  return null;
}
