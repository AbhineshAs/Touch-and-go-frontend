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
  Sparkles,
} from "lucide-react";

export function ProductBentoGrid() {
  return (
    <section className="py-20 lg:py-28 bg-[#F4F8FB] text-[#1A2838] border-b border-[#B9D7EA]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D6E6F2] border border-[#B9D7EA] text-xs font-extrabold text-[#1A2838] mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#769FCD]" />
            <span>PRODUCT ADVANTAGES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1A2838] leading-tight">
            Why tech professionals choose{" "}
            <span className="text-[#769FCD]">Touch &amp; Go</span>
          </h2>
          <p className="text-[#1A2838]/70 font-medium text-base sm:text-lg mt-4 leading-relaxed">
            Built from the ground up to solve broken recruitment portals in India. Built for speed, transparency, and candidate privacy.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Bento Card 1: Explainable Match Vector (Spans 2 cols) */}
          <div className="md:col-span-2 bento-card p-6 sm:p-8 flex flex-col justify-between group border border-[#B9D7EA]">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#D6E6F2] border border-[#B9D7EA] text-[#1A2838] flex items-center justify-center font-bold shadow-2xs mb-6 group-hover:scale-110 transition-transform">
                <Sliders className="w-6 h-6 text-[#769FCD]" />
              </div>
              <span className="text-xs font-mono font-bold text-[#769FCD] uppercase tracking-wider">Explainable AI</span>
              <h3 className="text-2xl font-black text-[#1A2838] mt-1 mb-3">Explainable Criteria Matching</h3>
              <p className="text-[#1A2838]/75 text-sm font-medium leading-relaxed mb-6">
                Never guess why you were rejected or matched. Our multi-vector matching engine scores alignment across technical stack, target CTC, notice period, and preferred work arrangement.
              </p>
            </div>

            <div className="bg-[#D6E6F2]/30 p-4 rounded-2xl border border-[#B9D7EA] text-xs font-bold text-[#1A2838] space-y-2.5">
              <div className="flex items-center justify-between">
                <span>Tech Stack Vector Fit</span>
                <span className="text-[#769FCD] font-mono">98% Match</span>
              </div>
              <div className="w-full h-2 bg-[#D6E6F2] rounded-full overflow-hidden">
                <div className="h-full bg-[#769FCD]" style={{ width: "98%" }} />
              </div>
              <div className="flex items-center justify-between pt-1">
                <span>CTC Expectation Alignment</span>
                <span className="text-[#1A2838] font-mono">100% Fit</span>
              </div>
              <div className="w-full h-2 bg-[#D6E6F2] rounded-full overflow-hidden">
                <div className="h-full bg-[#1A2838]" style={{ width: "100%" }} />
              </div>
            </div>
          </div>

          {/* Bento Card 2: 1-Touch Instant Apply */}
          <div className="bento-card p-6 sm:p-8 flex flex-col justify-between group border border-[#B9D7EA]">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#D6E6F2] border border-[#B9D7EA] text-[#769FCD] flex items-center justify-center font-bold shadow-2xs mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-[#1A2838]" />
              </div>
              <span className="text-xs font-mono font-bold text-[#769FCD] uppercase tracking-wider">Zero Friction</span>
              <h3 className="text-xl font-black text-[#1A2838] mt-1 mb-2">1-Touch Apply</h3>
              <p className="text-[#1A2838]/75 text-xs font-medium leading-relaxed mb-4">
                No repeated 20-page forms or resume re-uploads. Apply instantly with your verified structured profile.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-[#1A2838] bg-[#D6E6F2]/50 p-3 rounded-xl border border-[#B9D7EA]">
              <Check className="w-4 h-4 text-[#769FCD]" />
              <span>Applied in 0.8 seconds</span>
            </div>
          </div>

          {/* Bento Card 3: Privacy Control */}
          <div className="bento-card p-6 sm:p-8 flex flex-col justify-between group border border-[#B9D7EA]">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#D6E6F2] border border-[#B9D7EA] text-[#1A2838] flex items-center justify-center font-bold shadow-2xs mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6 text-[#769FCD]" />
              </div>
              <span className="text-xs font-mono font-bold text-[#769FCD] uppercase tracking-wider">Candidate Security</span>
              <h3 className="text-xl font-black text-[#1A2838] mt-1 mb-2">Stealth Mode</h3>
              <p className="text-[#1A2838]/75 text-xs font-medium leading-relaxed mb-4">
                Block your existing employer and hide personal contact details until you explicitly accept a recruiter request.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-[#1A2838] bg-[#D6E6F2]/50 p-3 rounded-xl border border-[#B9D7EA]">
              <ShieldCheck className="w-4 h-4 text-[#769FCD]" />
              <span>Current Company Auto-Blocked</span>
            </div>
          </div>

          {/* Bento Card 4: Direct Founder Outreach */}
          <div className="bento-card p-6 sm:p-8 flex flex-col justify-between group border border-[#B9D7EA]">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#D6E6F2] border border-[#B9D7EA] text-[#1A2838] flex items-center justify-center font-bold shadow-2xs mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-[#769FCD]" />
              </div>
              <span className="text-xs font-mono font-bold text-[#769FCD] uppercase tracking-wider">Direct Access</span>
              <h3 className="text-xl font-black text-[#1A2838] mt-1 mb-2">Direct Founder Chat</h3>
              <p className="text-[#1A2838]/75 text-xs font-medium leading-relaxed mb-4">
                Connect directly with Engineering Directors, VPs of Tech, and Founders. Skip automated recruiter gatekeepers.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-[#1A2838] bg-[#D6E6F2]/50 p-3 rounded-xl border border-[#B9D7EA]">
              <span className="w-2 h-2 rounded-full bg-[#769FCD] animate-ping" />
              <span>Direct Messenger Enabled</span>
            </div>
          </div>

          {/* Bento Card 5: Real-Time CTC Benchmarks (Spans 3 cols) */}
          <div className="md:col-span-2 lg:col-span-3 bento-card p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 group border border-[#B9D7EA]">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#769FCD] uppercase mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>Salaries &amp; Compensation Transparency</span>
              </div>
              <h3 className="text-2xl font-black text-[#1A2838] mb-2">Real-Time CTC Market Percentiles</h3>
              <p className="text-[#1A2838]/75 text-sm font-medium leading-relaxed max-w-xl">
                Benchmark your compensation against verified offers in Bengaluru, NCR, Remote, and Mumbai. Employers list non-negotiable salary ranges upfront.
              </p>
            </div>

            <Link
              href="/jobs"
              className="px-6 py-3.5 rounded-2xl bg-[#1A2838] hover:bg-[#769FCD] text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all shrink-0 cursor-pointer"
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
