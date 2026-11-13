import os

shell_content = '''"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Search,
  Compass,
  FileText,
  Bookmark,
  User,
  Settings,
  Bell,
  Menu,
  X,
  LogOut,
  Briefcase,
  FileEdit,
  Bot,
  BrainCircuit,
  Mic,
  TrendingUp,
  Award,
  Sparkles,
  Home,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { useCandidate } from "@/lib/candidate/context/CandidateContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { TagLogo } from "@/components/ui/TagLogo";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number | string;
  highlight?: boolean;
}

export function CandidateShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user: authUser, logout } = useAuth();
  const { candidateRecord, resetAll } = useCandidate();

  const candidateName = candidateRecord?.identity.fullName || authUser?.name || "Candidate";
  const candidateEmail = candidateRecord?.identity.email || authUser?.email || "";
  const candidateAvatar = authUser?.avatarUrl || undefined;

  const applicationsCount = candidateRecord?.applications.length || 0;
  const savedJobsCount = candidateRecord?.savedJobIds.length || 0;

  const coreNavItems: NavItem[] = [
    { label: "Candidate Hub", href: "/candidate", icon: <Home className="w-4 h-4" /> },
    { label: "Overview", href: "/candidate/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Find Jobs", href: "/candidate/jobs", icon: <Search className="w-4 h-4" /> },
    { label: "Recommended", href: "/candidate/recommended", icon: <Compass className="w-4 h-4" /> },
    {
      label: "Applications",
      href: "/candidate/applications",
      icon: <Briefcase className="w-4 h-4" />,
      badge: applicationsCount > 0 ? applicationsCount : undefined,
    },
    {
      label: "Saved Jobs",
      href: "/candidate/saved",
      icon: <Bookmark className="w-4 h-4" />,
      badge: savedJobsCount > 0 ? savedJobsCount : undefined,
    },
    {
      label: "Resume",
      href: "/candidate/resume",
      icon: <FileText className="w-4 h-4" />,
    },
    { label: "Profile", href: "/candidate/profile", icon: <User className="w-4 h-4" /> },
  ];

  const aiNavItems: NavItem[] = [
    {
      label: "Candidate AI Agent",
      href: "/candidate/agent",
      icon: <Bot className="w-4 h-4 text-[#769FCD]" />,
      badge: "6 Agents",
      highlight: true,
    },
    {
      label: "RAG Assistant",
      href: "/candidate/assistant",
      icon: <BrainCircuit className="w-4 h-4 text-[#769FCD]" />,
    },
    {
      label: "AI Interviewer",
      href: "/candidate/interview-simulator",
      icon: <Mic className="w-4 h-4 text-[#769FCD]" />,
    },
    {
      label: "Career Intelligence",
      href: "/candidate/career-intelligence",
      icon: <TrendingUp className="w-4 h-4 text-[#769FCD]" />,
    },
    {
      label: "Skill Assessments",
      href: "/candidate/assessments",
      icon: <Award className="w-4 h-4 text-[#769FCD]" />,
    },
  ];

  return (
    <ProtectedRoute allowedRoles={["candidate", "admin"]}>
      <div className="min-h-screen lg:h-screen flex flex-col lg:flex-row bg-[#FAF7F2] text-[#141413] lg:overflow-hidden font-sans selection:bg-[#D6E6F2] selection:text-[#141413]">
        {/* Mobile Top Bar */}
        <header className="lg:hidden h-16 bg-white border-b border-[#E8E2D8] px-4 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <TagLogo href="/candidate/dashboard" height={36} />

          <div className="flex items-center gap-2">
            <Link
              href="/candidate/notifications"
              className="p-2 rounded-xl text-[#74726A] hover:bg-[#FAF7F2] relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-[#141413]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#769FCD]" />
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

        {/* Sidebar (Desktop + Mobile Drawer) */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-[#E8E2D8] flex flex-col justify-between p-4.5 transition-transform duration-200 shadow-2xs",
            "lg:static lg:h-full lg:w-64 lg:shrink-0 lg:translate-x-0 overflow-y-auto",
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col gap-5">
            {/* Brand header */}
            <div className="flex items-center justify-between px-1.5 pt-1">
              <TagLogo href="/candidate/dashboard" height={38} />
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="lg:hidden p-1 text-[#74726A] hover:text-[#141413]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Pill */}
            <div className="mx-1 px-3 py-2 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] flex items-center justify-between text-xs">
              <span className="text-[#141413] font-black font-display">Candidate Portal</span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Open to Work
              </span>
            </div>

            {/* Core Navigation Links */}
            <div className="flex flex-col gap-1">
              <span className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-[#74726A]">
                Job Seeker Workflow
              </span>
              <nav className="flex flex-col gap-0.5 mt-1">
                {coreNavItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/candidate" && item.href !== "/candidate/dashboard" && pathname.startsWith(item.href)) ||
                    (item.href === "/candidate" && pathname === "/candidate");
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-3.5 py-2.25 rounded-xl text-xs font-semibold transition-all duration-150 relative",
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

            {/* AI Intelligence & Autonomous Workflows */}
            <div className="flex flex-col gap-1 pt-2 border-t border-[#E8E2D8]">
              <span className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-[#74726A] flex items-center justify-between">
                <span>AI &amp; Career Suite</span>
                <Sparkles className="w-3 h-3 text-[#769FCD]" />
              </span>
              <nav className="flex flex-col gap-0.5 mt-1">
                {aiNavItems.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-3.5 py-2.25 rounded-xl text-xs font-semibold transition-all duration-150 relative",
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
                      {item.badge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-[#D6E6F2] text-[#141413] border border-[#B9D7EA]">
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
          </div>

          {/* Bottom User Profile Card */}
          <div className="flex flex-col gap-1.5 pt-4 border-t border-[#E8E2D8]">
            <Link
              href="/candidate/notifications"
              onClick={() => setMobileSidebarOpen(false)}
              className={cn(
                "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 relative",
                pathname === "/candidate/notifications"
                  ? "bg-[#FAF7F2] text-[#141413] font-bold border border-[#E8E2D8]"
                  : "text-[#5A5850] hover:text-[#141413] hover:bg-[#FAF7F2]"
              )}
            >
              <div className="flex items-center gap-3">
                <Bell className={cn("w-4 h-4", pathname === "/candidate/notifications" ? "text-[#769FCD]" : "text-[#74726A]")} />
                <span>Notifications</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#769FCD] shrink-0" />
            </Link>

            <Link
              href="/candidate/settings"
              onClick={() => setMobileSidebarOpen(false)}
              className={cn(
                "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 relative",
                pathname === "/candidate/settings"
                  ? "bg-[#FAF7F2] text-[#141413] font-bold border border-[#E8E2D8]"
                  : "text-[#5A5850] hover:text-[#141413] hover:bg-[#FAF7F2]"
              )}
            >
              <div className="flex items-center gap-3">
                <Settings className={cn("w-4 h-4", pathname === "/candidate/settings" ? "text-[#769FCD]" : "text-[#74726A]")} />
                <span>Settings &amp; Privacy</span>
              </div>
            </Link>

            <div className="flex items-center justify-between p-2.5 mt-2 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8]">
              <Link
                href="/candidate/profile"
                onClick={() => setMobileSidebarOpen(false)}
                className="flex items-center gap-2.5 min-w-0 flex-1 group"
              >
                {candidateAvatar ? (
                  <img
                    src={candidateAvatar}
                    alt={candidateName}
                    className="w-9 h-9 rounded-full object-cover shrink-0 border border-[#E8E2D8]"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#141413] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {candidateName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#141413] truncate group-hover:text-[#769FCD] transition-colors">
                    {candidateName}
                  </span>
                  <span className="text-[10px] font-mono text-[#74726A] truncate">
                    {candidateEmail}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => {
                  resetAll();
                  logout("/");
                }}
                title="Sign Out"
                type="button"
                className="p-1.5 text-[#74726A] hover:text-red-600 rounded-lg hover:bg-white transition-colors cursor-pointer shrink-0 ml-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Page Area */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto">
          <header className="hidden lg:flex h-16 bg-white border-b border-[#E8E2D8] px-8 items-center justify-between sticky top-0 z-20 shadow-2xs">
            <div className="flex items-center gap-2.5 text-xs text-[#74726A] font-mono">
              <span className="font-semibold text-[#141413]">Candidate Workspace</span>
              <span>/</span>
              <span className="capitalize font-bold text-[#769FCD]">{pathname.split("/").pop() || "Dashboard"}</span>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/jobs" className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] hover:border-[#769FCD] text-xs font-medium text-[#74726A] transition-colors">
                <Search className="w-3.5 h-3.5 text-[#769FCD]" />
                <span>Explore Marketplace Jobs...</span>
                <kbd className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white border border-[#E8E2D8] text-[#74726A]">⌘K</kbd>
              </Link>

              <Link
                href="/candidate/notifications"
                className="p-2 rounded-xl text-[#74726A] hover:text-[#141413] hover:bg-[#FAF7F2] border border-[#E8E2D8] relative transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#769FCD]" />
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

with open(r'k:\claude\Touch-and-go-frontend\components\layout\CandidateShell.tsx', 'w', encoding='utf-8') as f:
    f.write(shell_content)

print("CandidateShell.tsx updated successfully")

