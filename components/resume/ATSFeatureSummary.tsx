"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Award,
  BarChart3,
  AlertTriangle,
  KeyRound,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Zap,
  Eye,
  Target,
  ArrowRight,
  Check,
  Copy,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ATSFeatureSummaryProps {
  className?: string;
  onSampleScan?: () => void;
}

export function ATSFeatureSummary({ className, onSampleScan }: ATSFeatureSummaryProps) {
  const [selectedAuditId, setSelectedAuditId] = useState<string | null>("score");
  const [showSamplePreview, setShowSamplePreview] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("fullstack");
  const [copiedRewrite, setCopiedRewrite] = useState(false);

  const targetRoles = [
    {
      id: "fullstack",
      title: "Full Stack",
      fullName: "Full Stack Software Engineer",
      minScore: 85,
      percentile: "Top 8%",
      skills: ["TypeScript", "React 19", "Next.js", "Node.js", "PostgreSQL", "Docker"],
      description: "Focuses on full lifecycle product engineering, API design, and frontend performance.",
    },
    {
      id: "frontend",
      title: "Frontend Lead",
      fullName: "Staff / Lead Frontend Architect",
      minScore: 88,
      percentile: "Top 5%",
      skills: ["React / Next.js", "Core Web Vitals", "State Management", "Tailwind CSS", "Micro-frontends"],
      description: "Evaluates DOM optimization, component scalability, LCP/INP metrics, and responsive UX.",
    },
    {
      id: "backend",
      title: "Backend Architect",
      fullName: "Distributed Backend Engineer",
      minScore: 82,
      percentile: "Top 10%",
      skills: ["Go / Rust", "PostgreSQL", "Microservices", "Kafka / Redis", "Kubernetes", "System Design"],
      description: "Emphasizes database indexing, concurrency, gRPC protocols, and high-throughput pipelines.",
    },
    {
      id: "pm",
      title: "Product Lead",
      fullName: "Technical Product Manager",
      minScore: 80,
      percentile: "Top 12%",
      skills: ["Product Roadmaps", "SQL Analytics", "A/B Testing", "Agile Execution", "GTM Strategy"],
      description: "Highlights cross-functional delivery velocity, retention metrics, and user growth outcomes.",
    },
  ];

  const features = [
    {
      id: "score",
      title: "Overall ATS-Style Score & Grade",
      shortDesc: "Calibrated against Workday, Greenhouse & Lever enterprise algorithms.",
      detailDesc: "Calculates an accurate 0–100 compatibility rating by analyzing document readability, bullet structure, action verb density, and domain term frequency.",
      icon: Award,
      badgeText: "+18% Interview Rate",
      stats: { score: 92, grade: "Grade A", rating: "Fast-Track Eligible" },
    },
    {
      id: "breakdown",
      title: "Section-by-Section Scoring Breakdown",
      shortDesc: "Individual pass ratings for contact info, experience, skills, and formatting.",
      detailDesc: "Provides sub-scores across 5 vital resume sections so you know exactly which section requires metrics polish or structure adjustments.",
      icon: BarChart3,
      badgeText: "5 Deep Audits",
      stats: { score: 94, grade: "5 / 5 Pass", rating: "Zero Deficiencies" },
    },
    {
      id: "risks",
      title: "ATS Risks & Parser Filter Warnings",
      shortDesc: "Detects multi-columns, tables, graphics, or non-standard header names.",
      detailDesc: "Flags formatting choices that cause automated parser truncation or unparsed text blocks before recruiters ever view your application.",
      icon: AlertTriangle,
      badgeText: "Zero Truncation",
      stats: { score: 98, grade: "Clean Parse", rating: "0 Critical Traps" },
    },
    {
      id: "keywords",
      title: "Missing Role Keyword Extraction",
      shortDesc: "Extracts high-frequency technical skills and frameworks absent from your CV.",
      detailDesc: "Cross-references your target job title with thousands of high-ranking recruiter search filters to recommend missing high-impact keywords.",
      icon: KeyRound,
      badgeText: "Recruiter SEO",
      stats: { score: 88, grade: "24 Match", rating: "6 Suggested" },
    },
    {
      id: "rewrites",
      title: "Ready-to-Use AI Bullet Rewrites",
      shortDesc: "AI-suggested bullet improvements with active impact verbs and metrics.",
      detailDesc: "Transforms passive duty statements into high-impact STAR method bullet points featuring quantifiable outcomes and business impact.",
      icon: Sparkles,
      badgeText: "STAR Method",
      stats: { score: 96, grade: "STAR Formatted", rating: "3x Impact" },
    },
  ];

  const activeRoleData = targetRoles.find((r) => r.id === selectedRole) || targetRoles[0];

  const handleCopySampleRewrite = () => {
    const text =
      "Architected high-velocity Next.js user interfaces, reducing core page load latency by 34% across 120,000 monthly active users.";
    navigator.clipboard.writeText(text);
    setCopiedRewrite(true);
    setTimeout(() => setCopiedRewrite(false), 2000);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#D6E6F2]/35 to-white backdrop-blur-xl border border-[#B9D7EA] shadow-[0_12px_35px_-8px_rgba(26,40,56,0.08),0_2px_8px_-1px_rgba(26,40,56,0.04)] p-6 sm:p-7 flex flex-col gap-6",
        className
      )}
    >
      {/* Decorative Top Accent Stripe with #1A2838, #769FCD, #B9D7EA */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1A2838] via-[#769FCD] to-[#B9D7EA]" />

      {/* Ambient Corner Glow in #B9D7EA & #769FCD */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br from-[#769FCD]/20 via-[#B9D7EA]/30 to-transparent blur-2xl" />

      {/* Header & Badges */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#B9D7EA]/70">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA] shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#769FCD] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1A2838]"></span>
              </span>
              ATS Intelligence v2.4
            </span>
            <span className="text-xs font-semibold text-[#769FCD]">•</span>
            <span className="text-xs font-bold text-[#1A2838]/70">
              Workday &amp; Greenhouse Calibrated
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#1A2838] mt-1">
            What You&apos;ll Get
          </h2>
          <p className="text-xs text-[#2C3E50] leading-relaxed font-normal">
            Every scan executes 5 enterprise parser simulations to uncover keyword gaps, format traps, and impact score.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowSamplePreview(!showSamplePreview)}
          className={cn(
            "group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer border shrink-0",
            showSamplePreview
              ? "bg-[#1A2838] text-white border-[#1A2838] shadow-md shadow-[#1A2838]/25 hover:bg-[#2A3E54]"
              : "bg-[#D6E6F2]/70 text-[#1A2838] border-[#B9D7EA] hover:bg-[#B9D7EA] hover:border-[#769FCD]"
          )}
        >
          <Eye className={cn("w-3.5 h-3.5 transition-transform", showSamplePreview ? "scale-110" : "group-hover:scale-110")} />
          <span>{showSamplePreview ? "Hide Live Sample" : "Inspect Sample Report"}</span>
          <span
            className={cn(
              "px-1.5 py-0.2 rounded text-[10px] font-mono font-bold",
              showSamplePreview ? "bg-[#769FCD] text-white" : "bg-[#B9D7EA] text-[#1A2838]"
            )}
          >
            92%
          </span>
        </button>
      </div>

      {/* Target Role Benchmark Switcher (#D6E6F2 / #B9D7EA fill) */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#D6E6F2]/60 via-white to-[#D6E6F2]/40 border border-[#B9D7EA] p-4 sm:p-4.5 flex flex-col gap-3.5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#1A2838] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <Target className="w-4 h-4 text-[#B9D7EA]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1A2838]">
                  Target Role Benchmark
                </span>
                <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#B9D7EA]/60 text-[#1A2838]">
                  {activeRoleData.percentile} Benchmark
                </span>
              </div>
              <p className="text-xs font-bold text-[#1A2838] mt-0.5">
                {activeRoleData.fullName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto bg-white px-3 py-1.5 rounded-xl border border-[#B9D7EA] shadow-2xs">
            <span className="text-[11px] text-[#2C3E50] font-medium">Target Threshold:</span>
            <span className="text-xs font-black text-[#1A2838] font-mono">
              {activeRoleData.minScore}+ / 100
            </span>
          </div>
        </div>

        {/* Role Pills Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {targetRoles.map((role) => {
            const isRoleActive = role.id === selectedRole;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={cn(
                  "px-3 py-2 rounded-xl text-left text-xs font-bold transition-all duration-150 cursor-pointer flex flex-col gap-0.5 border",
                  isRoleActive
                    ? "bg-[#1A2838] border-[#1A2838] text-white shadow-sm ring-2 ring-[#769FCD]/30"
                    : "bg-white/85 border-[#B9D7EA] text-[#1A2838] hover:bg-[#D6E6F2]/60 hover:border-[#769FCD]"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate">{role.title}</span>
                  <span
                    className={cn(
                      "text-[10px] font-mono px-1.5 py-0.2 rounded-md font-extrabold",
                      isRoleActive ? "bg-[#769FCD] text-white" : "bg-[#D6E6F2] text-[#1A2838]"
                    )}
                  >
                    {role.minScore}+
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* High-frequency skills for selected role */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[11px]">
          <span className="text-[#1A2838]/70 font-bold">Critical ATS Keywords:</span>
          {activeRoleData.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded-md bg-white border border-[#B9D7EA] text-[#1A2838] font-semibold text-[10px]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* SAMPLE AUDIT REPORT PANEL (Styled with #1A2838 fill and #769FCD / #B9D7EA accents) */}
      {showSamplePreview && (
        <div className="relative overflow-hidden rounded-2xl bg-[#1A2838] text-white p-5 sm:p-6 border border-[#769FCD]/40 shadow-xl flex flex-col gap-4.5 animate-in fade-in zoom-in-95 duration-200">
          {/* Subtle Ambient Glow in #769FCD */}
          <div className="pointer-events-none absolute -top-10 right-0 w-48 h-48 bg-[#769FCD]/20 rounded-full blur-2xl" />

          {/* Top Banner */}
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#769FCD]/20 border border-[#769FCD]/40 flex items-center justify-center text-[#B9D7EA]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">
                  Simulated Diagnostic Report
                </span>
                <span className="text-[11px] text-[#B9D7EA]">
                  Calibrated for {activeRoleData.fullName}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#769FCD]/25 text-[#B9D7EA] border border-[#769FCD]/40">
                <Check className="w-3 h-3" />
                WORKDAY &amp; GREENHOUSE COMPATIBLE
              </span>
            </div>
          </div>

          {/* 4 Sleek Metric Dials */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Score */}
            <div className="p-3 rounded-xl bg-black/25 border border-[#769FCD]/30 flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-wider text-[#B9D7EA] font-semibold">
                Overall Score
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-black text-white font-mono">92</span>
                <span className="text-xs text-[#B9D7EA] font-medium">/ 100</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#769FCD] h-full rounded-full w-[92%]" />
              </div>
            </div>

            {/* Grade */}
            <div className="p-3 rounded-xl bg-black/25 border border-[#769FCD]/30 flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-wider text-[#B9D7EA] font-semibold">
                ATS Tier Grade
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-black text-[#D6E6F2]">Grade A</span>
              </div>
              <span className="text-[10px] text-[#769FCD] mt-2 font-medium">
                Top 8% of applicants
              </span>
            </div>

            {/* Keywords */}
            <div className="p-3 rounded-xl bg-black/25 border border-[#769FCD]/30 flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-wider text-[#B9D7EA] font-semibold">
                Keyword Density
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-black text-[#D6E6F2] font-mono">24</span>
                <span className="text-xs text-[#B9D7EA] font-medium">/ 26 Match</span>
              </div>
              <span className="text-[10px] text-[#769FCD] mt-2 font-medium">
                92% Taxonomy Coverage
              </span>
            </div>

            {/* Risk Flags */}
            <div className="p-3 rounded-xl bg-black/25 border border-[#769FCD]/30 flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-wider text-[#B9D7EA] font-semibold">
                Parser Safety
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-black text-white">0 Critical</span>
              </div>
              <span className="text-[10px] text-[#769FCD] mt-2 font-medium">
                1 Minor Formatting Flag
              </span>
            </div>
          </div>

          {/* Algorithm Breakdown Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-black/20 border border-[#769FCD]/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#B9D7EA] shrink-0" />
              <span className="text-[#D6E6F2]">Workday: <strong className="text-white">Pass (94%)</strong></span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-black/20 border border-[#769FCD]/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#B9D7EA] shrink-0" />
              <span className="text-[#D6E6F2]">Greenhouse: <strong className="text-white">Pass (90%)</strong></span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-black/20 border border-[#769FCD]/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#B9D7EA] shrink-0" />
              <span className="text-[#D6E6F2]">Lever: <strong className="text-white">Clean Traversal</strong></span>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-black/20 border border-[#769FCD]/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#B9D7EA] shrink-0" />
              <span className="text-[#D6E6F2]">Taleo: <strong className="text-white">Standardized</strong></span>
            </div>
          </div>

          {/* Recruiter Verdict Quote */}
          <div className="p-3.5 rounded-xl bg-black/30 border border-[#769FCD]/30 flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-[#769FCD] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
              AI
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold text-[#B9D7EA] uppercase tracking-wider">
                Recruiter Verdict
              </span>
              <p className="text-xs text-[#D6E6F2] leading-relaxed">
                &ldquo;Candidate profile exceeds the {activeRoleData.minScore}+ benchmark for{" "}
                <strong className="text-white">{activeRoleData.title}</strong>. Clean linear hierarchy with high action-verb density and quantified business impact.&rdquo;
              </p>
            </div>
          </div>

          {onSampleScan && (
            <button
              type="button"
              onClick={onSampleScan}
              className="self-end px-4 py-2 rounded-xl bg-[#769FCD] hover:bg-[#5E8BBF] text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load This Demo Data into Scanner</span>
            </button>
          )}
        </div>
      )}

      {/* 5 INTERACTIVE AUDIT FEATURE CARDS */}
      <div className="flex flex-col gap-3">
        {features.map((feature) => {
          const isSelected = selectedAuditId === feature.id;
          const IconComp = feature.icon;

          return (
            <div
              key={feature.id}
              className={cn(
                "group relative rounded-2xl border transition-all duration-200 overflow-hidden",
                isSelected
                  ? "bg-gradient-to-br from-white via-[#D6E6F2]/30 to-[#D6E6F2]/50 border-[#769FCD] shadow-md shadow-[#769FCD]/10 ring-2 ring-[#769FCD]/20"
                  : "bg-white border-[#B9D7EA]/90 hover:border-[#769FCD] hover:bg-[#D6E6F2]/25 shadow-2xs"
              )}
            >
              {/* Header clickable row */}
              <button
                type="button"
                onClick={() => setSelectedAuditId(isSelected ? null : feature.id)}
                className="w-full text-left p-4 sm:p-4.5 flex items-start justify-between gap-3 cursor-pointer"
              >
                <div className="flex items-start gap-3.5">
                  {/* Theme Gradient Icon Badge */}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs transition-transform duration-200 group-hover:scale-105",
                      isSelected
                        ? "bg-gradient-to-br from-[#1A2838] to-[#769FCD] text-white"
                        : "bg-[#D6E6F2] text-[#1A2838] group-hover:bg-[#B9D7EA]"
                    )}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm font-extrabold text-[#1A2838]">
                        {feature.title}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border shadow-2xs",
                          isSelected
                            ? "bg-[#769FCD] text-white border-[#769FCD]"
                            : "bg-[#D6E6F2] text-[#1A2838] border-[#B9D7EA]"
                        )}
                      >
                        {feature.badgeText}
                      </span>
                    </div>
                    <p className="text-xs text-[#2C3E50] font-normal leading-relaxed">
                      {feature.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-1">
                  <div
                    className={cn(
                      "w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200",
                      isSelected
                        ? "bg-[#1A2838] text-white rotate-90"
                        : "bg-[#D6E6F2] text-[#1A2838] group-hover:bg-[#B9D7EA]"
                    )}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </button>

              {/* EXPANDABLE RICH VISUAL PREVIEW */}
              {isSelected && (
                <div className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 pt-1 border-t border-[#B9D7EA] flex flex-col gap-3 animate-in fade-in duration-200">
                  <p className="text-xs text-[#2C3E50] leading-relaxed font-normal">
                    {feature.detailDesc}
                  </p>

                  {/* 1. Score & Grade Tier Preview */}
                  {feature.id === "score" && (
                    <div className="p-3.5 rounded-xl bg-white border border-[#B9D7EA] flex flex-col gap-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#1A2838]">Algorithm Tier Distribution</span>
                        <span className="text-[#1A2838] font-black font-mono">Sample: 92/100 (Tier 1)</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                        <div className="p-2 rounded-lg bg-[#D6E6F2] border border-[#B9D7EA] text-[#1A2838] font-bold">
                          90–100: Grade A
                          <span className="block text-[10px] font-normal text-[#2C3E50]">Direct Recruiter Queue</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[#D6E6F2]/60 border border-[#B9D7EA] text-[#1A2838] font-bold">
                          80–89: Grade B+
                          <span className="block text-[10px] font-normal text-[#2C3E50]">Competitive Match</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-[#B9D7EA] text-[#1A2838] font-bold">
                          &lt;80: Needs Polish
                          <span className="block text-[10px] font-normal text-[#2C3E50]">Keyword Gap Warning</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. Section-by-Section Progress Bars */}
                  {feature.id === "breakdown" && (
                    <div className="p-3.5 rounded-xl bg-white border border-[#B9D7EA] flex flex-col gap-2.5 text-xs">
                      <span className="font-bold text-[#1A2838]">5 Sub-Audit Pass Rates</span>
                      <div className="flex flex-col gap-2">
                        {[
                          { name: "Contact & Social Links", score: 100, status: "100% Parsed" },
                          { name: "Education & Credentials", score: 95, status: "Verified" },
                          { name: "Technical Competencies", score: 94, status: "18 Matched" },
                          { name: "Work Experience Impact", score: 88, status: "Metrics Present" },
                          { name: "Document Format & Layout", score: 86, status: "Single-Pass Safe" },
                        ].map((sec) => (
                          <div key={sec.name} className="flex flex-col gap-1">
                            <div className="flex justify-between text-[11px]">
                              <span className="text-[#1A2838] font-semibold">{sec.name}</span>
                              <span className="text-[#1A2838] font-mono font-bold">{sec.status} ({sec.score}%)</span>
                            </div>
                            <div className="w-full bg-[#D6E6F2] h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-[#769FCD] to-[#1A2838] h-full rounded-full"
                                style={{ width: `${sec.score}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. ATS Risks Checklist */}
                  {feature.id === "risks" && (
                    <div className="p-3.5 rounded-xl bg-white border border-[#B9D7EA] flex flex-col gap-2 text-xs">
                      <span className="font-bold text-[#1A2838]">Enterprise Parser Traversal Checklist</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-[#D6E6F2]/40 border border-[#B9D7EA]">
                          <CheckCircle2 className="w-4 h-4 text-[#769FCD] shrink-0" />
                          <span className="text-[#1A2838]">Single Column Linear Flow: <strong>Safe</strong></span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-[#D6E6F2]/40 border border-[#B9D7EA]">
                          <CheckCircle2 className="w-4 h-4 text-[#769FCD] shrink-0" />
                          <span className="text-[#1A2838]">UTF-8 Web Safe Typography: <strong>Safe</strong></span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-50 border border-amber-200">
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                          <span className="text-amber-900">Table Structure in Education: <strong>Flattened</strong></span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-[#D6E6F2]/40 border border-[#B9D7EA]">
                          <CheckCircle2 className="w-4 h-4 text-[#769FCD] shrink-0" />
                          <span className="text-[#1A2838]">Standard H1/H2 Section Headings: <strong>Safe</strong></span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4. Missing Keywords Cloud */}
                  {feature.id === "keywords" && (
                    <div className="p-3.5 rounded-xl bg-white border border-[#B9D7EA] flex flex-col gap-2.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1A2838]">Suggested High-Yield Keywords</span>
                        <span className="text-[10px] text-[#769FCD] font-bold">Matched 24 of 30</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-lg bg-[#D6E6F2] text-[#1A2838] font-bold text-[11px] border border-[#B9D7EA] flex items-center gap-1">
                          <Check className="w-3 h-3 text-[#769FCD]" /> React 19
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-[#D6E6F2] text-[#1A2838] font-bold text-[11px] border border-[#B9D7EA] flex items-center gap-1">
                          <Check className="w-3 h-3 text-[#769FCD]" /> TypeScript
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-[#D6E6F2] text-[#1A2838] font-bold text-[11px] border border-[#B9D7EA] flex items-center gap-1">
                          <Check className="w-3 h-3 text-[#769FCD]" /> Next.js
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-[#D6E6F2] text-[#1A2838] font-bold text-[11px] border border-[#B9D7EA] flex items-center gap-1">
                          <Check className="w-3 h-3 text-[#769FCD]" /> Node.js
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-[#769FCD] text-white font-bold text-[11px] flex items-center gap-1 shadow-2xs">
                          + CI/CD Pipelines
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-[#769FCD] text-white font-bold text-[11px] flex items-center gap-1 shadow-2xs">
                          + System Design
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-[#769FCD] text-white font-bold text-[11px] flex items-center gap-1 shadow-2xs">
                          + Jest / TDD
                        </span>
                      </div>
                    </div>
                  )}

                  {/* 5. AI STAR Bullet Rewrites Before/After */}
                  {feature.id === "rewrites" && (
                    <div className="p-3.5 rounded-xl bg-white border border-[#B9D7EA] flex flex-col gap-2.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1A2838]">STAR Method Transformation</span>
                        <span className="text-[10px] font-extrabold text-white bg-[#1A2838] px-2 py-0.5 rounded-md">
                          +34% Impact
                        </span>
                      </div>

                      {/* Before Box */}
                      <div className="p-2.5 rounded-lg bg-[#D6E6F2]/30 border border-[#B9D7EA] flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-[#2C3E50] uppercase tracking-wide">
                          Before (Passive Duty Statement):
                        </span>
                        <p className="text-[11px] text-[#5A7184] italic">
                          &ldquo;Worked on frontend features using React and improved page load times.&rdquo;
                        </p>
                      </div>

                      {/* After Box with #D6E6F2 fill and #769FCD border */}
                      <div className="p-3 rounded-xl bg-[#D6E6F2]/80 border border-[#769FCD] flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-[#1A2838] uppercase tracking-wide flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#769FCD]" />
                            After (Quantified STAR Rewrite):
                          </span>
                          <button
                            type="button"
                            onClick={handleCopySampleRewrite}
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-[#1A2838] hover:bg-[#769FCD] px-2.5 py-1 rounded-lg cursor-pointer shadow-2xs transition-colors"
                          >
                            {copiedRewrite ? (
                              <>
                                <Check className="w-3 h-3 text-[#B9D7EA]" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Bullet</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-[#1A2838] font-bold leading-relaxed">
                          &ldquo;Architected high-velocity Next.js user interfaces, reducing core page load latency by 34% across 120,000 monthly active users.&rdquo;
                        </p>
                        <span className="text-[10px] text-[#2C3E50] font-medium">
                          ✓ Introduces active verb (&ldquo;Architected&rdquo;), exact metric (&ldquo;34%&rdquo;), and production scale (&ldquo;120k MAU&rdquo;).
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer Button with #1A2838 & #769FCD */}
      {onSampleScan && (
        <div className="pt-2 border-t border-[#B9D7EA]">
          <button
            type="button"
            onClick={onSampleScan}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#1A2838] via-[#2A3E54] to-[#1A2838] hover:from-[#141F2C] hover:to-[#223347] text-white font-bold text-xs border border-[#1A2838] shadow-md shadow-[#1A2838]/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <Sparkles className="w-4 h-4 text-[#B9D7EA] group-hover:scale-110 transition-transform" />
            <span>Load Demo Resume Data into Scanner</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B9D7EA] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}
