"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  Zap,
  Target,
  ArrowRight,
  FileEdit,
  Send,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  KeyRound,
  Eye,
  FileText,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";
import { useAuth } from "@/lib/auth/AuthContext";

interface ATSFeatureSummaryProps {
  className?: string;
  onSampleScan?: () => void;
}

export function ATSFeatureSummary({ className, onSampleScan }: ATSFeatureSummaryProps) {
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState<string>("fullstack");
  const [isCoverLetterModalOpen, setIsCoverLetterModalOpen] = useState(false);
  const [targetCompany, setTargetCompany] = useState("");
  const [targetRoleInput, setTargetRoleInput] = useState("");
  const [isGeneratingLetter, setIsGeneratingLetter] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const [copiedLetter, setCopiedLetter] = useState(false);

  const candidateName = user?.name || "Ananya Sharma";

  const targetRoles = [
    {
      id: "fullstack",
      title: "Full Stack",
      fullName: "Full Stack Software Engineer",
      minScore: 85,
      percentile: "Top 8%",
      skills: ["TypeScript", "React 19", "Next.js", "Node.js", "PostgreSQL", "Docker"],
    },
    {
      id: "frontend",
      title: "Frontend",
      fullName: "Staff / Lead Frontend Architect",
      minScore: 88,
      percentile: "Top 5%",
      skills: ["React / Next.js", "Core Web Vitals", "TypeScript", "Tailwind CSS"],
    },
    {
      id: "backend",
      title: "Backend",
      fullName: "Distributed Backend Engineer",
      minScore: 82,
      percentile: "Top 10%",
      skills: ["Go / Python", "PostgreSQL", "Microservices", "Kafka / Redis", "Docker"],
    },
    {
      id: "pm",
      title: "Product",
      fullName: "Technical Product Manager",
      minScore: 80,
      percentile: "Top 12%",
      skills: ["Product Roadmaps", "SQL Analytics", "A/B Testing", "Agile Execution"],
    },
  ];

  const activeRoleData = targetRoles.find((r) => r.id === selectedRole) || targetRoles[0];

  const handleGenerateCoverLetter = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingLetter(true);
    await new Promise((r) => setTimeout(r, 650));
    setIsGeneratingLetter(false);

    const letter = `Dear Hiring Team at ${targetCompany || "the company"},

I am writing to express my strong interest in the ${targetRoleInput || "open"} position. With a solid foundation in modern web engineering, clean architecture, and performance-focused application design, I have built and delivered high-velocity digital products matching rigorous technical specifications.

In my recent projects, I focused on building high-conversion experiences, integrating scalable services, and optimizing frontend performance. My experience aligns directly with your team's mission to drive reliable product growth and delightful user experiences.

I welcome the opportunity to discuss how my technical skills and engineering leadership can support your roadmap. Thank you for your time and consideration.

Sincerely,
${candidateName}`;

    setGeneratedLetter(letter);
  };

  const handleCopyLetter = () => {
    if (!generatedLetter) return;
    navigator.clipboard.writeText(generatedLetter);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2000);
  };

  return (
    <div className={cn("flex flex-col gap-5 lg:sticky lg:top-6", className)}>
      {/* 1. Main ATS Diagnostic Companion Card */}
      <div className="relative rounded-3xl bg-white border border-[#B9D7EA] shadow-[0_8px_30px_rgba(26,40,56,0.06)] p-6 sm:p-7 flex flex-col gap-5 overflow-hidden">
        {/* Top Accent Stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#769FCD] via-[#B9D7EA] to-[#1A2838]" />

        {/* Header with Live Calibration Pill */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#769FCD] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#1A2838]"></span>
                </span>
                ATS Intelligence v2.4
              </span>
            </div>
            <h3 className="text-base font-black text-[#1A2838] mt-1 font-display">
              Enterprise ATS Standards
            </h3>
          </div>

          {/* Inspect Sample Report CTA Button */}
          {onSampleScan && (
            <button
              type="button"
              onClick={onSampleScan}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold bg-[#F4F8FB] hover:bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA] shadow-2xs transition-all cursor-pointer hover:border-[#769FCD]"
            >
              <Eye className="w-3.5 h-3.5 text-[#769FCD]" />
              <span>Sample Report</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-[#769FCD] text-white">
                92%
              </span>
            </button>
          )}
        </div>

        {/* 2. Target Role Benchmark Module */}
        <div className="rounded-2xl bg-[#F4F8FB] border border-[#B9D7EA] p-3.5 sm:p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#769FCD]" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1A2838]">
                Role Benchmark
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#1A2838] bg-white px-2 py-0.5 rounded-lg border border-[#B9D7EA]">
              Target: <strong className="text-[#769FCD]">{activeRoleData.minScore}+ / 100</strong>
            </span>
          </div>

          {/* Role selection pills */}
          <div className="grid grid-cols-4 gap-1.5">
            {targetRoles.map((role) => {
              const isActive = role.id === selectedRole;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    "py-1.5 px-2 rounded-xl text-center text-[11px] font-bold transition-all cursor-pointer border",
                    isActive
                      ? "bg-[#1A2838] text-white border-[#1A2838] shadow-2xs"
                      : "bg-white text-[#2C3E50] border-[#B9D7EA] hover:bg-[#D6E6F2]/60 hover:text-[#1A2838]"
                  )}
                >
                  {role.title}
                </button>
              );
            })}
          </div>

          {/* Key ATS Keywords */}
          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
            <span className="text-[10px] font-bold text-[#5A7184]">High-Impact Skills:</span>
            {activeRoleData.skills.map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 rounded-md bg-white border border-[#B9D7EA] text-[10px] font-semibold text-[#1A2838]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* 3. Three Core Evaluation Pillars (Clean, balanced list) */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#F4F8FB] border border-[#B9D7EA]/70">
            <div className="w-8 h-8 rounded-xl bg-white border border-[#B9D7EA] flex items-center justify-center shrink-0 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#1A2838]">
                Clean Machine Parsing (0 Truncation)
              </span>
              <p className="text-[11px] text-[#5A7184] leading-relaxed mt-0.5">
                Standard headings traversed without column fragmentation in Workday, Greenhouse &amp; Lever.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#F4F8FB] border border-[#B9D7EA]/70">
            <div className="w-8 h-8 rounded-xl bg-white border border-[#B9D7EA] flex items-center justify-center shrink-0 shadow-2xs">
              <TrendingUp className="w-4 h-4 text-[#769FCD]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#1A2838]">
                STAR-Method Bullet Impact
              </span>
              <p className="text-[11px] text-[#5A7184] leading-relaxed mt-0.5">
                Measures quantifiable outcome density (% improvements, latency reductions, user scale).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#F4F8FB] border border-[#B9D7EA]/70">
            <div className="w-8 h-8 rounded-xl bg-white border border-[#B9D7EA] flex items-center justify-center shrink-0 shadow-2xs">
              <KeyRound className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#1A2838]">
                Recruiter Keyword Match
              </span>
              <p className="text-[11px] text-[#5A7184] leading-relaxed mt-0.5">
                Flags missing high-frequency tech taxonomy and framework competencies.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Quick Actions Toolbar */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-[#E8E2D8]">
          <Link
            href="/candidate/resume/builder"
            className="h-10 rounded-xl bg-[#F4F8FB] hover:bg-[#D6E6F2] border border-[#B9D7EA] text-[#1A2838] font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs"
          >
            <FileEdit className="w-3.5 h-3.5 text-[#769FCD]" />
            <span>Open Builder</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsCoverLetterModalOpen(true)}
            className="h-10 rounded-xl bg-[#1A2838] hover:bg-[#769FCD] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-[#B9D7EA]" />
            <span>Cover Letter</span>
          </button>
        </div>
      </div>

      {/* Cover Letter Generator Modal */}
      <Modal
        isOpen={isCoverLetterModalOpen}
        onClose={() => setIsCoverLetterModalOpen(false)}
        title="AI Cover Letter Generator"
      >
        <div className="flex flex-col gap-4">
          <p className="text-xs text-[#5A7184]">
            Generate an ATS-formatted cover letter aligned with your verified experience.
          </p>

          <form onSubmit={handleGenerateCoverLetter} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#1A2838] block mb-1">Company</label>
                <input
                  type="text"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  placeholder="e.g. RazorWave Tech"
                  className="w-full px-3 py-2 rounded-xl border border-[#B9D7EA] text-xs text-[#1A2838] focus:border-[#769FCD] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#1A2838] block mb-1">Role</label>
                <input
                  type="text"
                  value={targetRoleInput}
                  onChange={(e) => setTargetRoleInput(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full px-3 py-2 rounded-xl border border-[#B9D7EA] text-xs text-[#1A2838] focus:border-[#769FCD] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isGeneratingLetter}
              className="w-full h-10 rounded-xl bg-[#1A2838] hover:bg-[#769FCD] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              {isGeneratingLetter ? (
                <span>Generating tailored letter...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-[#B9D7EA]" />
                  <span>Generate Cover Letter</span>
                </>
              )}
            </button>
          </form>

          {generatedLetter && (
            <div className="flex flex-col gap-2 pt-2 border-t border-[#E8E2D8]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#1A2838]">Preview Letter</span>
                <button
                  type="button"
                  onClick={handleCopyLetter}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#769FCD] hover:underline cursor-pointer"
                >
                  {copiedLetter ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLetter ? "Copied!" : "Copy Text"}</span>
                </button>
              </div>
              <textarea
                readOnly
                rows={8}
                value={generatedLetter}
                className="w-full p-3 rounded-xl bg-[#F4F8FB] border border-[#B9D7EA] text-xs font-mono text-[#1A2838] resize-none"
              />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
