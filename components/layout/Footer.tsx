"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ExternalLink, ArrowUpRight } from "lucide-react";
import { TagLogo } from "@/components/ui/TagLogo";

export function Footer() {
  return (
    <footer className="bg-[#0E0E0D] border-t border-[#262624] text-[#A8A49C] py-16 lg:py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#262624]">
          {/* Brand & Mission Column (Span 4 on LG) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {/* Logo in high-contrast crisp surface */}
            <div className="bg-white/95 px-3 py-1.5 rounded-xl border border-white/20 shadow-xs inline-flex w-fit">
              <TagLogo height={36} />
            </div>

            <p className="text-sm text-[#A8A49C] leading-relaxed max-w-sm font-normal">
              Touch And Go is an Indian tech recruitment marketplace connecting verified engineers
              and designers directly with tech leadership through explainable match scoring and
              transparent CTC benchmarks.
            </p>

            {/* Verified Network Badge */}
            <div className="flex items-center gap-2.5 text-xs font-mono text-[#D6E6F2] bg-white/[0.04] p-3 rounded-xl border border-white/10 w-fit">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15803D] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#15803D]" />
              </span>
              <ShieldCheck className="w-4 h-4 text-[#769FCD] shrink-0" />
              <span>Verified Partner Network · WhiteTrack Technologies</span>
            </div>
          </div>

          {/* Column 1: For Candidates (Span 2) */}
          <div className="lg:col-span-2 lg:col-start-6 flex flex-col gap-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#FAF9F6]">
              For Candidates
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link
                  href="/jobs"
                  className="hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>Explore All Jobs</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#769FCD]" />
                </Link>
              </li>
              <li>
                <Link
                  href="/candidate/recommended"
                  className="hover:text-white transition-colors"
                >
                  Recommended Matches
                </Link>
              </li>
              <li>
                <Link
                  href="/candidate/resume"
                  className="hover:text-white transition-colors"
                >
                  Upload &amp; Structure Resume
                </Link>
              </li>
              <li>
                <Link
                  href="/candidate/applications"
                  className="hover:text-white transition-colors"
                >
                  Track Applications
                </Link>
              </li>
              <li>
                <Link
                  href="/#product-showcase"
                  className="hover:text-white transition-colors text-xs font-mono text-[#769FCD]"
                >
                  Match Criteria Simulator &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Talent Solutions for Employers (Span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#FAF9F6]">
              Talent Solutions
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link
                  href="/employer/jobs/new"
                  className="hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>Post a Verified Role</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#769FCD]" />
                </Link>
              </li>
              <li>
                <Link
                  href="/employer/dashboard"
                  className="hover:text-white transition-colors"
                >
                  Applicant Pipeline
                </Link>
              </li>
              <li>
                <Link
                  href="/employer/verification"
                  className="hover:text-white transition-colors"
                >
                  Corporate Domain Verification
                </Link>
              </li>
              <li>
                <Link
                  href="/employer/team"
                  className="hover:text-white transition-colors"
                >
                  Engineering Leadership Direct Chat
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-up?role=employer"
                  className="hover:text-white transition-colors text-xs font-mono text-[#769FCD]"
                >
                  Employer Console Access &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Partner Network & Ecosystem (Span 2) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#FAF9F6]">
              Partner Network
            </h4>
            <ul className="flex flex-col gap-3 text-sm font-medium">
              <li>
                <a
                  href="https://www.whitetracktech.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>WhiteTrack Tech</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#769FCD] shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.whiteaurax.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>WhiteAurax Labs</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#769FCD] shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://zynorixglobal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Zynorix Global</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#769FCD] shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.whitetracktech.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Techcy Routes</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#769FCD] shrink-0" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Indian Tech Hubs & Legal Links */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#74726A]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} WhiteTrack Technologies Pvt Ltd.</p>
            <span className="hidden sm:inline text-white/20">•</span>
            <p className="text-[#A8A49C]">
              Built for India&apos;s tech ecosystem · Bengaluru · NCR · Hyderabad
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-xs text-[#A8A49C]">
            <Link href="/trust" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/trust" className="hover:text-white transition-colors">
              User Agreement
            </Link>
            <Link href="/trust" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <Link href="/trust" className="hover:text-white transition-colors">
              Trust Charter
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
