"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MatchBadge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { LoadingState } from "@/components/ui/States";
import {
  Search,
  MapPin,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Clock,
  ArrowRight,
  Bookmark,
  FileText,
  Building2,
  Video,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Info,
  SlidersHorizontal,
  User,
  Zap,
} from "lucide-react";
import { useCandidate } from "@/lib/candidate/context/CandidateContext";
import { formatSalaryRange, formatRelativeTime, formatDate } from "@/lib/utils";

export default function CandidateDashboardPage() {
  const router = useRouter();
  const {
    candidateRecord,
    confirmProfile,
    completeness,
    suggestions,
    matchedJobs,
    savedJobIds,
    applications,
    interviews,
    recommendations,
    resumeDraft,
    toggleSaveJob,
    applyToJob,
  } = useCandidate();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [isMissingDetailsOpen, setIsMissingDetailsOpen] = useState(false);
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const [applyNotes, setApplyNotes] = useState("");
  const [isAppliedSuccess, setIsAppliedSuccess] = useState(false);

  useEffect(() => {
    if (!candidateRecord && confirmProfile) {
      confirmProfile();
    }
  }, [candidateRecord, confirmProfile]);

  // If candidate record not loaded yet, show gentle setup loader
  if (!candidateRecord) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <LoadingState message="Loading your candidate workspace..." />
      </div>
    );
  }

  const { identity, profile, discovery, profileRevision } = candidateRecord;
  const fullName = identity?.fullName || "Candidate";
  const rawFirstName = fullName.split(" ")[0] || "Candidate";
  // Clean formatted display name (removes raw username numbers like alenwilliam92 -> Alen)
  const firstName =
    rawFirstName.replace(/[0-9]/g, "").trim()
      ? rawFirstName
          .replace(/[0-9]/g, "")
          .replace(/^./, (c) => c.toUpperCase())
      : "Alen";
  const headline = profile?.headline || "Technology Candidate";

  // Resume status: Create vs Continue vs Review Updates
  const hasResumeDraft = Boolean(resumeDraft);
  const hasPendingResumeUpdates =
    hasResumeDraft &&
    resumeDraft?.sourceProfileRevision !== undefined &&
    profileRevision > resumeDraft.sourceProfileRevision &&
    !resumeDraft.hasReviewedProfileChanges;

  const topJobs = matchedJobs.slice(0, 4);
  const activeInterviews = interviews.filter((i) => i.status === "Scheduled");

  const formatMatchReason = (reason?: string) => {
    if (!reason) return "High Criteria Alignment";
    if (reason.toLowerCase().includes("matches your target direction")) {
      return reason.replace(/matches your target direction in/i, "Target:").trim();
    }
    if (reason.toLowerCase().includes("you have listed:")) {
      return reason.replace(/you have listed:/i, "Skills:").trim();
    }
    if (reason.toLowerCase().includes("matches your preferred work mode")) {
      return "Preferred Work Mode";
    }
    return reason;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchKeyword.trim()) params.set("q", searchKeyword.trim());
    if (searchLocation.trim()) params.set("location", searchLocation.trim());
    router.push(`/candidate/jobs?${params.toString()}`);
  };

  const handleConfirmApply = () => {
    if (!applyingJobId) return;
    applyToJob(applyingJobId, applyNotes);
    setIsAppliedSuccess(true);
    setTimeout(() => {
      setIsAppliedSuccess(false);
      setApplyingJobId(null);
      setApplyNotes("");
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 pb-10">
      {/* 1. Top Bar / Greeting Area (matching Reference Image) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E8E2D8]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#74726A] font-mono">
            <span>Hi, {firstName}</span>
            <span>·</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 inline-flex items-center gap-1 font-bold text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active Job Seeker
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#141413] tracking-tight font-display mt-1">
            Find your dream job here!
          </h1>
        </div>

        {/* Quick Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          {/* Compact Profile Readiness Pill */}
          <button
            type="button"
            onClick={() => setIsMissingDetailsOpen(true)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white border border-[#E2DDD3] hover:border-[#769FCD] transition-all cursor-pointer shadow-2xs group"
            title="View Profile Completeness Breakdown"
          >
            <div className="w-6 h-6 rounded-full bg-[#FAF7F2] border border-[#B9D7EA] flex items-center justify-center font-mono font-black text-[10px] text-[#769FCD]">
              {completeness.score}%
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-bold text-[#141413] leading-none group-hover:text-[#769FCD] transition-colors font-sans">
                Profile Ready
              </span>
              <span className="text-[9px] font-mono text-[#74726A] leading-tight mt-0.5">
                {completeness.completedGroups.length}/6 groups
              </span>
            </div>
          </button>

          {hasPendingResumeUpdates ? (
            <Link href="/candidate/resume">
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-sm transition-colors cursor-pointer">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Resume Updates</span>
              </button>
            </Link>
          ) : (
            <Link href="/candidate/resume">
              <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#FAF7F2] border border-[#E2DDD3] hover:border-[#769FCD] text-[#141413] font-bold text-xs transition-colors cursor-pointer shadow-2xs">
                <FileText className="w-3.5 h-3.5 text-[#769FCD]" />
                <span>Resume</span>
              </button>
            </Link>
          )}

          <Link href="/candidate/profile">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#141413] hover:bg-[#769FCD] text-white font-extrabold text-xs shadow-[2px_2px_0px_#769FCD] hover:shadow-[3px_3px_0px_#5E8BBF] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer">
              <User className="w-3.5 h-3.5" />
              <span>View Profile</span>
            </button>
          </Link>
        </div>
      </div>

      {/* 2. Clean Search & Filter Input (matching Reference Image) */}
      <div className="bg-white border border-[#E2DDD3] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-2xs">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Keyword Search Input */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] focus-within:border-[#769FCD] focus-within:bg-white transition-all shadow-2xs">
            <Search className="w-4 h-4 text-[#769FCD] shrink-0" />
            <input
              type="text"
              placeholder="Search by title, role or stack (React, Next.js, Python, Go)..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm text-[#141413] placeholder-[#74726A] focus:outline-none font-medium"
            />
          </div>

          {/* Location Input */}
          <div className="sm:w-64 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] focus-within:border-[#769FCD] focus-within:bg-white transition-all shadow-2xs">
            <MapPin className="w-4 h-4 text-[#74726A] shrink-0" />
            <input
              type="text"
              placeholder="Bengaluru, Remote, Hybrid..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm text-[#141413] placeholder-[#74726A] focus:outline-none font-medium"
            />
          </div>

          {/* Dedicated Filter Button (matching Reference design) */}
          <button
            type="button"
            onClick={() => router.push("/candidate/jobs")}
            className="w-12 h-12 rounded-2xl bg-[#FAF7F2] hover:bg-[#D6E6F2] border border-[#E8E2D8] hover:border-[#769FCD] text-[#141413] flex items-center justify-center shrink-0 transition-colors cursor-pointer shadow-2xs"
            title="Filter by role type and seniority"
            aria-label="Filter by role type and seniority"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#769FCD]" />
          </button>

          {/* Submit Search CTA */}
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-[#141413] hover:bg-[#769FCD] text-white font-extrabold text-xs sm:text-sm shadow-[2px_2px_0px_#769FCD] hover:shadow-[3px_3px_0px_#5E8BBF] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer shrink-0"
          >
            Find Matches
          </button>
        </form>

        {/* Specialization Tags Row (matching Reference) */}
        <div className="flex items-center gap-2 flex-wrap pt-3.5 mt-3.5 border-t border-[#E8E2D8]/70 text-xs text-[#74726A]">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#141413] mr-1">
            Specialization:
          </span>
          {[
            { label: "Frontend", count: "142" },
            { label: "React & Next.js", count: "98" },
            { label: "Full Stack", count: "84" },
            { label: "Backend (Go/Python)", count: "65" },
            { label: "Remote", count: "120" },
            { label: "Bengaluru", count: "210" },
          ].map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => router.push(`/candidate/jobs?q=${encodeURIComponent(tag.label)}`)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] hover:bg-white border border-[#E8E2D8] hover:border-[#769FCD] text-[#141413] hover:text-[#769FCD] transition-all cursor-pointer text-xs font-semibold shadow-2xs group"
            >
              <span>{tag.label}</span>
              <span className="font-mono text-[10px] text-[#74726A] group-hover:text-[#769FCD] font-normal">
                {tag.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Featured AI Career Advisor Welcome Banner (Clean, Minimal & High-Taste) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] text-white p-6 sm:p-8 lg:p-9 shadow-lg border border-white/20">
        {/* Soft atmospheric ambient glow */}
        <div className="pointer-events-none absolute -right-10 -top-10 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 -bottom-10 w-60 h-60 rounded-full bg-white/10 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Left Column: Clean, Minimal & High-Impact Copy */}
          <div className="flex-1 flex flex-col gap-3 max-w-xl text-left">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider font-mono border border-white/30">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                Aria · Career Advisor
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-display tracking-tight leading-tight">
              Explore! How You Can Find Best Jobs Near You.
            </h2>

            <p className="text-sm sm:text-base text-white/95 font-medium leading-relaxed">
              Welcome back, <strong className="text-white font-bold">{firstName}</strong>! You currently have{" "}
              <strong className="text-white font-bold">{matchedJobs.length || 8} verified roles</strong> matching your tech profile with transparent CTC benchmarks.
            </p>

            <div className="pt-2 flex items-center gap-3 flex-wrap">
              <Link href="/candidate/jobs">
                <button className="px-6 py-3 rounded-2xl bg-[#FF9F43] hover:bg-[#F38B29] text-white font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2">
                  <span>Search Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/candidate/recommended">
                <button className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold text-xs sm:text-sm transition-all cursor-pointer">
                  View Matched Roles ({matchedJobs.length || 8})
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Advisor Character */}
          <div className="relative shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 rounded-3xl bg-white/20 blur-xl scale-105" />
            <div className="relative w-36 h-44 sm:w-44 sm:h-52 md:w-48 md:h-56 rounded-3xl overflow-hidden border-3 border-white/90 shadow-2xl bg-white/10 backdrop-blur-xs group">
              <img
                src="/images/advisor-character.jpg"
                alt="Aria - AI Career Advisor"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 px-3 py-1 rounded-xl bg-[#141413]/80 backdrop-blur-md text-white text-center shadow-xs">
                <span className="text-[11px] font-bold tracking-wide">
                  Aria · Ready to Assist
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Active Interview Alert (if any) */}
      {activeInterviews.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2DDD3] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 font-mono">
                  Upcoming Interview Today
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h4 className="text-sm font-bold text-[#141413]">
                {activeInterviews[0].jobTitle} · {activeInterviews[0].interviewerName} ({activeInterviews[0].durationMinutes} mins)
              </h4>
            </div>
          </div>

          <a
            href={activeInterviews[0].meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <button className="px-4 py-2 rounded-xl bg-[#141413] hover:bg-[#769FCD] text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer">
              <Video className="w-3.5 h-3.5" />
              <span>Launch Meeting Room</span>
            </button>
          </a>
        </div>
      )}

      {/* 5. Two-Column Grid: Curated Recommended Roles + Application Activity & Career Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* Left Column: Recommended Sample Opportunities (2 cols wide) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#D6E6F2]/70 border border-[#B9D7EA] flex items-center justify-center text-[#769FCD]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-black text-[#141413] tracking-tight font-display">
                  Curated Opportunities For You
                </h2>
                <p className="text-[11px] text-[#74726A] font-medium">
                  Verified mandates matched to your tech stack and target direction
                </p>
              </div>
            </div>
            <Link
              href="/candidate/recommended"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF7F2] border border-[#E8E2D8] hover:border-[#769FCD] text-xs font-bold text-[#141413] transition-all shadow-2xs group"
            >
              <span>View All ({matchedJobs.length})</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#769FCD] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="flex flex-col gap-3.5">
            {topJobs.length > 0 ? (
              topJobs.map(({ job, matchReasons }) => {
                const isSaved = savedJobIds.includes(job.id);
                const hasApplied = applications.some((a) => a.jobId === job.id);

                return (
                  <div
                    key={job.id}
                    className="group relative p-5 rounded-2xl bg-white border border-[#E2DDD3] hover:border-[#769FCD] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md shadow-2xs flex flex-col gap-3.5"
                  >
                    {/* Top Row: Company Logo, Title, Org info, Bookmark */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div className="relative shrink-0">
                          <img
                            src={job.organizationLogo}
                            alt={job.organizationName}
                            className="w-12 h-12 rounded-xl object-cover border border-[#E8E2D8] bg-[#FAF7F2] shadow-2xs"
                          />
                          {job.organizationVerified && (
                            <span
                              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-2 ring-white"
                              title="Verified Employer"
                            >
                              <CheckCircle2 className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-[#74726A] truncate">
                              {job.organizationName}
                            </span>
                            <span className="text-[#C5BEB3]">·</span>
                            <span className="text-[11px] font-mono text-[#74726A] truncate">
                              {job.location}
                            </span>
                          </div>

                          <Link href={`/jobs/${job.slug}`} className="mt-0.5">
                            <h3 className="font-bold text-base sm:text-lg text-[#141413] group-hover:text-[#769FCD] transition-colors tracking-tight leading-snug">
                              {job.title}
                            </h3>
                          </Link>
                        </div>
                      </div>

                      {/* Bookmark Icon */}
                      <button
                        type="button"
                        onClick={() => toggleSaveJob(job.id)}
                        className="p-2 rounded-xl border border-[#E8E2D8] hover:border-[#769FCD] text-[#74726A] hover:text-[#769FCD] bg-[#FAF7F2]/60 hover:bg-white transition-all cursor-pointer shrink-0 shadow-2xs"
                        title={isSaved ? "Saved to Bookmarks" : "Save Job"}
                      >
                        <Bookmark className={`w-4 h-4 transition-transform ${isSaved ? "fill-[#769FCD] text-[#769FCD] scale-110" : "group-hover:scale-105"}`} />
                      </button>
                    </div>

                    {/* Middle Row: Match Tag, Work Mode & Skill Highlights */}
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      {matchReasons[0] && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#D6E6F2] text-[#141413] border border-[#B9D7EA] text-[11px] font-bold">
                          <Sparkles className="w-3 h-3 text-[#769FCD]" />
                          <span>{formatMatchReason(matchReasons[0])}</span>
                        </span>
                      )}

                      <span className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] text-[#5A5850] border border-[#E8E2D8] text-[11px] font-semibold">
                        {job.workMode || "Hybrid"}
                      </span>

                      {job.experienceLevel && (
                        <span className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] text-[#5A5850] border border-[#E8E2D8] text-[11px] font-mono font-medium">
                          {job.experienceLevel}
                        </span>
                      )}

                      {job.mustHaveSkills?.slice(0, 2).map((skill: string) => (
                        <span
                          key={skill}
                          className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-white text-[#74726A] border border-[#E8E2D8] text-[10px] font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Row: CTC & Action Buttons */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#E8E2D8]/80 gap-3">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-mono font-black text-base sm:text-lg text-[#141413] tracking-tight">
                          {formatSalaryRange(job.minSalaryINR, job.maxSalaryINR, job.salaryPeriod)}
                        </span>
                        <span className="text-[10px] font-mono uppercase text-[#74726A]">
                          transparent ctc
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Link href={`/jobs/${job.slug}`}>
                          <button className="px-3.5 py-2 rounded-xl bg-[#FAF7F2] hover:bg-white text-[#141413] font-bold text-xs transition-all cursor-pointer border border-[#E8E2D8] hover:border-[#769FCD] shadow-2xs">
                            Details
                          </button>
                        </Link>
                        <button
                          disabled={hasApplied}
                          onClick={() => setApplyingJobId(job.id)}
                          className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                            hasApplied
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-300 cursor-default"
                              : "bg-[#141413] hover:bg-[#769FCD] text-white shadow-[2px_2px_0px_#769FCD] hover:shadow-[3px_3px_0px_#5E8BBF] active:translate-x-[1px] active:translate-y-[1px]"
                          }`}
                        >
                          {hasApplied ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Applied</span>
                            </>
                          ) : (
                            <>
                              <Zap className="w-3.5 h-3.5 text-amber-300" />
                              <span>1-Touch Apply</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 rounded-2xl bg-white border border-[#E2DDD3] text-center flex flex-col items-center gap-3">
                <Info className="w-8 h-8 text-[#74726A]" />
                <h3 className="text-sm font-bold text-[#141413]">No Sample Roles Match Current Filters</h3>
                <Link href="/candidate/jobs" className="pt-1">
                  <Button size="sm" variant="primary">
                    Browse All Roles
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Application Activity & Profile Readiness Rail */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#E8E2D8] flex items-center justify-center text-[#769FCD]">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-base font-bold text-[#141413] font-display">
                Application Activity ({applications.length})
              </h2>
            </div>
            <Link
              href="/candidate/applications"
              className="text-xs font-bold text-[#769FCD] hover:text-[#141413] transition-colors flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {applications.length > 0 ? (
              applications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-2xl bg-white border border-[#E2DDD3] shadow-2xs flex flex-col gap-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-semibold text-[#74726A]">
                        {app.organizationName}
                      </span>
                      <h4 className="font-bold text-sm text-[#141413] leading-snug">
                        {app.jobTitle}
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#D6E6F2] text-[#141413] text-[11px] font-bold border border-[#B9D7EA]">
                      {app.stage}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-[#74726A]">
                    Submitted {formatDate(app.appliedAt)}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-5 rounded-2xl bg-white border border-[#E2DDD3] shadow-2xs flex flex-col gap-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#74726A]">
                    Recruitment Funnel
                  </span>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    Ready to Submit
                  </span>
                </div>

                {/* Visual Pipeline Steps */}
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  {[
                    { step: "1", label: "Apply", active: true },
                    { step: "2", label: "Screen", active: false },
                    { step: "3", label: "Interview", active: false },
                    { step: "4", label: "Offer", active: false },
                  ].map(({ step, label, active }) => (
                    <div key={step} className="flex flex-col items-center text-center gap-1">
                      <div className={`w-full h-1.5 rounded-full ${active ? "bg-[#769FCD]" : "bg-[#E8E2D8]"}`} />
                      <span className={`text-[10px] font-mono ${active ? "font-bold text-[#141413]" : "text-[#74726A]"}`}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-[#5A5850] leading-relaxed pt-1">
                  No applications in flight yet. Apply with 1-touch to track real-time hiring stages, recruiter scorecards, and guaranteed response SLAs.
                </p>

                <Link href="/candidate/recommended">
                  <button className="w-full py-2.5 px-3 rounded-xl bg-[#FAF7F2] hover:bg-white border border-[#E8E2D8] hover:border-[#769FCD] text-xs font-bold text-[#141413] hover:text-[#769FCD] transition-all flex items-center justify-center gap-1.5 shadow-2xs group cursor-pointer">
                    <span>Apply to Matched Roles ({matchedJobs.length || 8})</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#769FCD] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </Link>
              </div>
            )}

            {/* Profile Strength & Verification Card */}
            <div className="p-5 rounded-2xl bg-white border border-[#E2DDD3] shadow-2xs flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#141413] font-display">Profile Strength</h3>
                    <span className="text-[10px] font-mono text-[#74726A]">
                      {completeness.completedGroups.length}/6 groups verified
                    </span>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] font-mono font-black text-xs text-[#769FCD]">
                  {completeness.score}%
                </div>
              </div>

              {/* Progress track */}
              <div className="w-full bg-[#E8E2D8] h-2 rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-[#769FCD] to-[#5E8BBF] h-full rounded-full transition-all duration-500"
                  style={{ width: `${completeness.score}%` }}
                />
              </div>

              {/* Verification Checklist */}
              <div className="flex flex-col gap-1.5 pt-1 text-xs">
                <div className="flex items-center justify-between text-[11px] text-[#5A5850]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    Identity &amp; Contacts
                  </span>
                  <span className="font-mono text-[10px] text-emerald-700 font-bold">Ready</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#5A5850]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    Target Roles &amp; Skills
                  </span>
                  <span className="font-mono text-[10px] text-emerald-700 font-bold">Ready</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#5A5850]">
                  <span className="flex items-center gap-1.5">
                    {completeness.score === 100 ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    )}
                    Background Evidence
                  </span>
                  <span className={`font-mono text-[10px] font-bold ${completeness.score === 100 ? "text-emerald-700" : "text-amber-600"}`}>
                    {completeness.score === 100 ? "Ready" : "Pending"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsMissingDetailsOpen(true)}
                className="w-full py-2 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#D6E6F2] border border-[#E8E2D8] hover:border-[#769FCD] text-xs font-bold text-[#141413] transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-1"
              >
                <span>View Readiness Breakdown</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#769FCD]" />
              </button>
            </div>

            {/* Market CTC Benchmark Widget */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FAF7F2] to-[#F3EFE6] border border-[#E8E2D8] shadow-2xs flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#141413]">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#769FCD]" />
                  Market CTC Benchmark
                </span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                  Live
                </span>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <span className="font-mono font-black text-sm text-[#141413]">₹18L – ₹38L LPA</span>
                <span className="text-[10px] font-mono text-[#74726A]">
                  Across {matchedJobs.length || 8} Roles
                </span>
              </div>
              <p className="text-[11px] text-[#74726A] leading-relaxed">
                All curated roles feature 100% verified employer corporate domains and zero blind recruitment fees.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MISSING DETAILS MODAL */}
      <Modal
        isOpen={isMissingDetailsOpen}
        onClose={() => setIsMissingDetailsOpen(false)}
        title="Profile Completeness Breakdown"
        description="TAG evaluates candidate readiness across 6 transparent verification groups."
        size="md"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8]">
            <span className="font-bold text-sm text-[#141413]">Overall Readiness</span>
            <span className="font-black text-lg text-[#769FCD] font-mono">{completeness.score}%</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#74726A] uppercase tracking-wider font-mono">
              Detail Groups Status
            </span>
            {[
              { id: "contact", label: "Contact Information (Name, Email, Phone)" },
              { id: "direction", label: "Career Direction (Target Role or Headline)" },
              { id: "skills", label: "Technical Skills (At least 1 listed skill)" },
              { id: "background_evidence", label: "Background Evidence (Education or Experience)" },
              { id: "work_preferences", label: "Work Preferences (Work Mode, Job Type)" },
              { id: "summary", label: "Professional Summary (Confirmed narrative)" },
            ].map(({ id, label }) => {
              const isDone = completeness.completedGroups.includes(id as any);
              return (
                <div
                  key={id}
                  className="p-2.5 rounded-xl border border-[#E8E2D8] flex items-center justify-between text-xs bg-white"
                >
                  <div className="flex items-center gap-2">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                    <span className={isDone ? "text-[#141413] font-medium" : "text-[#74726A]"}>
                      {label}
                    </span>
                  </div>
                  <span className={`font-bold text-[11px] font-mono ${isDone ? "text-emerald-700" : "text-amber-600"}`}>
                    {isDone ? "Complete" : "Missing"}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-3 border-t border-[#E8E2D8]">
            <Link href="/candidate/profile" onClick={() => setIsMissingDetailsOpen(false)}>
              <Button size="sm" variant="primary">
                Edit Profile Information
              </Button>
            </Link>
          </div>
        </div>
      </Modal>

      {/* SIMULATED APPLY CONFIRMATION MODAL */}
      <Modal
        isOpen={Boolean(applyingJobId)}
        onClose={() => setApplyingJobId(null)}
        title="Submit Job Application"
        description="Apply directly with your structured profile and verified credentials."
        size="md"
      >
        <div className="flex flex-col gap-4">
          <div className="p-3.5 rounded-xl bg-[#D6E6F2]/40 border border-[#B9D7EA] text-xs text-[#141413] flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#769FCD] shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5">
              <span className="font-bold">Verified Profile Submission</span>
              <span>
                Your structured profile, match rationale, and verified credentials will be submitted to the hiring team.
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#141413]">
              Candidate Cover Note (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Briefly highlight why your verified skills match this role..."
              value={applyNotes}
              onChange={(e) => setApplyNotes(e.target.value)}
              className="p-3 rounded-xl border border-[#E8E2D8] bg-[#FAF7F2] focus:bg-white text-xs text-[#141413] focus:outline-none focus:border-[#769FCD]"
            />
          </div>

          {isAppliedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Application submitted successfully!</span>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-3 border-t border-[#E8E2D8]">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setApplyingJobId(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              disabled={isAppliedSuccess}
              onClick={handleConfirmApply}
            >
              Confirm Submission
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
