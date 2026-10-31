"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  RotateCcw,
  FileEdit,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ATSReportData {
  overallScore: number;
  grade: string;
  verdict: string;
  sourceName?: string;
  breakdown: {
    contact: { score: number; status: "good" | "warning" | "risk"; notes: string };
    experience: { score: number; status: "good" | "warning" | "risk"; notes: string };
    skills: { score: number; status: "good" | "warning" | "risk"; notes: string };
    education: { score: number; status: "good" | "warning" | "risk"; notes: string };
    formatting: { score: number; status: "good" | "warning" | "risk"; notes: string };
  };
  risks: {
    title: string;
    description: string;
    severity: "high" | "medium" | "low";
  }[];
  missingKeywords: string[];
  rewrites: {
    section: string;
    original: string;
    improved: string;
    rationale: string;
  }[];
}

interface ATSScoreReportProps {
  report: ATSReportData;
  onReset: () => void;
  className?: string;
}

export function ATSScoreReport({ report, onReset, className }: ATSScoreReportProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyRewrite = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Top Banner Card: Overall Score & Assessment */}
      <div className="bg-white border border-[#B9D7EA] rounded-3xl p-6 sm:p-8 shadow-[0_12px_35px_-8px_rgba(26,40,56,0.08)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 sm:gap-6">
          {/* Radial-like Score Circle with #1A2838 & #769FCD */}
          <div className="w-22 h-22 sm:w-26 sm:h-26 rounded-full border-4 border-[#769FCD] flex flex-col items-center justify-center bg-[#D6E6F2]/40 shadow-inner shrink-0 text-[#1A2838]">
            <span className="text-2xl sm:text-3xl font-black tracking-tight">
              {report.overallScore}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#2C3E50]">
              / 100
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-black bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA]">
                Grade {report.grade}
              </span>
              <span className="text-xs font-semibold text-[#5A7184]">
                {report.sourceName ? `Audited: ${report.sourceName}` : "Audited Input"}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#1A2838]">
              {report.verdict}
            </h2>
            <p className="text-xs text-[#2C3E50] max-w-md leading-relaxed">
              Your resume matches modern Workday, Greenhouse, and Lever parsing heuristics. Resolve the high-priority keyword and metric items below to boost interview calls.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto">
          <button
            type="button"
            onClick={onReset}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-xl border border-[#B9D7EA] hover:bg-[#D6E6F2]/60 text-[#1A2838] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#1A2838]" />
            <span>Scan Another</span>
          </button>
          <Link
            href="/candidate/resume/builder"
            className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-[#1A2838] hover:bg-[#769FCD] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <FileEdit className="w-3.5 h-3.5 text-[#B9D7EA]" />
            <span>Open in Builder</span>
          </Link>
        </div>
      </div>

      {/* Grid: Breakdown + Risks & Missing Keywords */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Section-by-Section Scoring */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white border border-[#B9D7EA] rounded-3xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-base font-black text-[#1A2838] pb-2 border-b border-[#B9D7EA]/60">
              Section Scoring Breakdown
            </h3>

            <div className="flex flex-col gap-4">
              <SectionBreakdownItem
                label="Contact Info & Links"
                score={report.breakdown.contact.score}
                status={report.breakdown.contact.status}
                notes={report.breakdown.contact.notes}
              />
              <SectionBreakdownItem
                label="Work Experience & Impact"
                score={report.breakdown.experience.score}
                status={report.breakdown.experience.status}
                notes={report.breakdown.experience.notes}
              />
              <SectionBreakdownItem
                label="Technical Skills & Taxonomy"
                score={report.breakdown.skills.score}
                status={report.breakdown.skills.status}
                notes={report.breakdown.skills.notes}
              />
              <SectionBreakdownItem
                label="Education & Credentials"
                score={report.breakdown.education.score}
                status={report.breakdown.education.status}
                notes={report.breakdown.education.notes}
              />
              <SectionBreakdownItem
                label="Layout & Machine Parsing Safety"
                score={report.breakdown.formatting.score}
                status={report.breakdown.formatting.status}
                notes={report.breakdown.formatting.notes}
              />
            </div>
          </div>

          {/* Actionable Bullet Rewrites */}
          <div className="bg-white border border-[#B9D7EA] rounded-3xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#B9D7EA]/60">
              <h3 className="text-base font-black text-[#1A2838]">
                Actionable Bullet Rewrites
              </h3>
              <span className="text-[11px] font-bold text-[#1A2838] bg-[#D6E6F2] px-2.5 py-0.5 rounded-full border border-[#B9D7EA]">
                AI Impact Polish
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {report.rewrites.map((rw, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#D6E6F2]/30 border border-[#B9D7EA] flex flex-col gap-2.5">
                  <span className="text-[11px] font-black text-[#1A2838] uppercase tracking-wide">
                    {rw.section}
                  </span>

                  <div className="flex flex-col gap-1 text-xs">
                    <span className="text-[#5A7184] font-medium line-through">
                      &quot;{rw.original}&quot;
                    </span>
                    <span className="text-[#1A2838] font-bold bg-white p-2.5 rounded-xl border border-[#769FCD]">
                      &quot;{rw.improved}&quot;
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-[#2C3E50] italic">
                      Why: {rw.rationale}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyRewrite(rw.improved, idx)}
                      className="px-3 py-1.5 rounded-lg bg-[#1A2838] text-white hover:bg-[#769FCD] font-semibold text-[11px] flex items-center gap-1 cursor-pointer transition-colors shrink-0 shadow-2xs"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3 h-3 text-[#B9D7EA]" />
                          <span className="text-[#B9D7EA]">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[#B9D7EA]" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): ATS Risks & Missing Keywords */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Missing Keywords Card */}
          <div className="bg-white border border-[#B9D7EA] rounded-3xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#B9D7EA]/60">
              <h3 className="text-base font-black text-[#1A2838]">
                Missing Keywords
              </h3>
              <span className="text-[11px] font-bold text-white bg-[#769FCD] px-2.5 py-0.5 rounded-full">
                Boost Matches
              </span>
            </div>
            <p className="text-xs text-[#2C3E50]">
              Recruiter searches prioritize these competencies for your target profile. Integrate them into your experience bullets:
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {report.missingKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#D6E6F2] text-[#1A2838] hover:bg-[#B9D7EA] border border-[#B9D7EA] transition-colors cursor-default"
                >
                  + {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Identified ATS Risks Card */}
          <div className="bg-white border border-[#B9D7EA] rounded-3xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#B9D7EA]/60">
              <h3 className="text-base font-black text-[#1A2838]">
                Identified ATS Risks
              </h3>
              <span className="text-[11px] font-bold text-[#1A2838] bg-[#D6E6F2] px-2.5 py-0.5 rounded-full border border-[#B9D7EA]">
                {report.risks.length} Items Flagged
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {report.risks.map((risk, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl border border-[#B9D7EA] bg-[#D6E6F2]/30 flex flex-col gap-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1A2838]">{risk.title}</span>
                    <span
                      className={cn(
                        "text-[10px] font-black uppercase px-2 py-0.5 rounded-full",
                        risk.severity === "high"
                          ? "bg-rose-100 text-rose-700 border border-rose-200"
                          : risk.severity === "medium"
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA]"
                      )}
                    >
                      {risk.severity} Risk
                    </span>
                  </div>
                  <p className="text-[11px] text-[#2C3E50] leading-relaxed font-normal">
                    {risk.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionBreakdownItem({
  label,
  score,
  status,
  notes,
}: {
  label: string;
  score: number;
  status: "good" | "warning" | "risk";
  notes: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-[#1A2838]">{label}</span>
        <span className="text-[#1A2838] font-bold font-mono">{score}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-[#D6E6F2] overflow-hidden">
        <div
          className="h-full transition-all duration-500 bg-gradient-to-r from-[#769FCD] to-[#1A2838]"
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-[11px] text-[#2C3E50] font-normal">{notes}</span>
    </div>
  );
}
