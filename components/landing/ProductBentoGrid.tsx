"use client";

import React from "react";
import Link from "next/link";
import {
  Zap,
  Lock,
  MessageCircle,
  TrendingUp,
  Sliders,
  Check,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

export function ProductBentoGrid() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F2] text-[#141413] border-b border-[#E8E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E2DDD3] text-[11px] font-mono font-bold text-[#141413] mb-4 shadow-[1px_1px_0px_#141413]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#769FCD]" />
            <span>PRODUCT ADVANTAGES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#141413] leading-tight">
            Why tech professionals choose{" "}
            <span className="relative inline-block px-3.5 py-0.5 rounded-2xl bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA]/60 shadow-[2px_2px_0px_#769FCD]">
              Touch &amp; Go
            </span>
          </h2>
          <p className="text-[#5A5852] font-sans font-normal text-base sm:text-lg mt-4 leading-relaxed">
            Built from the ground up to solve broken recruitment portals in India. Built for speed, transparency, and candidate privacy.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Bento Card 1: Explainable Match Vector (Spans 2 cols) */}
          <div className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between group border border-[#E2DDD3] hover:border-[#769FCD] shadow-[0_4px_24px_rgba(26,40,56,0.06)] hover:shadow-[0_8px_30px_rgba(118,159,205,0.15)] transition-all hover:-translate-y-1">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] group-hover:border-[#769FCD] text-[#769FCD] flex items-center justify-center font-bold shadow-2xs mb-6 group-hover:scale-110 transition-all">
                <Sliders className="w-6 h-6 text-[#769FCD]" />
              </div>
              <span className="text-xs font-mono font-bold text-[#769FCD] uppercase tracking-wider">Explainable AI</span>
              <h3 className="text-2xl font-black text-[#141413] mt-1 mb-3 font-display">Explainable Criteria Matching</h3>
              <p className="text-[#5A5852] text-sm leading-relaxed mb-6 font-sans">
                Never guess why you were rejected or matched. Our multi-vector matching engine scores alignment across technical stack, target CTC, notice period, and preferred work arrangement.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E2D8] text-xs font-bold text-[#141413] space-y-2.5">
              <div className="flex items-center justify-between">
                <span>Tech Stack Vector Fit</span>
                <span className="text-[#769FCD] font-mono">98% Match</span>
              </div>
              <div className="w-full h-2 bg-[#E8E2D8] rounded-full overflow-hidden">
                <div className="h-full bg-[#769FCD]" style={{ width: "98%" }} />
              </div>
              <div className="flex items-center justify-between pt-1">
                <span>CTC Expectation Alignment</span>
                <span className="text-[#141413] font-mono">100% Fit</span>
              </div>
              <div className="w-full h-2 bg-[#E8E2D8] rounded-full overflow-hidden">
                <div className="h-full bg-[#141413]" style={{ width: "100%" }} />
              </div>
            </div>
          </div>

          {/* Bento Card 2: 1-Touch Instant Apply */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between group border border-[#E2DDD3] hover:border-[#769FCD] shadow-[0_4px_24px_rgba(26,40,56,0.06)] hover:shadow-[0_8px_30px_rgba(118,159,205,0.15)] transition-all hover:-translate-y-1">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] group-hover:border-[#769FCD] text-[#769FCD] flex items-center justify-center font-bold shadow-2xs mb-6 group-hover:scale-110 transition-all">
                <Zap className="w-6 h-6 text-[#141413]" />
              </div>
              <span className="text-xs font-mono font-bold text-[#769FCD] uppercase tracking-wider">Zero Friction</span>
              <h3 className="text-xl font-black text-[#141413] mt-1 mb-2 font-display">1-Touch Apply</h3>
              <p className="text-[#5A5852] text-xs leading-relaxed mb-4 font-sans">
                No repeated 20-page forms or resume re-uploads. Apply instantly with your verified structured profile.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-[#141413] bg-[#FAF7F2] p-3 rounded-xl border border-[#E8E2D8]">
              <Check className="w-4 h-4 text-[#769FCD]" />
              <span>Applied in 0.8 seconds</span>
            </div>
          </div>

          {/* Bento Card 3: Privacy Control */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between group border border-[#E2DDD3] hover:border-[#769FCD] shadow-[0_4px_24px_rgba(26,40,56,0.06)] hover:shadow-[0_8px_30px_rgba(118,159,205,0.15)] transition-all hover:-translate-y-1">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] group-hover:border-[#769FCD] text-[#769FCD] flex items-center justify-center font-bold shadow-2xs mb-6 group-hover:scale-110 transition-all">
                <Lock className="w-6 h-6 text-[#769FCD]" />
              </div>
              <span className="text-xs font-mono font-bold text-[#769FCD] uppercase tracking-wider">Candidate Security</span>
              <h3 className="text-xl font-black text-[#141413] mt-1 mb-2 font-display">Stealth Mode</h3>
              <p className="text-[#5A5852] text-xs leading-relaxed mb-4 font-sans">
                Block your existing employer and hide personal contact details until you explicitly accept a recruiter request.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-[#141413] bg-[#FAF7F2] p-3 rounded-xl border border-[#E8E2D8]">
              <ShieldCheck className="w-4 h-4 text-[#769FCD]" />
              <span>Current Company Auto-Blocked</span>
            </div>
          </div>

          {/* Bento Card 4: Direct Founder Outreach */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between group border border-[#E2DDD3] hover:border-[#769FCD] shadow-[0_4px_24px_rgba(26,40,56,0.06)] hover:shadow-[0_8px_30px_rgba(118,159,205,0.15)] transition-all hover:-translate-y-1">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] group-hover:border-[#769FCD] text-[#769FCD] flex items-center justify-center font-bold shadow-2xs mb-6 group-hover:scale-110 transition-all">
                <MessageCircle className="w-6 h-6 text-[#769FCD]" />
              </div>
              <span className="text-xs font-mono font-bold text-[#769FCD] uppercase tracking-wider">Direct Access</span>
              <h3 className="text-xl font-black text-[#141413] mt-1 mb-2 font-display">Direct Founder Chat</h3>
              <p className="text-[#5A5852] text-xs leading-relaxed mb-4 font-sans">
                Connect directly with Engineering Directors, VPs of Tech, and Founders. Skip automated recruiter gatekeepers.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-[#141413] bg-[#FAF7F2] p-3 rounded-xl border border-[#E8E2D8]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#769FCD] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#769FCD]" />
              </span>
              <span>Direct Messenger Enabled</span>
            </div>
          </div>

          {/* Bento Card 5: Real-Time CTC Benchmarks (Spans 3 cols) */}
          <div className="md:col-span-2 lg:col-span-3 bg-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 group border border-[#E2DDD3] hover:border-[#769FCD] shadow-[0_4px_24px_rgba(26,40,56,0.06)] hover:shadow-[0_8px_30px_rgba(118,159,205,0.15)] transition-all hover:-translate-y-1">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#769FCD] uppercase mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>Salaries &amp; Compensation Transparency</span>
              </div>
              <h3 className="text-2xl font-black text-[#141413] mb-2 font-display">Real-Time CTC Market Percentiles</h3>
              <p className="text-[#5A5852] text-sm leading-relaxed max-w-xl font-sans">
                Benchmark your compensation against verified offers in Bengaluru, NCR, Remote, and Mumbai. Employers list non-negotiable salary ranges upfront.
              </p>
            </div>

            <Link
              href="/jobs"
              className="px-6 py-3.5 rounded-xl bg-[#141413] hover:bg-[#769FCD] text-white font-extrabold text-xs sm:text-sm shadow-[2px_2px_0px_#769FCD] flex items-center gap-2 transition-all shrink-0 cursor-pointer active:scale-95 font-sans"
            >
              <span>Explore Salary Data</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
