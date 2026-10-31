"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  Menu,
  X,
  ArrowRight,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  Building2,
  Compass,
  Award,
  Briefcase,
} from "lucide-react";

import { TagLogo } from "@/components/ui/TagLogo";

export function PublicNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const getPortalLink = () => {
    if (!user) return "/sign-in";
    if (user.role === "candidate") return "/candidate/dashboard";
    if (user.role === "employer") return "/employer/dashboard";
    return "/admin/dashboard";
  };

  const getPortalLabel = () => {
    if (!user) return "My Workspace";
    if (user.role === "candidate") return "Candidate Portal";
    if (user.role === "employer") return "Company Portal";
    return "Admin Console";
  };

  const navLinks = [
    { label: "Explore Roles", href: "/jobs", icon: Compass },
    { label: "Product Features", href: "#product-showcase", icon: Award },
    {
      label: "Employer Console",
      href: isAuthenticated
        ? user?.role === "employer"
          ? "/employer/dashboard"
          : "/employer/dashboard"
        : "/sign-in?role=employer&redirect=%2Femployer%2Fdashboard",
      icon: Building2,
    },
    { label: "Trust & Security", href: "/trust", icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#B9D7EA] shadow-2xs text-[#1A2838] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left Section: Brand Logo */}
        <div className="flex items-center gap-8 shrink-0">
          <TagLogo height={44} />

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5",
                    isActive
                      ? "text-[#1A2838] bg-[#D6E6F2] border border-[#B9D7EA] shadow-2xs"
                      : "text-[#2C3E50] hover:text-[#1A2838] hover:bg-[#D6E6F2]/40 border border-transparent"
                  )}
                >
                  <Icon className="w-3.5 h-3.5 text-[#769FCD]" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right CTA / Auth controls */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <Link
                href={getPortalLink()}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#D6E6F2]/30 border border-[#B9D7EA] hover:border-[#769FCD] transition-colors shadow-2xs group"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#B9D7EA]"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA] flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                )}
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-xs font-bold text-[#1A2838] group-hover:text-[#769FCD] transition-colors">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-[#5A7184] capitalize font-mono">
                    {user.role}
                  </span>
                </div>
              </Link>

              <Link href={getPortalLink()}>
                <button className="px-5 py-2.5 rounded-xl bg-[#1A2838] hover:bg-[#769FCD] text-white font-extrabold text-xs shadow-xs flex items-center gap-2 transition-all cursor-pointer">
                  <LayoutDashboard className="w-4 h-4 text-[#B9D7EA]" />
                  <span>{getPortalLabel()}</span>
                </button>
              </Link>

              <button
                type="button"
                onClick={() => logout("/")}
                title="Sign Out"
                className="p-2.5 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer border border-transparent hover:border-red-200"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Link href="/sign-in">
                <button className="px-4 py-2.5 text-xs font-extrabold text-[#1A2838] hover:text-[#769FCD] transition-colors cursor-pointer">
                  Login
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="px-5 py-2.5 rounded-xl bg-[#1A2838] hover:bg-[#769FCD] text-white font-extrabold text-xs shadow-md shadow-[#1A2838]/20 flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer">
                  <span>Register Free</span>
                  <ArrowRight className="w-4 h-4 text-[#B9D7EA]" />
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-[#1A2838] hover:bg-[#D6E6F2] border border-[#B9D7EA] cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#1A2838]" />}
        </button>
      </div>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 bg-[#1A2838]/60 backdrop-blur-xs z-40 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute top-full left-0 right-0 z-50 border-t border-[#B9D7EA] bg-white/98 backdrop-blur-xl px-5 pt-4 pb-7 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 text-sm font-bold rounded-xl transition-colors flex items-center justify-between",
                      isActive
                        ? "text-[#1A2838] bg-[#D6E6F2] border border-[#B9D7EA]"
                        : "text-[#2C3E50] hover:text-[#1A2838] hover:bg-[#D6E6F2]/50"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-[#769FCD]" />
                      <span>{link.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#5A7184]" />
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-[#B9D7EA] flex flex-col gap-3">
              {isAuthenticated && user ? (
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#D6E6F2]/30 border border-[#B9D7EA]">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#B9D7EA] shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA] flex items-center justify-center font-bold text-sm shrink-0">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-sm font-bold text-[#1A2838] truncate">{user.name}</span>
                      <span className="text-xs text-[#5A7184] capitalize">{user.role} workspace</span>
                    </div>
                  </div>

                  <Link href={getPortalLink()} onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <button className="w-full py-3 rounded-xl bg-[#1A2838] hover:bg-[#769FCD] text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer">
                      <LayoutDashboard className="w-4 h-4 text-[#B9D7EA]" />
                      <span>Open {getPortalLabel()}</span>
                    </button>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout("/");
                    }}
                    className="w-full py-2.5 rounded-xl text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <button className="w-full py-3 rounded-xl font-bold text-xs text-[#1A2838] bg-[#D6E6F2] border border-[#B9D7EA] cursor-pointer">
                      Sign In to Platform
                    </button>
                  </Link>
                  <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)} className="w-full">
                    <button className="w-full py-3 rounded-xl bg-[#1A2838] hover:bg-[#769FCD] text-white font-extrabold text-xs shadow-md shadow-[#1A2838]/20 flex items-center justify-center gap-2 cursor-pointer">
                      <span>Get Started Free</span>
                      <ArrowRight className="w-4 h-4 text-[#B9D7EA]" />
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
