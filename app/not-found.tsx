"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Search,
  Home,
  Briefcase,
  User,
  Building2,
  ShieldCheck,
  Compass,
  ArrowRight,
} from "lucide-react";
import { TagLogo } from "@/components/ui/TagLogo";

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/jobs?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/jobs");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#141413] selection:bg-[#D6E6F2] selection:text-[#141413] overflow-x-hidden font-sans">
      {/* 1. Sleek Public Navbar */}
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-[#E8E2D8] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <TagLogo href="/" height={36} />

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              HTTP 404
            </span>

            <Link
              href="/jobs"
              className="text-xs font-bold text-[#74726A] hover:text-[#141413] px-3 py-1.5 rounded-xl hover:bg-[#FAF7F2] transition-colors"
            >
              Explore Jobs
            </Link>

            <Link
              href="/login"
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#FAF7F2] border border-[#E8E2D8] hover:border-[#769FCD] text-xs font-bold text-[#141413] transition-all shadow-2xs"
            >
              Log In
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Main Hero Section */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center gap-10">
        {/* The 404 Canvas Card (1:1 matching the reference image) */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-3xl sm:rounded-[36px] overflow-hidden border border-[#B9D7EA]/60 shadow-xl bg-gradient-to-b from-[#5FA2CD] via-[#A8D3EF] to-[#E9F2FA] p-6 sm:p-10 flex flex-col items-center text-center"
        >
          {/* Ambient Drifting Clouds */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Cloud 1 */}
            <motion.div
              animate={{ x: [-20, 30, -20] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-10 w-80 h-32 rounded-full bg-white/35 blur-2xl"
            />
            {/* Cloud 2 */}
            <motion.div
              animate={{ x: [20, -30, 20] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 -right-10 w-96 h-40 rounded-full bg-white/40 blur-3xl"
            />
            {/* Cloud 3 */}
            <motion.div
              animate={{ x: [-15, 25, -15] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/3 left-1/4 w-72 h-28 rounded-full bg-white/30 blur-2xl"
            />
          </div>

          {/* Top Brand Pill inside Card (matching reference '✦ Muin' / TAG) */}
          <div className="relative z-10 w-full flex items-center justify-between text-xs text-white/90 font-medium pb-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-mono text-[11px] font-bold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>Touch And Go · 404 Error</span>
            </div>

            <Link
              href="/login"
              className="px-3.5 py-1 rounded-full bg-white/90 hover:bg-white text-[#141413] font-bold text-xs shadow-xs transition-transform hover:scale-105 active:scale-95"
            >
              Log In
            </Link>
          </div>

          {/* Centerpiece: 4 [Monster] 4 Illustration with Float Physics */}
          <div className="relative z-10 my-4 sm:my-6 flex flex-col items-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative max-w-2xl w-full flex items-center justify-center cursor-pointer group"
            >
              <img
                src="/images/404-illustration-hd.png"
                alt="404 - Fluffy Blue Monster Looking Confused"
                className="w-full max-w-lg sm:max-w-xl object-contain drop-shadow-md select-none pointer-events-none group-hover:scale-102 transition-transform duration-300"
              />
            </motion.div>

            {/* Dynamic Ground Shadow underneath the character */}
            <motion.div
              animate={{ scale: [1, 0.9, 1], opacity: [0.35, 0.2, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-48 sm:w-64 h-5 rounded-full bg-[#141413]/25 blur-md -mt-2"
            />
          </div>

          {/* Typography & Editorial Messaging */}
          <div className="relative z-10 flex flex-col items-center gap-2 max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-[#141413] tracking-tight font-display"
            >
              Oops, I think we&apos;re lost
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="text-sm sm:text-base text-[#5A5850] font-medium leading-relaxed"
            >
              Let&apos;s get you back somewhere familiar...
            </motion.p>

            {/* Primary Action Button (Matching Reference) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="pt-4 flex items-center gap-3 flex-wrap justify-center"
            >
              <Link href="/">
                <button
                  type="button"
                  className="px-6 py-3 rounded-full bg-white hover:bg-[#FAF7F2] text-[#141413] font-extrabold text-xs sm:text-sm border border-[#D0D7DE] hover:border-[#769FCD] shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer group"
                >
                  <ArrowLeft className="w-4 h-4 text-[#141413] group-hover:-translate-x-1 transition-transform" />
                  <span>Back to home</span>
                </button>
              </Link>

              <Link href="/jobs">
                <button
                  type="button"
                  className="px-6 py-3 rounded-full bg-[#141413] hover:bg-[#769FCD] text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Browse Jobs</span>
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* 3. Direct Search Bar (Quick Rescue) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="w-full max-w-2xl bg-white border border-[#E2DDD3] rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xs flex flex-col gap-3"
        >
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] focus-within:border-[#769FCD] focus-within:bg-white transition-all">
              <Search className="w-4 h-4 text-[#769FCD] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Looking for a role, company, or stack? (e.g. React, Python, Remote)..."
                className="w-full bg-transparent text-xs sm:text-sm text-[#141413] placeholder-[#74726A] focus:outline-none font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#141413] hover:bg-[#769FCD] text-white font-extrabold text-xs transition-all cursor-pointer shrink-0 shadow-2xs"
            >
              Search
            </button>
          </form>

          <div className="flex items-center gap-2 flex-wrap text-xs text-[#74726A] px-1">
            <span className="font-mono text-[11px] font-bold uppercase text-[#141413]">
              Popular:
            </span>
            {["Frontend (React)", "Full Stack", "Backend (Python/Go)", "Remote", "Bengaluru"].map(
              (tag) => (
                <Link
                  key={tag}
                  href={`/jobs?q=${encodeURIComponent(tag)}`}
                  className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] hover:bg-white border border-[#E8E2D8] hover:border-[#769FCD] text-[#141413] text-[11px] font-semibold transition-all hover:scale-102"
                >
                  {tag}
                </Link>
              )
            )}
          </div>
        </motion.div>

        {/* 4. Gapless Directory Bento Grid (per gpt-taste) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {/* Bento Card 1: Candidate Portal */}
          <Link
            href="/candidate/dashboard"
            className="group p-5 rounded-2xl bg-white border border-[#E2DDD3] hover:border-[#769FCD] transition-all hover:-translate-y-1 hover:shadow-md shadow-2xs flex flex-col justify-between gap-4"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#D6E6F2]/70 border border-[#B9D7EA] flex items-center justify-center text-[#769FCD] group-hover:scale-110 transition-transform">
                <User className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#74726A] group-hover:text-[#769FCD] group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#141413] group-hover:text-[#769FCD] transition-colors">
                Candidate Workspace
              </h3>
              <p className="text-xs text-[#74726A] mt-1 leading-relaxed">
                Resume studio, profile completeness, and explainable 1-touch applications.
              </p>
            </div>
          </Link>

          {/* Bento Card 2: Curated Opportunities */}
          <Link
            href="/jobs"
            className="group p-5 rounded-2xl bg-white border border-[#E2DDD3] hover:border-[#769FCD] transition-all hover:-translate-y-1 hover:shadow-md shadow-2xs flex flex-col justify-between gap-4"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#D6E6F2]/70 border border-[#B9D7EA] flex items-center justify-center text-[#769FCD] group-hover:scale-110 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#74726A] group-hover:text-[#769FCD] group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#141413] group-hover:text-[#769FCD] transition-colors">
                Marketplace Jobs
              </h3>
              <p className="text-xs text-[#74726A] mt-1 leading-relaxed">
                Explore 85+ verified developer &amp; designer roles with transparent CTC bands.
              </p>
            </div>
          </Link>

          {/* Bento Card 3: Employer Console */}
          <Link
            href="/employer/dashboard"
            className="group p-5 rounded-2xl bg-white border border-[#E2DDD3] hover:border-[#769FCD] transition-all hover:-translate-y-1 hover:shadow-md shadow-2xs flex flex-col justify-between gap-4"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#D6E6F2]/70 border border-[#B9D7EA] flex items-center justify-center text-[#769FCD] group-hover:scale-110 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#74726A] group-hover:text-[#769FCD] group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#141413] group-hover:text-[#769FCD] transition-colors">
                Recruiter Console
              </h3>
              <p className="text-xs text-[#74726A] mt-1 leading-relaxed">
                Hiring command center for active requisitions and applicant pipeline scoring.
              </p>
            </div>
          </Link>
        </motion.div>
      </main>

      {/* 5. Minimal Public Footer */}
      <footer className="w-full border-t border-[#E8E2D8] bg-white py-6 mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#74726A]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#141413]">Touch And Go (TAG)</span>
            <span>·</span>
            <span>India&apos;s Verified Tech Recruitment Marketplace</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#141413] transition-colors">
              Home
            </Link>
            <Link href="/trust-charter" className="hover:text-[#141413] transition-colors">
              Trust &amp; Governance
            </Link>
            <Link href="/privacy" className="hover:text-[#141413] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

