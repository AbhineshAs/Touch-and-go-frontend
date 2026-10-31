"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ExternalLink } from "lucide-react";

import { TagLogo } from "@/components/ui/TagLogo";

export function Footer() {
  return (
    <footer className="bg-[#1A2838] border-t border-[#769FCD]/20 text-[#D6E6F2]/80 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 flex flex-col gap-4">
            <TagLogo height={42} />
            <p className="text-xs text-[#D6E6F2]/70 leading-relaxed max-w-sm font-medium">
              Touch And Go is an AI-assisted recruitment marketplace connecting tech job seekers with pre-vetted employers across India through structured candidate profiles, 1-touch matching, and transparent salary benchmarks.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D6E6F2] font-semibold bg-black/25 p-3 rounded-xl border border-[#769FCD]/30 w-fit">
              <ShieldCheck className="w-4 h-4 text-[#769FCD]" />
              <span>Verified Partner Network · WhiteTrack Technologies</span>
            </div>
          </div>

          {/* Column 1: Candidates */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">For Candidates</h4>
            <ul className="flex flex-col gap-2.5 text-[#D6E6F2]/70 font-medium">
              <li><Link href="/jobs" className="hover:text-[#B9D7EA] transition-colors">Explore All Jobs</Link></li>
              <li><Link href="/candidate/recommended" className="hover:text-[#B9D7EA] transition-colors">Recommended Matches</Link></li>
              <li><Link href="/candidate/resume" className="hover:text-[#B9D7EA] transition-colors">Upload &amp; Structure Resume</Link></li>
              <li><Link href="/candidate/applications" className="hover:text-[#B9D7EA] transition-colors">Track Applications</Link></li>
            </ul>
          </div>

          {/* Column 2: Companies */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Talent Solutions</h4>
            <ul className="flex flex-col gap-2.5 text-[#D6E6F2]/70 font-medium">
              <li><Link href="/employer/jobs/new" className="hover:text-[#B9D7EA] transition-colors">Post a Role</Link></li>
              <li><Link href="/employer/dashboard" className="hover:text-[#B9D7EA] transition-colors">Applicant Pipelines</Link></li>
              <li><Link href="/employer/verification" className="hover:text-[#B9D7EA] transition-colors">Employer Verification</Link></li>
              <li><Link href="/employer/team" className="hover:text-[#B9D7EA] transition-colors">Team Collaboration</Link></li>
            </ul>
          </div>

          {/* Column 3: Official Sponsors */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#B9D7EA]">Official Sponsors</h4>
            <ul className="flex flex-col gap-2.5 text-[#D6E6F2]/70 font-medium">
              <li>
                <a href="https://www.whitetracktech.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#B9D7EA] transition-colors flex items-center gap-1">
                  <span>WhiteTrack Technologies</span>
                  <ExternalLink className="w-3 h-3 text-[#769FCD]" />
                </a>
              </li>
              <li>
                <a href="https://www.whiteaurax.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#B9D7EA] transition-colors flex items-center gap-1">
                  <span>WhiteAurax</span>
                  <ExternalLink className="w-3 h-3 text-[#769FCD]" />
                </a>
              </li>
              <li>
                <a href="https://zynorixglobal.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#B9D7EA] transition-colors flex items-center gap-1">
                  <span>Zynorix Global</span>
                  <ExternalLink className="w-3 h-3 text-[#769FCD]" />
                </a>
              </li>
              <li>
                <a href="https://www.whitetracktech.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#B9D7EA] transition-colors flex items-center gap-1">
                  <span>Techcy Routes</span>
                  <ExternalLink className="w-3 h-3 text-[#769FCD]" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#D6E6F2]/60 font-medium">
          <p>© {new Date().getFullYear()} WhiteTrack Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/trust" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/trust" className="hover:text-white transition-colors">User Agreement</Link>
            <Link href="/trust" className="hover:text-white transition-colors">Cookie Policy</Link>
            <Link href="/trust" className="hover:text-white transition-colors">Trust Charter</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
