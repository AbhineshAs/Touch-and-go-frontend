"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileEdit, Sparkles, Send, X, CheckCircle2, Copy, ArrowRight, Zap, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";

interface ATSQuickActionsProps {
  className?: string;
  onOpenCoverLetter?: () => void;
}

export function ATSQuickActions({ className }: ATSQuickActionsProps) {
  const [isCoverLetterModalOpen, setIsCoverLetterModalOpen] = useState(false);
  const [targetCompany, setTargetCompany] = useState("");
  const [targetRole, setTargetRole] = useState("Full Stack Software Engineer");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerateCoverLetter = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 650));
    setIsGenerating(false);

    const letter = `Dear Hiring Team at ${targetCompany || "the company"},

I am writing to express my strong interest in the ${targetRole} position. With a solid foundation in modern web engineering, clean architecture, and performance-focused application design, I have built and delivered high-velocity digital products matching rigorous technical specifications.

In my recent projects, I focused on building high-conversion experiences, integrating RESTful services, and optimizing frontend performance. My experience aligns well with your team's mission to drive scalable product growth and delightful user experiences.

I welcome the opportunity to discuss how my technical skills and work ethic can support your goals. Thank you for your time and consideration.

Sincerely,
Candidate (Touch And Go Verified)`;

    setGeneratedLetter(letter);
  };

  const handleCopy = () => {
    if (!generatedLetter) return;
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#D6E6F2]/35 to-white backdrop-blur-xl border border-[#B9D7EA] shadow-[0_12px_35px_-8px_rgba(26,40,56,0.08),0_2px_8px_-1px_rgba(26,40,56,0.04)] p-6 sm:p-7 flex flex-col gap-5",
          className
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1A2838]">
              One-Click Acceleration
            </span>
            <h3 className="text-base font-extrabold text-[#1A2838]">
              Quick Actions
            </h3>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA]">
            <Zap className="w-3 h-3 text-[#1A2838]" />
            Instant Tools
          </span>
        </div>

        <p className="text-xs text-[#2C3E50] font-normal leading-relaxed">
          Create an ATS-formatted CV or instantly generate a tailored cover letter aligned with your verified skills.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Action 1: Update Resume (#1A2838 fill) */}
          <Link
            href="/candidate/resume/builder"
            className="group relative overflow-hidden py-3 px-4 rounded-2xl bg-[#1A2838] hover:bg-[#2A3E54] text-white font-bold text-xs shadow-md shadow-[#1A2838]/20 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
          >
            <FileEdit className="w-4 h-4 text-[#B9D7EA] transition-transform group-hover:scale-110" />
            <span>Update Resume</span>
          </Link>

          {/* Action 2: Create Cover Letter (#769FCD fill) */}
          <button
            type="button"
            onClick={() => setIsCoverLetterModalOpen(true)}
            className="group relative overflow-hidden py-3 px-4 rounded-2xl bg-[#769FCD] hover:bg-[#5E8BBF] text-white font-bold text-xs shadow-md shadow-[#769FCD]/20 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-white transition-transform group-hover:scale-110" />
            <span>Create Cover Letter</span>
          </button>
        </div>
      </div>

      {/* Cover Letter Modal */}
      {isCoverLetterModalOpen && (
        <Modal
          isOpen={isCoverLetterModalOpen}
          onClose={() => {
            setIsCoverLetterModalOpen(false);
            setGeneratedLetter(null);
          }}
          title="Instant Cover Letter Generator"
          description="Generate an ATS-tailored cover letter aligned with your resume experience"
          size="lg"
        >
          <div className="flex flex-col gap-4 text-xs">
            {!generatedLetter ? (
              <form onSubmit={handleGenerateCoverLetter} className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-[#1A2838]">Target Role Title</label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    required
                    className="h-10 px-3 rounded-xl border border-[#B9D7EA] text-xs text-[#1A2838] focus:border-[#769FCD] focus:outline-none focus:ring-2 focus:ring-[#769FCD]/20 shadow-2xs"
                    placeholder="e.g. Senior Frontend Developer"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-[#1A2838]">Company Name (Optional)</label>
                  <input
                    type="text"
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    className="h-10 px-3 rounded-xl border border-[#B9D7EA] text-xs text-[#1A2838] focus:border-[#769FCD] focus:outline-none focus:ring-2 focus:ring-[#769FCD]/20 shadow-2xs"
                    placeholder="e.g. Acme Tech Global"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full h-11 mt-2 rounded-xl bg-[#1A2838] hover:bg-[#769FCD] text-white font-bold text-xs shadow-md shadow-[#1A2838]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#B9D7EA]" />
                  <span>{isGenerating ? "Drafting Cover Letter..." : "Generate Tailored Letter"}</span>
                </button>
              </form>
            ) : (
              <div className="flex flex-col gap-3.5">
                <div className="p-4 rounded-2xl bg-[#D6E6F2]/30 border border-[#B9D7EA] font-sans text-xs leading-relaxed text-[#1A2838] whitespace-pre-wrap max-h-72 overflow-y-auto shadow-inner">
                  {generatedLetter}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setGeneratedLetter(null)}
                    className="text-xs font-semibold text-[#2C3E50] hover:text-[#1A2838] cursor-pointer"
                  >
                    ← Edit Details
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-4 py-2 rounded-xl bg-[#1A2838] hover:bg-[#769FCD] text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#B9D7EA]" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Cover Letter</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
