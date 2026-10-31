"use client";

import React from "react";
import Link from "next/link";
import { FileEdit, UploadCloud, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumeModeSelectorProps {
  onSelectMode?: (mode: "builder" | "ats") => void;
  activeMode?: "overview" | "builder" | "ats";
  className?: string;
}

export function ResumeModeSelector({
  onSelectMode,
  activeMode = "overview",
  className,
}: ResumeModeSelectorProps) {
  return (
    <div className={cn("w-full flex flex-col gap-6", className)}>
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1A2838]">
            Resume Builder
          </h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA]">
            <Sparkles className="w-3 h-3 text-[#1A2838]" />
            ATS Engine v2.4
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#2C3E50] font-normal max-w-2xl leading-relaxed">
          Create an ATS-optimized CV tailored for high-growth tech roles, or import your current resume for instant parsing, keyword gap detection, and scoring.
        </p>
      </div>

      {/* Action Grid: 2 Selection Cards with #D6E6F2 / #B9D7EA / #769FCD / #1A2838 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* OPTION 1: CREATE NEW CV */}
        <div className="group relative bg-white border border-[#B9D7EA] hover:border-[#769FCD] rounded-3xl p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(26,40,56,0.06)] hover:shadow-[0_12px_32px_-8px_rgba(118,159,205,0.2)] transition-all duration-200 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="w-13 h-13 rounded-2xl bg-[#D6E6F2] border border-[#B9D7EA] flex items-center justify-center text-[#1A2838] group-hover:scale-105 transition-transform">
                <FileEdit className="w-6 h-6 text-[#1A2838]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA]">
                Start Fresh
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-black text-[#1A2838] group-hover:text-[#769FCD] transition-colors">
                Create New CV
              </h2>
              <p className="text-xs text-[#2C3E50] leading-relaxed">
                Build a clean, structured ATS-compliant CV using guided section prompts, live A4 formatting, and pre-populated profile data.
              </p>
            </div>

            <ul className="flex flex-col gap-2 pt-2 border-t border-[#B9D7EA]/60 text-xs text-[#1A2838]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#769FCD] shrink-0" />
                <span>Single &amp; two-column ATS-tested layouts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#769FCD] shrink-0" />
                <span>Live preview &amp; 1-click printable PDF</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#769FCD] shrink-0" />
                <span>Syncs directly with your candidate profile</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-auto">
            <Link
              href="/candidate/resume/builder"
              className="w-full h-11 rounded-xl bg-[#1A2838] hover:bg-[#769FCD] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Create New CV</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B9D7EA]" />
            </Link>
          </div>
        </div>

        {/* OPTION 2: IMPORT / CHECK ATS */}
        <div className="group relative bg-white border border-[#B9D7EA] hover:border-[#769FCD] rounded-3xl p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(26,40,56,0.06)] hover:shadow-[0_12px_32px_-8px_rgba(118,159,205,0.2)] transition-all duration-200 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="w-13 h-13 rounded-2xl bg-[#D6E6F2] border border-[#B9D7EA] flex items-center justify-center text-[#769FCD] group-hover:scale-105 transition-transform">
                <UploadCloud className="w-6 h-6 text-[#1A2838]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#B9D7EA]/60 text-[#1A2838] border border-[#B9D7EA]">
                Use Current CV
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-black text-[#1A2838] group-hover:text-[#769FCD] transition-colors">
                Import / Check ATS
              </h2>
              <p className="text-xs text-[#2C3E50] leading-relaxed">
                Upload your existing PDF, DOCX, or paste text to evaluate your ATS score, parser compatibility, keyword gaps, and formatting risks.
              </p>
            </div>

            <ul className="flex flex-col gap-2 pt-2 border-t border-[#B9D7EA]/60 text-xs text-[#1A2838]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#769FCD] shrink-0" />
                <span>Instant 0–100 ATS compatibility grade</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#769FCD] shrink-0" />
                <span>Role keyword &amp; skill gap diagnosis</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#769FCD] shrink-0" />
                <span>Actionable rewrite recommendations</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-auto">
            <button
              type="button"
              onClick={() => onSelectMode?.("ats")}
              className="w-full h-11 rounded-xl bg-white border-2 border-[#1A2838] hover:bg-[#D6E6F2] active:bg-[#B9D7EA] text-[#1A2838] font-bold text-xs shadow-2xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Import &amp; Check ATS</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#769FCD]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
