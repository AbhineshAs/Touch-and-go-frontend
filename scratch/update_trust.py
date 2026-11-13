import os

trust_page_content = '''"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
import {
  ShieldCheck,
  Lock,
  FileCheck,
  Award,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Terminal,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Building2,
  UserCheck,
  Key,
  Database,
  RefreshCw,
  FileText,
  Scale,
  Zap,
  Check,
  Shield,
  Fingerprint,
  Mail,
  ChevronRight,
} from "lucide-react";

export default function TrustPage() {
  const [stealthRevealed, setStealthRevealed] = useState(false);
  const [activeAuditTab, setActiveAuditTab] = useState<"logs" | "hash">("logs");

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#141413] font-sans selection:bg-[#D6E6F2] selection:text-[#141413]">
      <PublicNavbar />

      {/* 1. HERO CHAPTER (Attention) */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-[#E8E2D8] bg-white overflow-hidden">
        {/* Subtle dot matrix background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D6E6F2] border border-[#B9D7EA] text-xs font-mono font-bold text-[#141413] shadow-xs mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>TRUST, SAFETY &amp; GOVERNANCE CHARTER</span>
          </div>

          {/* H1 Headline (Strict 2-Line Flow) */}
          <h1 className="max-w-5xl text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#141413] font-display leading-[1.1]">
            Our Responsible{" "}
            <span className="text-[#769FCD] font-serif italic font-normal">
              Marketplace Charter
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-[#5A5850] max-w-3xl leading-relaxed font-normal">
            How Touch &amp; Go eliminates recruiter black holes, bans scam job postings,
            guarantees explainable criteria matching, and enforces uncompromised candidate privacy
            across India's tech ecosystem.
          </p>

          {/* Institutional Metrics Rail */}
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[#E8E2D8]">
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8E2D8] flex flex-col items-center text-center">
              <span className="text-3xl font-black font-mono text-[#141413]">100%</span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#74726A] mt-1">
                Verified Entities
              </span>
              <span className="text-[11px] text-[#5A5850] mt-0.5">MCA CIN &amp; GSTIN mandatory</span>
            </div>

            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8E2D8] flex flex-col items-center text-center">
              <span className="text-3xl font-black font-mono text-[#141413]">0 PII</span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#74726A] mt-1">
                Publicly Disclosed
              </span>
              <span className="text-[11px] text-[#5A5850] mt-0.5">Anonymous until 1-Touch accept</span>
            </div>

            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8E2D8] flex flex-col items-center text-center">
              <span className="text-3xl font-black font-mono text-[#769FCD]">DPDP</span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#74726A] mt-1">
                Act 2023 Compliant
              </span>
              <span className="text-[11px] text-[#5A5850] mt-0.5">Instant consent revocation</span>
            </div>

            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8E2D8] flex flex-col items-center text-center">
              <span className="text-3xl font-black font-mono text-[#141413]">SHA-256</span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#74726A] mt-1">
                Immutable Ledger
              </span>
              <span className="text-[11px] text-[#5A5850] mt-0.5">Append-only audit trail</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE GOVERNANCE PILLARS (Interest & Interactive Demonstrations) */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-16">
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#769FCD]">
            Operational Guardrails
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#141413] font-display tracking-tight mt-2">
            The Four Irreducible Commitments
          </h2>
          <p className="text-sm sm:text-base text-[#5A5850] mt-2">
            Engineered into our software architecture, our matching engine, and our terms of service.
          </p>
        </div>

        {/* PILLAR 1: Transparent Criteria Alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 sm:p-10 rounded-3xl border border-[#E2DDD3] shadow-[0_4px_24px_rgba(26,40,56,0.04)]">
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D6E6F2] border border-[#B9D7EA] flex items-center justify-center text-[#141413]">
              <Award className="w-6 h-6 text-[#769FCD]" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#74726A]">
              Commitment 01 · Algorithmic Transparency
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#141413] font-display tracking-tight leading-snug">
              Explainable Matching over Black-Box Scoring
            </h3>
            <p className="text-sm text-[#5A5850] leading-relaxed">
              Standard recruitment portals hide candidates behind proprietary, opaque algorithms that
              arbitrarily discard resumes. On Touch &amp; Go, every match score is mathematically
              explainable, calculated strictly from published mandate criteria.
            </p>

            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8E2D8] flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#141413]">
                <Zap className="w-4 h-4 text-[#769FCD] fill-[#769FCD]" />
                <span>The Core Anti-Penalty Rule:</span>
              </div>
              <p className="text-xs text-[#5A5850] leading-relaxed">
                Unconfirmed data points are <strong className="text-[#141413]">never treated as a penalty</strong>.
                They simply represent items pending verification during direct conversations. No candidate
                is shadow-filtered.
              </p>
            </div>
          </div>

          {/* Visual Interactive Match Inspector */}
          <div className="lg:col-span-6 bg-[#FAF7F2] border border-[#E8E2D8] rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-[#141413]">
                  Vector Criteria Decomposition
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#D6E6F2] text-[#141413] font-mono font-bold text-[11px]">
                88% Vector Fit
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="p-3 bg-white rounded-xl border border-[#E8E2D8] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-[#141413]">Core Stack (React 19, TypeScript)</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Verified In History
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E8E2D8] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-[#141413]">CTC Band Alignment (30-36 LPA)</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  P75 Compliant
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E8E2D8] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Info className="w-4 h-4 text-[#769FCD] shrink-0" />
                  <span className="text-xs font-bold text-[#141413]">Kubernetes Orchestration</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#74726A] bg-[#FAF7F2] px-2 py-0.5 rounded">
                  Pending Chat (Zero Penalty)
                </span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-[#74726A] pt-1 flex items-center justify-between">
              <span>Cosine Sim: 0.8842</span>
              <span>Model: OpenEmbedding-v3-IN</span>
            </div>
          </div>
        </div>

        {/* PILLAR 2: Mandatory Corporate Verification & Zero Scam Policy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 sm:p-10 rounded-3xl border border-[#E2DDD3] shadow-[0_4px_24px_rgba(26,40,56,0.04)]">
          {/* Visual Employer Badge Mockup */}
          <div className="lg:col-span-6 order-2 lg:order-1 bg-[#FAF7F2] border border-[#E8E2D8] rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#769FCD]" />
                <span className="text-xs font-mono font-bold text-[#141413]">
                  Corporate Registry Verification
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">
                GOVERNMENT VERIFIED
              </span>
            </div>

            <div className="bg-white rounded-xl p-4 border border-[#E8E2D8] flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-black text-[#141413]">RazorWave Technologies Pvt Ltd</h4>
                  <p className="text-xs text-[#74726A] font-mono mt-0.5">CIN: U72900KA2021PTC148920</p>
                </div>
                <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8E2D8] text-[11px] font-mono">
                <div>
                  <span className="text-[#74726A] block">GSTIN Status</span>
                  <span className="font-bold text-[#141413]">29AABCR8492Q1Z4 (Active)</span>
                </div>
                <div>
                  <span className="text-[#74726A] block">Domain Verification</span>
                  <span className="font-bold text-[#141413]">@razorwave.in (DNS TXT)</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#D6E6F2]/30 rounded-xl border border-[#B9D7EA] text-[11px] text-[#5A5850]">
              <strong className="text-[#141413]">Zero Agency Rule:</strong> Third-party staffing agencies,
              headhunters without corporate mandates, and unverified broker domains are permanently banned
              from candidate communications.
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D6E6F2] border border-[#B9D7EA] flex items-center justify-center text-[#141413]">
              <ShieldCheck className="w-6 h-6 text-[#769FCD]" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#74726A]">
              Commitment 02 · Anti-Scam Shield
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#141413] font-display tracking-tight leading-snug">
              Mandatory Corporate Domain &amp; Legal Entity Verification
            </h3>
            <p className="text-sm text-[#5A5850] leading-relaxed">
              Every employer registered on Touch &amp; Go undergoes a rigorous three-tier vetting process
              before they can post a role or reach out to candidate pools:
            </p>
            <ul className="flex flex-col gap-2 text-xs text-[#5A5850]">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#769FCD] shrink-0" />
                <span>Ministry of Corporate Affairs (MCA) Certificate of Incorporation validation.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#769FCD] shrink-0" />
                <span>Active GSTIN state registration check.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#769FCD] shrink-0" />
                <span>Corporate domain DNS authentication (no generic @gmail or @outlook addresses).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* PILLAR 3: Candidate Privacy & Consent by Design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 sm:p-10 rounded-3xl border border-[#E2DDD3] shadow-[0_4px_24px_rgba(26,40,56,0.04)]">
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D6E6F2] border border-[#B9D7EA] flex items-center justify-center text-[#141413]">
              <Lock className="w-6 h-6 text-[#769FCD]" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#74726A]">
              Commitment 03 · Candidate Sovereignty
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#141413] font-display tracking-tight leading-snug">
              Stealth Mode &amp; Explicit Consent Architecture
            </h3>
            <p className="text-sm text-[#5A5850] leading-relaxed">
              Your resume belongs to you. Information uploaded to Touch &amp; Go is never broadcasted to
              public databases or recruiters. By default, your identity is shielded behind a cryptographic
              pseudonym until you review a matched employer and choose to initiate contact.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStealthRevealed(!stealthRevealed)}
                className="px-4 py-2 rounded-xl bg-[#141413] hover:bg-[#769FCD] text-white text-xs font-bold transition-all shadow-[2px_2px_0px_#769FCD] flex items-center gap-2 cursor-pointer"
              >
                {stealthRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>Toggle Live Anonymization Preview</span>
              </button>
            </div>
          </div>

          {/* Interactive Stealth vs Revealed Preview Box */}
          <div className="lg:col-span-6 bg-[#FAF7F2] border border-[#E8E2D8] rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
              <span className="text-xs font-mono font-bold text-[#141413]">
                {stealthRevealed ? "Employer View: REVEALED (Post-Accept)" : "Employer View: STEALTH (Default)"}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full font-mono font-bold text-[10px] ${
                  stealthRevealed ? "bg-amber-100 text-amber-900" : "bg-[#D6E6F2] text-[#141413]"
                }`}
              >
                {stealthRevealed ? "CONTACT UNLOCKED" : "100% ANONYMOUS"}
              </span>
            </div>

            <div className="bg-white rounded-xl p-5 border border-[#E8E2D8] flex flex-col gap-3 font-mono text-xs">
              <div className="flex justify-between py-1 border-b border-[#FAF7F2]">
                <span className="text-[#74726A]">Full Name:</span>
                <span className="font-bold text-[#141413]">
                  {stealthRevealed ? "Arjun Krishnan" : "Candidate #774-BLR"}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#FAF7F2]">
                <span className="text-[#74726A]">Current Employer:</span>
                <span className="font-bold text-[#141413]">
                  {stealthRevealed ? "Fintech Unicorn (Bengaluru)" : "Tier-1 Payment Gateway (Hidden)"}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#FAF7F2]">
                <span className="text-[#74726A]">Direct Phone / WhatsApp:</span>
                <span className="font-bold text-[#141413]">
                  {stealthRevealed ? "+91 98765 43210" : "•••••••••• (Locked until 1-Touch Apply)"}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#74726A]">Core Verified Skillset:</span>
                <span className="font-bold text-[#769FCD]">
                  React 19, TypeScript, Distributed Go (Public)
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#74726A] italic">
              Notice how all personally identifiable information remains encrypted and invisible to employers
              until the candidate triggers a mutual match request.
            </p>
          </div>
        </div>

        {/* PILLAR 4: Immutable Audit Trail & Anti-Scraping Defenses */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 sm:p-10 rounded-3xl border border-[#E2DDD3] shadow-[0_4px_24px_rgba(26,40,56,0.04)]">
          {/* Terminal Audit Log Simulation */}
          <div className="lg:col-span-6 order-2 lg:order-1 bg-[#141413] text-white rounded-2xl p-6 border border-[#2A2A28] flex flex-col gap-3 font-mono text-xs shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2A28]">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#769FCD]" />
                <span className="font-bold text-white text-[11px]">AUDIT_LOG_STREAM // IMMUTABLE</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                LIVE LEDGER
              </span>
            </div>

            <div className="flex flex-col gap-2 py-1 text-[11px] text-[#A0A09B] font-mono leading-relaxed overflow-x-auto">
              <p>
                <span className="text-[#769FCD]">[11:54:02 IST]</span> APPL_EVENT: Candidate #774 initiated match
                with RazorWave. Hash: <span className="text-white">8a3f...c912</span>
              </p>
              <p>
                <span className="text-[#769FCD]">[11:54:03 IST]</span> CONSENT_PROOF: Explicit PII unlock signed
                with candidate token.
              </p>
              <p>
                <span className="text-[#769FCD]">[11:54:04 IST]</span> BOT_DEFENSE: Rate-limit guard evaluated 0
                abnormal bot fingerprints. Status: 200 OK.
              </p>
              <p>
                <span className="text-emerald-400">[11:54:05 IST]</span> AUDIT_BLOCK_COMMITTED: Ledger sequence
                #1,492,028 verified.
              </p>
            </div>

            <div className="pt-2 border-t border-[#2A2A28] flex items-center justify-between text-[10px] text-[#74726A]">
              <span>Append-Only · Tamper-Evident</span>
              <span>TLS 1.3 · AES-256</span>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D6E6F2] border border-[#B9D7EA] flex items-center justify-center text-[#141413]">
              <FileCheck className="w-6 h-6 text-[#769FCD]" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#74726A]">
              Commitment 04 · Cryptographic Integrity
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#141413] font-display tracking-tight leading-snug">
              Immutable Audit Logs &amp; Anti-Scraping Defenses
            </h3>
            <p className="text-sm text-[#5A5850] leading-relaxed">
              Every status change, profile view request, employer authorization, and application progression is
              written to an append-only ledger. No party—not even platform administrators—can quietly alter
              consent records or erase dispute traces.
            </p>
            <p className="text-sm text-[#5A5850] leading-relaxed">
              Furthermore, aggressive Cloudflare Enterprise rate-limiting and browser-fingerprint detection
              stop automated bot networks from scraping developer identities across India.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CANDIDATE BILL OF RIGHTS (Desire & Clarity) */}
      <section className="py-20 lg:py-24 bg-white border-y border-[#E8E2D8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#769FCD]">
              Uncompromising Guarantees
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#141413] font-display tracking-tight mt-2">
              The Candidate Bill of Rights
            </h2>
            <p className="text-sm sm:text-base text-[#5A5850] mt-2">
              Every engineer and tech leader on Touch &amp; Go is entitled to these five non-negotiable rights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E2D8] flex items-center justify-center text-[#141413] font-mono font-black text-sm">
                01
              </div>
              <h4 className="text-base font-black text-[#141413] font-display">
                Right to Upfront Salary Transparency
              </h4>
              <p className="text-xs text-[#5A5850] leading-relaxed">
                No &quot;competitive salary&quot; bait-and-switch. Every listing on Touch &amp; Go must
                publish verified CTC bands in INR before candidates review or apply.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E2D8] flex items-center justify-center text-[#141413] font-mono font-black text-sm">
                02
              </div>
              <h4 className="text-base font-black text-[#141413] font-display">
                Right to Continuous Stealth
              </h4>
              <p className="text-xs text-[#5A5850] leading-relaxed">
                Your current employer will never see you actively job-hunting. Your contact details remain
                shielded until you choose to accept an interview invitation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E2D8] flex items-center justify-center text-[#141413] font-mono font-black text-sm">
                03
              </div>
              <h4 className="text-base font-black text-[#141413] font-display">
                Right to Instant Data Erasure
              </h4>
              <p className="text-xs text-[#5A5850] leading-relaxed">
                Under India&apos;s DPDP Act 2023, you can delete your profile, parsed CV tokens, and
                communication history in a single click with zero retention backdoors.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E2D8] flex items-center justify-center text-[#141413] font-mono font-black text-sm">
                04
              </div>
              <h4 className="text-base font-black text-[#141413] font-display">
                Right to Algorithmic Explanation
              </h4>
              <p className="text-xs text-[#5A5850] leading-relaxed">
                If a match score is calculated, you have the right to inspect the exact vector overlap
                and understand why your profile matched or fell short of specific requirements.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E2D8] flex items-center justify-center text-[#141413] font-mono font-black text-sm">
                05
              </div>
              <h4 className="text-base font-black text-[#141413] font-display">
                Right to Cold-Recruiter Immunity
              </h4>
              <p className="text-xs text-[#5A5850] leading-relaxed">
                Third-party agency headhunters cannot message you. Only verified corporate decision-makers
                at registered entities with active mandates can initiate contact.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141413] text-white border border-[#2A2A28] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#769FCD]">
                  Governance Oversight
                </span>
                <h4 className="text-base font-black text-white font-display mt-1">
                  Enforce Your Rights
                </h4>
                <p className="text-xs text-[#A0A09B] leading-relaxed mt-2">
                  Encountered an employer misrepresenting salary or violating charter terms? Our governance team
                  resolves reports within 24 business hours.
                </p>
              </div>
              <a
                href="mailto:governance@touchandgo.in"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#769FCD] hover:underline"
              >
                <span>Report an Infraction</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REGULATORY ALIGNMENT & SECURITY STANDARDS */}
      <section className="py-20 lg:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#FAF7F2] border border-[#E8E2D8] rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#769FCD]">
              National Regulatory Compliance
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#141413] font-display tracking-tight">
              Built for India&apos;s Digital Economy
            </h3>
            <p className="text-sm text-[#5A5850] leading-relaxed">
              Touch &amp; Go adheres strictly to the Digital Personal Data Protection (DPDP) Act 2023, the
              Information Technology Act 2000, and Cert-In cybersecurity directives. All candidate data
              resides exclusively in verified Indian AWS/GCP regions (ap-south-1 Mumbai).
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto shrink-0">
            <div className="bg-white p-4 rounded-xl border border-[#E8E2D8] flex flex-col gap-1">
              <span className="text-xs font-mono font-bold text-[#141413]">DPDP Act 2023</span>
              <span className="text-[11px] text-[#74726A]">Consent Manager Compliant</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E8E2D8] flex flex-col gap-1">
              <span className="text-xs font-mono font-bold text-[#141413]">MCA-21 Gateway</span>
              <span className="text-[11px] text-[#74726A]">Corporate CIN Validation</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E8E2D8] flex flex-col gap-1">
              <span className="text-xs font-mono font-bold text-[#141413]">AES-256 Bit</span>
              <span className="text-[11px] text-[#74726A]">Encryption At Rest</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#E8E2D8] flex flex-col gap-1">
              <span className="text-xs font-mono font-bold text-[#141413]">TLS 1.3</span>
              <span className="text-[11px] text-[#74726A]">End-to-End Transport Security</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GOVERNANCE INQUIRIES & DISPUTE REPORTING (Action) */}
      <section className="pb-24 pt-4 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#141413] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#2A2A28] shadow-xl">
          <div className="flex flex-col gap-2 max-w-xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#769FCD]">
              Governance Office &amp; Data Protection Officer
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
              Questions regarding security, privacy, or employer verification?
            </h3>
            <p className="text-xs sm:text-sm text-[#A0A09B] leading-relaxed">
              Reach out to our Data Protection Officer (DPO) and Trust &amp; Safety board. We respond to all
              compliance requests and audit inquiries within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href="mailto:trust@touchandgo.in"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#141413] font-extrabold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Mail className="w-4 h-4 text-[#769FCD]" />
              <span>Contact DPO Office</span>
            </a>

            <Link
              href="/jobs"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#769FCD] hover:bg-[#5E8BBF] text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_rgba(255,255,255,0.2)]"
            >
              <span>Explore Verified Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
'''

with open(r'k:\claude\Touch-and-go-frontend\app\trust\page.tsx', 'w', encoding='utf-8') as f:
    f.write(trust_page_content)
print("Successfully generated app/trust/page.tsx")

