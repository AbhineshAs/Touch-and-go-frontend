"use client";

import React from "react";
import Link from "next/link";
import { FileEdit, UploadCloud, ArrowRight, CheckCircle2, Activity } from "lucide-react";
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
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#141413] font-display">
            Resume Builder
          </h1>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-white text-[#141413] border border-[#E2DDD3] shadow-[1px_1px_0px_#141413]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            ATS Engine v2.4
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#5A5852] font-sans font-normal max-w-2xl leading-relaxed">
          Create an ATS-optimized CV tailored for high-growth tech roles, or import your current resume for instant parsing, keyword gap detection, and scoring.
        </p>
      </div>

      {/* Action Grid: 2 Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* OPTION 1: CREATE NEW CV */}
        <div className="group relative bg-white border border-[#E2DDD3] hover:border-[#769FCD] rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(26,40,56,0.06)] hover:shadow-[0_8px_30px_rgba(118,159,205,0.15)] transition-all duration-200 flex flex-col justify-between hover:-translate-y-1">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] group-hover:border-[#769FCD] flex items-center justify-center text-[#769FCD] group-hover:scale-105 transition-all shadow-2xs">
                <FileEdit className="w-6 h-6 text-[#141413]" />
              </div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-xl bg-[#FAF7F2] text-[#141413] border border-[#E8E2D8] shadow-2xs">
                Start Fresh
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-black text-[#141413] group-hover:text-[#769FCD] transition-colors font-display">
                Create New CV
              </h2>
              <p className="text-xs text-[#5A5852] leading-relaxed font-sans">
                Build a clean, structured ATS-compliant CV using guided section prompts, live A4 formatting, and pre-populated profile data.
              </p>
            </div>

            <ul className="flex flex-col gap-2.5 pt-3 border-t border-[#E8E2D8] text-xs text-[#141413] font-sans">
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
              className="w-full h-11 rounded-xl bg-[#141413] hover:bg-[#769FCD] text-white font-mono font-bold text-xs shadow-md shadow-[#141413]/15 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01]"
            >
              <span>Create New CV</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D6E6F2] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* OPTION 2: IMPORT / CHECK ATS */}
        <div className="group relative bg-white border border-[#E2DDD3] hover:border-[#769FCD] rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(26,40,56,0.06)] hover:shadow-[0_8px_30px_rgba(118,159,205,0.15)] transition-all duration-200 flex flex-col justify-between hover:-translate-y-1">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] group-hover:border-[#769FCD] flex items-center justify-center text-[#769FCD] group-hover:scale-105 transition-all shadow-2xs">
                <UploadCloud className="w-6 h-6 text-[#141413]" />
              </div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-xl bg-[#FAF7F2] text-[#141413] border border-[#E8E2D8] shadow-2xs">
                Use Current CV
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-black text-[#141413] group-hover:text-[#769FCD] transition-colors font-display">
                Import / Check ATS
              </h2>
              <p className="text-xs text-[#5A5852] leading-relaxed font-sans">
                Upload your existing PDF, DOCX, or paste text to evaluate your ATS score, parser compatibility, keyword gaps, and formatting risks.
              </p>
            </div>

            <ul className="flex flex-col gap-2.5 pt-3 border-t border-[#E8E2D8] text-xs text-[#141413] font-sans">
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
              className="w-full h-11 rounded-xl bg-white border border-[#E2DDD3] hover:border-[#769FCD] hover:bg-[#FAF7F2] text-[#141413] font-mono font-bold text-xs shadow-[1px_1px_0px_#141413] flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01]"
            >
              <span>Import &amp; Check ATS</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#769FCD] transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
