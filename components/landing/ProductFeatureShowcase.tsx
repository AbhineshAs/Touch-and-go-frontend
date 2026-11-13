"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Zap,
  SlidersHorizontal,
  ShieldCheck,
  TrendingUp,
  Building2,
  CheckCircle2,
  ArrowRight,
  Lock,
  EyeOff,
  UserCheck,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { playTactileChime } from "@/lib/sound/chime";
import { cn } from "@/lib/utils";

export function ProductFeatureShowcase() {
  const [activeTab, setActiveTab] = useState<"match" | "privacy" | "salary" | "employer">("match");

  // Interactive Match Simulator State
  const [skillWeight, setSkillWeight] = useState(92);
  const [ctcExpectation, setCtcExpectation] = useState(34);
  const [experienceLevel, setExperienceLevel] = useState<"1-2" | "3-5" | "6-8" | "9+">("3-5");
  const [selectedHub, setSelectedHub] = useState<"Bengaluru" | "NCR" | "Hyderabad" | "Remote">("Bengaluru");
  const [applied, setApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  // Dynamic match score calculation based on real parameters
  const calculateMatchScore = () => {
    const base = 72;
    const skillBonus = (skillWeight - 60) * 0.45;
    const ctcAdjustment = ctcExpectation <= 36 ? 8 : ctcExpectation <= 48 ? 4 : 0;
    const expAdjustment =
      experienceLevel === "3-5" ? 7 : experienceLevel === "6-8" ? 9 : experienceLevel === "9+" ? 6 : 4;
    return Math.min(99, Math.max(70, Math.round(base + skillBonus + ctcAdjustment + expAdjustment)));
  };

  const calculatedScore = calculateMatchScore();

  // Dynamic matching role count calculation
  const matchingRolesCount = Math.max(
    8,
    Math.round(16 + (skillWeight - 60) * 0.25 - (ctcExpectation > 40 ? 4 : 0))
  );

  // Dynamic Advisor Feedback according to match criteria
  const getAdvisorFeedback = () => {
    const expText =
      experienceLevel === "1-2"
        ? "1–2 years"
        : experienceLevel === "3-5"
        ? "3–5 years"
        : experienceLevel === "6-8"
        ? "6–8 years"
        : "9+ years";

    if (calculatedScore >= 95) {
      return {
        badge: "Tier-1 Priority Match",
        badgeColor: "bg-[#F0FDF4] text-[#15803D] border-[#15803D]",
        headline: `Outstanding ${calculatedScore}% compatibility in ${selectedHub}!`,
        message: `Your technical stack alignment is in the top 3% for ${selectedHub}. At ₹${ctcExpectation} LPA with ${expText} experience, you are an immediate prime match for ${matchingRolesCount} verified engineering leads. We predict direct VP interview scheduling in under 4 hours.`,
        tags: ["Direct VP Fast-Track", `₹${ctcExpectation} LPA Verified`, `${matchingRolesCount} Direct Roles`],
      };
    } else if (calculatedScore >= 88) {
      return {
        badge: "High-Probability Alignment",
        badgeColor: "bg-[#D6E6F2] text-[#1A2838] border-[#769FCD]",
        headline: `Strong ${calculatedScore}% market match for ${selectedHub}`,
        message: `Your parameters align closely with active mandates in ${selectedHub}. Hiring teams are actively seeking ${expText} engineers in this stack at ₹${ctcExpectation} LPA without recruiter phone-screen delays.`,
        tags: ["Strong Demand", `₹${ctcExpectation} LPA Band`, `${matchingRolesCount} Active Openings`],
      };
    } else if (calculatedScore >= 80) {
      return {
        badge: "Competitive Match",
        badgeColor: "bg-[#FFFBEB] text-[#B45309] border-[#F59E0B]",
        headline: `Solid ${calculatedScore}% fit with ${matchingRolesCount} teams`,
        message: `At ₹${ctcExpectation} LPA with ${expText} in ${selectedHub}, you have ${matchingRolesCount} verified opportunities. Tuning your core stack overlap slightly higher will significantly increase interview invitation speed.`,
        tags: ["Competitive Tier", "Salary Feasible", `${matchingRolesCount} Potential Roles`],
      };
    } else {
      return {
        badge: "Selective Target Band",
        badgeColor: "bg-[#FAF7F2] text-[#74726A] border-[#E2DDD3]",
        headline: `Selective spread at ₹${ctcExpectation} LPA`,
        message: `Targeting ₹${ctcExpectation} LPA with ${expText} in ${selectedHub} places you in an ambitious percentile band. Consider toggling to Remote Only or sharpening microservices overlap to maximize direct responses.`,
        tags: ["Upper Percentile", "Consider Remote", `${matchingRolesCount} Niche Roles`],
      };
    }
  };

  const advisorFeedback = getAdvisorFeedback();

  const handleTouchApply = () => {
    if (applied) return;
    setIsApplying(true);
    playTactileChime();

    setTimeout(() => {
      setIsApplying(false);
      setApplied(true);
    }, 350);
  };

  const handleResetMatch = () => {
    setSkillWeight(92);
    setCtcExpectation(34);
    setExperienceLevel("3-5");
    setSelectedHub("Bengaluru");
    setApplied(false);
  };

  return (
    <section
      id="product-showcase"
      className="py-24 lg:py-32 bg-[#FAF7F2] text-[#141413] border-b border-[#E8E2D8] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Wide, airy, confident */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E2DDD3] text-[11px] font-mono font-bold text-[#141413] shadow-[1px_1px_0px_#141413] mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#769FCD] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#769FCD]" />
            </span>
            <span>MATCH ENGINE SIMULATOR</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#141413] font-serif leading-tight">
            See how the match happens.
          </h2>

          <p className="text-[#5A5852] font-sans text-base sm:text-lg mt-3.5 leading-relaxed max-w-xl mx-auto">
            Adjust criteria to test candidate-employer compatibility in real time.
          </p>
        </div>

        {/* Pro Segmented Tab Bar */}
        <div className="flex justify-center mb-12 sm:mb-14">
          <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-[#E2DDD3] rounded-2xl shadow-[2px_2px_0px_#141413] max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab("match")}
              className={cn(
                "px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer select-none",
                activeTab === "match"
                  ? "bg-[#141413] text-white shadow-xs font-extrabold"
                  : "text-[#454540] hover:text-[#141413] hover:bg-[#FAF7F2]"
              )}
            >
              <SlidersHorizontal className="w-4 h-4 text-[#769FCD]" />
              <span>Match Engine</span>
            </button>

            <button
              onClick={() => setActiveTab("privacy")}
              className={cn(
                "px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer select-none",
                activeTab === "privacy"
                  ? "bg-[#141413] text-white shadow-xs font-extrabold"
                  : "text-[#454540] hover:text-[#141413] hover:bg-[#FAF7F2]"
              )}
            >
              <ShieldCheck className="w-4 h-4 text-[#769FCD]" />
              <span>Stealth Mode</span>
            </button>

            <button
              onClick={() => setActiveTab("salary")}
              className={cn(
                "px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer select-none",
                activeTab === "salary"
                  ? "bg-[#141413] text-white shadow-xs font-extrabold"
                  : "text-[#454540] hover:text-[#141413] hover:bg-[#FAF7F2]"
              )}
            >
              <TrendingUp className="w-4 h-4 text-[#769FCD]" />
              <span>CTC Percentiles</span>
            </button>

            <button
              onClick={() => setActiveTab("employer")}
              className={cn(
                "px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer select-none",
                activeTab === "employer"
                  ? "bg-[#141413] text-white shadow-xs font-extrabold"
                  : "text-[#454540] hover:text-[#141413] hover:bg-[#FAF7F2]"
              )}
            >
              <Building2 className="w-4 h-4 text-[#769FCD]" />
              <span>Employer Console</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Match Engine with AI Advisor Character */}
        {activeTab === "match" && (
          <div className="bg-white rounded-3xl border border-[#141413] shadow-[4px_4px_0px_#141413] overflow-hidden">
            <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E8E2D8]">
              {/* Left Column: Parameter Tuning (Airy, uncluttered) */}
              <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-8 bg-white">
                {/* Header Row */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
                  <h3 className="text-xl sm:text-2xl font-black text-[#141413] tracking-tight font-display">
                    Parameters
                  </h3>
                  <button
                    onClick={handleResetMatch}
                    title="Reset to default criteria"
                    className="px-3 py-1.5 rounded-lg border border-[#E2DDD3] text-[#74726A] hover:text-[#141413] hover:bg-[#FAF7F2] transition-colors cursor-pointer text-xs flex items-center gap-1.5 font-mono font-medium"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>

                {/* Control 1: Tech Stack Overlap */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-[#141413] font-sans">
                      Core Tech Stack Overlap
                    </span>
                    <span className="font-mono font-black text-sm text-[#769FCD] bg-[#D6E6F2] border border-[#B9D7EA] px-2.5 py-0.5 rounded-lg">
                      {skillWeight}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="60"
                    max="100"
                    step="1"
                    value={skillWeight}
                    onChange={(e) => {
                      setSkillWeight(Number(e.target.value));
                      setApplied(false);
                    }}
                    className="w-full h-2 bg-[#E2DDD3] rounded-lg appearance-none cursor-pointer accent-[#769FCD]"
                  />
                </div>

                {/* Control 2: Target Annual CTC */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-[#141413] font-sans">
                      Target Annual CTC
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#15803D] font-bold">
                        {ctcExpectation <= 36 ? "✓ Within P75 Band" : "Top 5% Band"}
                      </span>
                      <span className="font-mono font-black text-sm text-[#141413] bg-[#FAF7F2] border border-[#E2DDD3] px-3 py-0.5 rounded-lg">
                        ₹{ctcExpectation} LPA
                      </span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="15"
                    max="65"
                    step="1"
                    value={ctcExpectation}
                    onChange={(e) => {
                      setCtcExpectation(Number(e.target.value));
                      setApplied(false);
                    }}
                    className="w-full h-2 bg-[#E2DDD3] rounded-lg appearance-none cursor-pointer accent-[#141413]"
                  />
                </div>

                {/* Control 3: Experience Level */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-[#74726A] uppercase tracking-wider font-mono">
                    Experience Level
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: "1-2", label: "1 – 2 Yrs" },
                      { id: "3-5", label: "3 – 5 Yrs" },
                      { id: "6-8", label: "6 – 8 Yrs" },
                      { id: "9+", label: "9+ Yrs" },
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => {
                          setExperienceLevel(lvl.id as "1-2" | "3-5" | "6-8" | "9+");
                          setApplied(false);
                        }}
                        className={cn(
                          "py-3 px-3 rounded-xl border text-center transition-all cursor-pointer select-none font-mono font-bold text-xs sm:text-sm",
                          experienceLevel === lvl.id
                            ? "bg-[#141413] text-white border-[#141413] shadow-[2px_2px_0px_#769FCD]"
                            : "bg-[#FAF7F2] text-[#141413] border-[#E8E2D8] hover:bg-white"
                        )}
                      >
                        {lvl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Control 4: Target Hub */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-[#74726A] uppercase tracking-wider font-mono">
                    Hiring Hub
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: "Bengaluru", label: "Bengaluru" },
                      { id: "NCR", label: "NCR / Gurgaon" },
                      { id: "Hyderabad", label: "Hyderabad" },
                      { id: "Remote", label: "Remote Only" },
                    ].map((hub) => (
                      <button
                        key={hub.id}
                        type="button"
                        onClick={() => {
                          setSelectedHub(hub.id as "Bengaluru" | "NCR" | "Hyderabad" | "Remote");
                          setApplied(false);
                        }}
                        className={cn(
                          "py-3 px-3 rounded-xl border text-center transition-all cursor-pointer select-none font-sans font-bold text-xs sm:text-sm",
                          selectedHub === hub.id
                            ? "bg-[#141413] text-white border-[#141413] shadow-[2px_2px_0px_#769FCD]"
                            : "bg-[#FAF7F2] text-[#141413] border-[#E8E2D8] hover:bg-white"
                        )}
                      >
                        {hub.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: AI Advisor Character with Dynamic Matching Message */}
              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 bg-[#FAF7F2] flex flex-col justify-between gap-6">
                {/* Metric Summary Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl sm:text-5xl font-black font-display text-[#141413] tracking-tight">
                      {calculatedScore}%
                    </span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#769FCD]">
                      Vector Fit
                    </span>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white border border-[#E2DDD3] text-[#141413] shadow-xs">
                    {matchingRolesCount} Active Roles · {selectedHub}
                  </span>
                </div>

                {/* Character + Dynamic Assessment Speech Card */}
                <div className="bg-white rounded-2xl border border-[#E2DDD3] p-5 sm:p-6 shadow-[0_4px_24px_rgba(26,40,56,0.06)] flex flex-col sm:flex-row items-center sm:items-start gap-5 my-auto">
                  {/* Character Portrait with Status Badge */}
                  <div className="relative shrink-0 flex flex-col items-center">
                    <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-2xl overflow-hidden border-2 border-[#141413] shadow-[3px_3px_0px_#769FCD] bg-[#F5EFEB]">
                      <img
                        src="/images/advisor-character.jpg"
                        alt="Aria - AI Career Advisor"
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {/* Live Status Pill */}
                    <span className="mt-2 px-2.5 py-0.5 rounded-full bg-[#141413] text-white text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-xs whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                      <span>ARIA · ADVISOR</span>
                    </span>
                  </div>

                  {/* Dynamic Advisor Speech Bubble */}
                  <div className="flex-1 flex flex-col justify-between text-left">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="font-bold text-xs text-[#141413] font-sans">
                          AI Co-Pilot Assessment
                        </span>
                        <span
                          className={cn(
                            "px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold border",
                            advisorFeedback.badgeColor
                          )}
                        >
                          {advisorFeedback.badge}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm sm:text-base text-[#141413] mb-1.5 font-sans leading-snug">
                        {advisorFeedback.headline}
                      </h4>

                      <p className="text-xs sm:text-[13px] text-[#5A5852] leading-relaxed font-sans mb-3">
                        {advisorFeedback.message}
                      </p>
                    </div>

                    {/* Dynamic Key Insight Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-[#E8E2D8]">
                      {advisorFeedback.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-[#FAF7F2] border border-[#E8E2D8] text-[#454540] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="pt-1">
                  {applied ? (
                    <div className="p-4 rounded-xl bg-[#F0FDF4] border-2 border-[#15803D] text-center animate-in fade-in zoom-in-95 duration-200">
                      <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#15803D]">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>DISPATCHED TO {matchingRolesCount} VERIFIED TEAMS IN {selectedHub.toUpperCase()}</span>
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={handleTouchApply}
                      variant="touch"
                      size="lg"
                      isLoading={isApplying}
                      className="w-full py-4 text-base font-extrabold shadow-[3px_3px_0px_#141413] active:shadow-none"
                    >
                      <Zap className="w-4 h-4 mr-2 fill-current" />
                      <span>Touch to Apply ({matchingRolesCount} Matches)</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Stealth Privacy Mode */}
        {activeTab === "privacy" && (
          <div className="bg-white rounded-3xl border border-[#141413] shadow-[4px_4px_0px_#141413] p-8 sm:p-12">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#D6E6F2] border border-[#B9D7EA] text-[#769FCD] flex items-center justify-center font-bold mb-5 shadow-[2px_2px_0px_#141413]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#141413] mb-3 tracking-tight font-serif">
                  Stealth Search. Current Employer Shielded.
                </h3>
                <p className="text-[#5A5852] text-base leading-relaxed mb-8 font-sans">
                  Look for higher CTC bands without risking your current job. Your profile, resume,
                  and contact details stay completely anonymous until you approve a direct match.
                </p>

                <div className="space-y-3.5 text-xs sm:text-sm font-mono">
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8]">
                    <EyeOff className="w-4 h-4 text-[#769FCD] shrink-0" />
                    <span className="text-[#141413] font-medium">
                      Auto-block current employer corporate domains from profile visibility
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8]">
                    <Lock className="w-4 h-4 text-[#141413] shrink-0" />
                    <span className="text-[#141413] font-medium">
                      Name, phone, and GitHub handle stay masked until you grant consent
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8]">
                    <TrendingUp className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span className="text-[#141413] font-medium">
                      Receive inbound salary offers without your current manager knowing
                    </span>
                  </div>
                </div>
              </div>

              {/* Stealth Console Visualizer */}
              <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8E2D8] shadow-[2px_2px_0px_#141413] flex flex-col gap-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
                  <span className="text-xs font-mono font-bold text-[#141413] uppercase">
                    Active Privacy Rules
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#F0FDF4] text-[#15803D] border border-[#15803D]">
                    100% SHIELDED
                  </span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E8E2D8] space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#141413]">Domain Exclusion Blacklist</span>
                    <span className="text-emerald-700 font-mono font-bold text-xs">Active</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="px-2.5 py-1 rounded bg-[#FAF7F2] border border-[#E8E2D8] text-xs font-mono">
                      @current-employer.com (Blocked)
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#FAF7F2] border border-[#E8E2D8] text-xs font-mono">
                      @subsidiary-group.in (Blocked)
                    </span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E8E2D8] text-xs sm:text-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-[#141413]">Candidate Mask ID</span>
                    <span className="font-mono text-xs text-[#74726A]">#TAG-BLR-8924</span>
                  </div>
                  <p className="text-xs text-[#74726A]">
                    Employers view: &ldquo;Senior Distributed Systems Engineer (7y exp) • 96% Match&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: CTC Percentile Distributions */}
        {activeTab === "salary" && (
          <div className="bg-white rounded-3xl border border-[#141413] shadow-[4px_4px_0px_#141413] p-8 sm:p-12">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#D6E6F2] border border-[#B9D7EA] text-[#769FCD] flex items-center justify-center font-bold mb-5 shadow-[2px_2px_0px_#141413]">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#141413] mb-3 tracking-tight font-serif">
                  Transparent Indian Tech CTC Distributions
                </h3>
                <p className="text-[#5A5852] text-base leading-relaxed mb-8 font-sans">
                  No more &ldquo;competitive salary as per industry standard&rdquo; vague promises. Every
                  role publishes verified CTC percentiles upfront before you tap apply.
                </p>

                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] text-xs sm:text-sm space-y-2">
                  <div className="font-bold text-[#141413]">💡 Transparent Benchmark Guarantee:</div>
                  <p className="text-[#454540] leading-relaxed">
                    Employers on Touch And Go commit to the published CTC bracket upfront. No lowball counter-offers at the final round.
                  </p>
                </div>
              </div>

              {/* Real Distribution Chart */}
              <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8E2D8] shadow-[2px_2px_0px_#141413] flex flex-col gap-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
                  <span className="text-xs font-mono font-bold text-[#141413] uppercase">
                    Bengaluru SDE-3 (4–7 Yrs) CTC Bands
                  </span>
                  <span className="font-mono text-xs font-bold text-[#769FCD]">2026 Verified</span>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-[#454540]">Traditional Portal Average</span>
                      <span className="font-mono font-bold text-[#141413]">₹22.5 LPA</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#E2DDD3] overflow-hidden">
                      <div className="h-full bg-[#74726A]" style={{ width: "45%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-[#454540]">TAG Median Benchmark (P50)</span>
                      <span className="font-mono font-bold text-[#141413]">₹34.2 LPA</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#E2DDD3] overflow-hidden">
                      <div className="h-full bg-[#141413]" style={{ width: "70%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-[#769FCD]">TAG Tier-1 FinTech / High-Bar (P90)</span>
                      <span className="font-mono font-black text-[#769FCD]">₹48.0 LPA</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-[#E2DDD3] overflow-hidden">
                      <div className="h-full bg-[#769FCD]" style={{ width: "95%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Employer Console */}
        {activeTab === "employer" && (
          <div className="bg-white rounded-3xl border border-[#141413] shadow-[4px_4px_0px_#141413] p-8 sm:p-12">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#141413] text-[#141413] flex items-center justify-center font-bold mb-5 shadow-[2px_2px_0px_#141413]">
                  <Building2 className="w-6 h-6 text-[#769FCD]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#141413] mb-3 tracking-tight font-serif">
                  Direct Founder &amp; Engineering Lead Console
                </h3>
                <p className="text-[#5A5852] text-base leading-relaxed mb-8 font-sans">
                  Skip the 1,000-resume spam pile. Set structured vector thresholds and get a ranked
                  feed of candidates who meet your criteria and accepted your salary benchmark.
                </p>

                <div className="space-y-3.5 text-xs sm:text-sm font-mono">
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-4 h-4 text-[#769FCD] shrink-0" />
                    <span>0 screening agency fees · Direct-to-candidate connection</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Lock className="w-4 h-4 text-[#141413] shrink-0" />
                    <span>1-click interview invitation dispatch with calendar sync</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span>Corporate domain validation required for all hiring teams</span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/employer/jobs/new"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#141413] hover:bg-[#769FCD] text-white font-extrabold text-sm shadow-[2px_2px_0px_#141413] transition-all cursor-pointer"
                  >
                    <span>Post Role &amp; View Matching Talent</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Employer Pipeline Preview */}
              <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#E8E2D8] shadow-[2px_2px_0px_#141413] flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8] text-xs font-mono font-bold">
                  <span>Inbound Matched Talent Feed</span>
                  <span className="text-[#769FCD]">4 New Pre-Screened</span>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#E8E2D8] flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-[#141413]">
                      Lead Systems Architect (6y exp)
                    </div>
                    <div className="text-xs text-[#74726A] font-mono mt-0.5">
                      React 19, Next.js, Go • Bengaluru
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA]">
                    98.4% Match
                  </span>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#E8E2D8] flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-[#141413]">
                      Staff Backend Engineer (7y exp)
                    </div>
                    <div className="text-xs text-[#74726A] font-mono mt-0.5">
                      Kafka, High Throughput, Go • Hybrid
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA]">
                    96.8% Match
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
