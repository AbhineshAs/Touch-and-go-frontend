"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UserRole } from "@/types";
import { switchActiveRole, signOut } from "@/lib/api/auth";
import { Globe, User as UserIcon, Building2, ShieldCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function DemoRoleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeRole, setActiveRole] = useState<string>("public");
  const [minimized, setMinimized] = useState<boolean>(false);

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      setActiveRole("admin");
    } else if (pathname.startsWith("/employer")) {
      setActiveRole("employer");
    } else if (pathname.startsWith("/candidate")) {
      setActiveRole("candidate");
    } else {
      setActiveRole("public");
    }
  }, [pathname]);

  const handleRoleSelect = async (role: "public" | UserRole) => {
    setActiveRole(role);
    if (role === "public") {
      await signOut();
      router.push("/");
    } else if (role === "candidate") {
      await switchActiveRole("candidate");
      router.push("/candidate/dashboard");
    } else if (role === "employer") {
      await switchActiveRole("employer");
      router.push("/employer/dashboard");
    } else if (role === "admin") {
      await switchActiveRole("admin");
      router.push("/admin/dashboard");
    }
  };

  const roles = [
    { id: "public", label: "Public Market", sub: "Guest", icon: <Globe className="w-3.5 h-3.5" /> },
    { id: "candidate", label: "Candidate", sub: "Ananya", icon: <UserIcon className="w-3.5 h-3.5" /> },
    { id: "employer", label: "Company", sub: "RazorWave", icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: "admin", label: "Platform Admin", sub: "Ops", icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  ];

  if (minimized) {
    return (
      <aside
        aria-label="Demo role switcher toggle"
        className="fixed bottom-5 right-5 z-50 transition-all duration-300 ease-out"
      >
        <button
          type="button"
          onClick={() => setMinimized(false)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1A2838]/95 text-white border border-[#B9D7EA]/40 shadow-2xl backdrop-blur-xl text-xs font-bold hover:bg-[#2A3E54] cursor-pointer transition-transform hover:scale-105"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#769FCD] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#769FCD]" />
          </span>
          <span>Switch Persona</span>
        </button>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Demo role switcher"
      className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-out"
    >
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#1A2838]/95 text-white border border-[#B9D7EA]/30 shadow-2xl backdrop-blur-xl">
        {/* Pulsing Live Dot */}
        <div className="flex items-center gap-2 pl-3 pr-2 py-1 text-[11px] font-bold tracking-wider text-[#D6E6F2] border-r border-[#B9D7EA]/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#769FCD] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#769FCD]" />
          </span>
          <span className="hidden sm:inline">DEMO PERSONA</span>
        </div>

        {/* Role Toggle Buttons */}
        <div className="flex items-center gap-1">
          {roles.map((r) => {
            const isActive = activeRole === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => handleRoleSelect(r.id as any)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer select-none",
                  isActive
                    ? "bg-[#769FCD] text-white shadow-md border border-[#B9D7EA]/40"
                    : "text-[#D6E6F2]/70 hover:text-white hover:bg-white/10"
                )}
              >
                <span className={cn(isActive ? "text-white" : "text-[#D6E6F2]/60")}>{r.icon}</span>
                <span>{r.label}</span>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-full font-normal hidden md:inline-block",
                    isActive ? "bg-white/20 text-white" : "bg-white/5 text-[#D6E6F2]/60"
                  )}
                >
                  {r.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* Minimize Button */}
        <button
          type="button"
          onClick={() => setMinimized(true)}
          title="Minimize bar"
          className="p-1.5 rounded-full text-[#D6E6F2]/60 hover:text-white hover:bg-white/10 ml-0.5 cursor-pointer transition-colors"
          aria-label="Minimize switcher"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
