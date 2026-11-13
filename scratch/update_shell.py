import os

shell_content = '''"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Calendar,
  BarChart3,
  ShieldCheck,
  Building2,
  Settings,
  Menu,
  X,
  Plus,
  LogOut,
  SlidersHorizontal,
  Search,
  Bell,
  Sparkles,
  Command,
} from "lucide-react";
import { MOCK_USERS, MOCK_ORGANIZATIONS } from "@/lib/mocks/data";
import { useAuth } from "@/lib/auth/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export function EmployerShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user: authUser, logout } = useAuth();
  const user = authUser || MOCK_USERS.employer;
  const org = MOCK_ORGANIZATIONS[0];

  const mainNav = [
    { label: "Overview", href: "/employer/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Jobs", href: "/employer/jobs", icon: <Briefcase className="w-4 h-4" /> },
    { label: "Pipeline", href: "/employer/jobs/job_01/pipeline", icon: <SlidersHorizontal className="w-4 h-4" /> },
    { label: "Interviews", href: "/employer/interviews", icon: <Calendar className="w-4 h-4" />, badge: 1 },
    { label: "Team", href: "/employer/team", icon: <Users className="w-4 h-4" /> },
    { label: "Analytics", href: "/employer/analytics", icon: <BarChart3 className="w-4 h-4" /> },
  ];

  const adminNav = [
    { label: "Organization", href: "/employer/organization", icon: <Building2 className="w-4 h-4" /> },
    { label: "Verification", href: "/employer/verification", icon: <ShieldCheck className="w-4 h-4" /> },
    { label: "Settings", href: "/employer/settings", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <ProtectedRoute allowedRoles={["employer", "admin"]}>
      <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAF7F2] text-[#141413] font-sans selection:bg-[#D6E6F2] selection:text-[#141413]">
        {/* Mobile Top Header */}
        <header className="lg:hidden h-16 bg-white border-b border-[#E8E2D8] px-4 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <Link href="/employer/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#141413] text-white flex items-center justify-center font-black text-sm shadow-xs">
              T
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm text-[#141413] tracking-tight leading-none font-display">
                Touch &amp; Go
              </span>
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#74726A] mt-0.5">
                Recruiter Portal
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/employer/jobs/new">
              <button className="bg-[#141413] hover:bg-[#769FCD] text-white font-extrabold rounded-xl px-3.5 py-1.5 text-xs transition-colors cursor-pointer shadow-[2px_2px_0px_#769FCD]">
                Post Job
              </button>
            </Link>
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="p-2 rounded-xl text-[#74726A] hover:bg-[#FAF7F2] border border-[#E8E2D8]"
              aria-label="Toggle navigation menu"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5 text-[#141413]" /> : <Menu className="w-5 h-5 text-[#141413]" />}
            </button>
          </div>
        </header>

        {/* Mobile Backdrop Overlay */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-[#141413]/40 backdrop-blur-xs z-30 lg:hidden transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-[#E8E2D8] flex flex-col justify-between p-4.5 transition-transform duration-200 lg:static lg:translate-x-0 shadow-2xs overflow-y-auto",
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col gap-5">
            {/* Brand header */}
            <div className="flex items-center justify-between px-1.5 pt-1">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-[#141413] text-white flex items-center justify-center font-black text-lg tracking-wider shadow-xs group-hover:bg-[#769FCD] transition-colors">
                  T
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-base leading-tight tracking-tight text-[#141413] font-display">
                    TAG
                  </span>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#74726A] leading-none">
                    Company Console
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="lg:hidden p-1 text-[#74726A] hover:text-[#141413]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Org mini card */}
            <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] flex items-center gap-2.5">
              <img
                src={org.logo}
                alt={org.name}
                className="w-9 h-9 rounded-xl object-cover border border-[#E8E2D8] shrink-0 bg-white"
              />
              <div className="flex flex-col overflow-hidden">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-[#141413] truncate">{org.name}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#769FCD] shrink-0" />
                </div>
                <span className="text-[10px] font-mono font-bold text-[#769FCD] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  MCA Verified Entity
                </span>
              </div>
            </div>

            {/* Quick Action: Post New Job */}
            <Link href="/employer/jobs/new" onClick={() => setMobileSidebarOpen(false)}>
              <button className="w-full py-2.5 rounded-xl bg-[#141413] hover:bg-[#769FCD] text-white font-extrabold text-xs shadow-[2px_2px_0px_#769FCD] hover:shadow-[3px_3px_0px_#5E8BBF] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                <Plus className="w-4 h-4 text-white" />
                <span>Post New Requisition</span>
              </button>
            </Link>

            {/* Main Navigation */}
            <div className="flex flex-col gap-1">
              <span className="px-3 text-[10px] font-mono font-bold text-[#74726A] uppercase tracking-wider mb-1">
                Recruitment Ops
              </span>
              <nav className="flex flex-col gap-1">
                {mainNav.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/employer/dashboard" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 relative",
                        isActive
                          ? "bg-[#FAF7F2] text-[#141413] font-bold shadow-2xs border border-[#E8E2D8]"
                          : "text-[#5A5850] hover:text-[#141413] hover:bg-[#FAF7F2]"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className={cn(isActive ? "text-[#769FCD]" : "text-[#74726A]")}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span
                          className={cn(
                            "text-[10px] font-mono px-2 py-0.5 rounded-full font-bold",
                            isActive
                              ? "bg-[#D6E6F2] text-[#141413] border border-[#B9D7EA]"
                              : "bg-[#FAF7F2] text-[#74726A] border border-[#E8E2D8]"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                      {isActive && (
                        <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#769FCD]" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Administration Section */}
            <div className="flex flex-col gap-1 pt-2 border-t border-[#E8E2D8]">
              <span className="px-3 text-[10px] font-mono font-bold text-[#74726A] uppercase tracking-wider mb-1">
                Organization
              </span>
              <nav className="flex flex-col gap-1">
                {adminNav.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors",
                        isActive
                          ? "bg-[#FAF7F2] text-[#141413] font-bold border border-[#E8E2D8]"
                          : "text-[#5A5850] hover:text-[#141413] hover:bg-[#FAF7F2]"
                      )}
                    >
                      <span className={cn(isActive ? "text-[#769FCD]" : "text-[#74726A]")}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* User Card */}
          <div className="pt-4 border-t border-[#E8E2D8]">
            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8]">
              <div className="flex items-center gap-2.5 overflow-hidden">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-8.5 h-8.5 rounded-full object-cover shrink-0 border border-[#E8E2D8]"
                  />
                ) : (
                  <div className="w-8.5 h-8.5 rounded-full bg-[#141413] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {(user.name || "E").charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs font-bold text-[#141413] truncate">{user.name || "Recruiter"}</span>
                  <span className="text-[10px] font-mono text-[#74726A] truncate">Lead Recruiter</span>
                </div>
              </div>
              <button
                onClick={() => logout("/")}
                title="Sign Out"
                type="button"
                className="p-1.5 text-[#74726A] hover:text-red-600 rounded-lg hover:bg-white transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <header className="hidden lg:flex h-16 bg-white border-b border-[#E8E2D8] px-8 items-center justify-between sticky top-0 z-20 shadow-2xs">
            <div className="flex items-center gap-2.5 text-xs text-[#74726A] font-mono">
              <span className="font-semibold text-[#141413]">Recruiter Workspace</span>
              <span>/</span>
              <span className="capitalize text-[#769FCD] font-bold">
                {pathname.split("/").pop() || "Dashboard"}
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] hover:border-[#769FCD] text-xs text-[#74726A] transition-all w-68">
                <Search className="w-3.5 h-3.5 text-[#769FCD]" />
                <span className="truncate">Search candidates or jobs...</span>
                <kbd className="ml-auto text-[9px] font-mono px-1.5 py-0.5 rounded bg-white border border-[#E8E2D8] text-[#74726A]">
                  ⌘K
                </kbd>
              </div>

              <Link
                href="/employer/notifications"
                className="p-2 rounded-xl text-[#74726A] hover:text-[#141413] hover:bg-[#FAF7F2] border border-[#E8E2D8] relative transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#769FCD]" />
              </Link>

              <Link href="/employer/jobs/new">
                <button className="bg-[#141413] hover:bg-[#769FCD] text-white font-extrabold rounded-xl py-2 px-4 flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#769FCD] hover:shadow-[3px_3px_0px_#5E8BBF] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all text-xs">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Job</span>
                </button>
              </Link>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
'''

with open(r'k:\claude\Touch-and-go-frontend\components\layout\EmployerShell.tsx', 'w', encoding='utf-8') as f:
    f.write(shell_content)

print("EmployerShell.tsx updated successfully")

