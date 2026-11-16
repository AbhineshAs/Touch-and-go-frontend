"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StatusBadge, MatchBadge } from "@/components/ui/Badge";
import { LoadingState } from "@/components/ui/States";
import {
  Briefcase,
  Users,
  UserCheck,
  Calendar,
  Plus,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Clock,
  ShieldCheck,
  Building2,
  ChevronRight,
  Zap,
  CheckCircle2,
  Video,
} from "lucide-react";
import dynamic from "next/dynamic";
import { Job, Application, Interview } from "@/types";

const PipelineChart = dynamic(() => import("@/components/employer/PipelineChart"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[240px] flex items-center justify-center bg-[#FAF7F2] rounded-xl border border-[#E8E2D8] animate-pulse text-xs text-[#74726A] font-mono">
      Loading analytics engine...
    </div>
  ),
});
import { getEmployerJobs } from "@/lib/api/jobs";
import { getApplicantsForJob } from "@/lib/api/applications";
import { getInterviews } from "@/lib/api/interviews";
import { formatDate } from "@/lib/utils";

export default function EmployerDashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const [j, ints] = await Promise.all([getEmployerJobs("org_razorwave"), getInterviews()]);
      setJobs(j);
      setInterviews(ints);
      setIsLoading(false);
    }
    load();
  }, []);

  const totalApplicants = jobs.reduce((acc, curr) => acc + curr.applicantsCount, 0);
  const totalShortlisted = jobs.reduce((acc, curr) => acc + curr.shortlistedCount, 0);
  const totalInterviews = jobs.reduce((acc, curr) => acc + curr.interviewsCount, 0);

  // Pipeline funnel data for chart
  const funnelData = [
    { stage: "Applied", count: totalApplicants },
    { stage: "Screened", count: Math.round(totalApplicants * 0.55) },
    { stage: "Shortlisted", count: totalShortlisted },
    { stage: "Interview", count: totalInterviews },
    { stage: "Offer", count: 2 },
  ];

  if (isLoading) {
    return <LoadingState message="Loading employer hiring command center..." className="py-24" />;
  }

  return (
    <div className="flex flex-col gap-8 pb-12 font-sans text-[#141413]">
      {/* 1. Header Command Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E2D8]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#141413] font-display">
              Hiring Command Center
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6E6F2] border border-[#B9D7EA] text-xs font-mono font-bold text-[#141413] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Mandates Active</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#74726A] font-medium">
            RazorWave Technologies · Active recruitment pipelines and candidate criteria alignment
          </p>
        </div>

        <Link href="/employer/jobs/new">
          <button className="px-5 py-2.5 rounded-xl bg-[#141413] hover:bg-[#769FCD] text-white font-extrabold text-xs shadow-[2px_2px_0px_#769FCD] hover:shadow-[3px_3px_0px_#5E8BBF] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center gap-1.5 transition-all cursor-pointer">
            <Plus className="w-4 h-4 text-white" />
            <span>Create Job Listing</span>
          </button>
        </Link>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E2DDD3] hover:border-[#769FCD] shadow-[0_4px_24px_rgba(26,40,56,0.04)] hover:shadow-[0_12px_32px_rgba(118,159,205,0.12)] transition-all hover:-translate-y-0.5 flex flex-col justify-between gap-4 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#74726A]">
              Active Published Jobs
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#D6E6F2] border border-[#B9D7EA] flex items-center justify-center text-[#141413] group-hover:scale-105 transition-transform">
              <Briefcase className="w-4.5 h-4.5 text-[#769FCD]" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-3xl font-black font-display text-[#141413] tracking-tight">
              {jobs.filter((j) => j.status === "Published").length}
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                +1 this week
              </span>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E2DDD3] hover:border-[#769FCD] shadow-[0_4px_24px_rgba(26,40,56,0.04)] hover:shadow-[0_12px_32px_rgba(118,159,205,0.12)] transition-all hover:-translate-y-0.5 flex flex-col justify-between gap-4 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#74726A]">
              Total Applicants
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#D6E6F2] border border-[#B9D7EA] flex items-center justify-center text-[#141413] group-hover:scale-105 transition-transform">
              <Users className="w-4.5 h-4.5 text-[#769FCD]" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-3xl font-black font-display text-[#141413] tracking-tight">
              {totalApplicants}
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                +14 new
              </span>
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E2DDD3] hover:border-[#769FCD] shadow-[0_4px_24px_rgba(26,40,56,0.04)] hover:shadow-[0_12px_32px_rgba(118,159,205,0.12)] transition-all hover:-translate-y-0.5 flex flex-col justify-between gap-4 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#74726A]">
              Shortlisted Candidates
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#D6E6F2] border border-[#B9D7EA] flex items-center justify-center text-[#141413] group-hover:scale-105 transition-transform">
              <UserCheck className="w-4.5 h-4.5 text-[#769FCD]" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-3xl font-black font-display text-[#141413] tracking-tight">
              {totalShortlisted}
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#74726A] border border-[#E8E2D8]">
                Top alignment band
              </span>
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E2DDD3] hover:border-[#769FCD] shadow-[0_4px_24px_rgba(26,40,56,0.04)] hover:shadow-[0_12px_32px_rgba(118,159,205,0.12)] transition-all hover:-translate-y-0.5 flex flex-col justify-between gap-4 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#74726A]">
              Interviews Scheduled
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#D6E6F2] border border-[#B9D7EA] flex items-center justify-center text-[#141413] group-hover:scale-105 transition-transform">
              <Calendar className="w-4.5 h-4.5 text-[#769FCD]" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-3xl font-black font-display text-[#141413] tracking-tight">
              {interviews.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#D6E6F2] text-[#141413] border border-[#B9D7EA]">
                2 today
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Pipeline Funnel + Needs Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left: Applicant Pipeline Funnel Chart */}
        <div className="lg:col-span-2 bg-white border border-[#E2DDD3] rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(26,40,56,0.04)] flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
            <div className="flex flex-col">
              <h2 className="text-base sm:text-lg font-black text-[#141413] font-display">
                Applicant Pipeline Funnel
              </h2>
              <p className="text-xs text-[#74726A]">Conversion across active hiring stages</p>
            </div>
            <Link
              href="/employer/analytics"
              className="text-xs font-mono font-bold text-[#769FCD] hover:text-[#5E8BBF] transition-colors flex items-center gap-1"
            >
              <span>Detailed Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Dynamically Loaded Pipeline Funnel Chart */}
          <div className="h-64 w-full pt-2">
            <PipelineChart data={funnelData} />
          </div>

          {/* Quick Conversion Summary Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-[#E8E2D8]">
            <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] flex flex-col text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#74726A]">Applied</span>
              <span className="text-sm font-black font-mono text-[#141413]">{totalApplicants}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] flex flex-col text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#74726A]">Screened</span>
              <span className="text-sm font-black font-mono text-[#141413]">{Math.round(totalApplicants * 0.55)} (55%)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] flex flex-col text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#74726A]">Shortlisted</span>
              <span className="text-sm font-black font-mono text-[#141413]">{totalShortlisted} (23%)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] flex flex-col text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#74726A]">Interview</span>
              <span className="text-sm font-black font-mono text-[#141413]">{totalInterviews} (12%)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] flex flex-col text-center col-span-2 sm:col-span-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#74726A]">Offer</span>
              <span className="text-sm font-black font-mono text-[#769FCD]">2 (5%)</span>
            </div>
          </div>
        </div>

        {/* Right: Needs Attention Card */}
        <div className="bg-white border border-[#E2DDD3] rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(26,40,56,0.04)] flex flex-col justify-between gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <h2 className="text-base font-black text-[#141413] font-display">Needs Attention</h2>
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Action Required
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] hover:border-[#769FCD] transition-all flex flex-col gap-1.5">
              <span className="font-bold text-xs text-[#141413]">
                Senior Frontend Engineer (React)
              </span>
              <p className="text-xs text-[#5A5850] leading-relaxed">
                4 new applicants with &gt;80% criteria alignment awaiting recruiter screening.
              </p>
              <Link
                href="/employer/jobs/job_01/pipeline"
                className="text-[#769FCD] hover:text-[#5E8BBF] font-bold text-xs mt-1 inline-flex items-center gap-1 transition-colors"
              >
                <span>Open Pipeline</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] hover:border-[#769FCD] transition-all flex flex-col gap-1.5">
              <span className="font-bold text-xs text-[#141413]">
                Pending Interview Feedback
              </span>
              <p className="text-xs text-[#5A5850] leading-relaxed">
                Karthik Raman has not submitted scorecard for candidate Aditya Hegde.
              </p>
              <Link
                href="/employer/interviews"
                className="text-[#769FCD] hover:text-[#5E8BBF] font-bold text-xs mt-1 inline-flex items-center gap-1 transition-colors"
              >
                <span>Submit Scorecard</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E8E2D8] text-[11px] font-mono text-[#74726A] flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#74726A]" />
            <span>SLA Standard: Review applicants within 3 days.</span>
          </div>
        </div>
      </div>

      {/* 4. Active Job Listings + Upcoming Interviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Active Published Jobs */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-[#141413] font-display">
              Active Published Jobs
            </h2>
            <Link
              href="/employer/jobs"
              className="text-xs font-mono font-bold text-[#769FCD] hover:text-[#5E8BBF] transition-colors flex items-center gap-1"
            >
              <span>Manage All ({jobs.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-col gap-3.5">
            {jobs.slice(0, 3).map((job) => (
              <div
                key={job.id}
                className="bg-white border border-[#E2DDD3] hover:border-[#769FCD] rounded-3xl p-6 shadow-[0_4px_24px_rgba(26,40,56,0.04)] hover:shadow-[0_12px_32px_rgba(118,159,205,0.12)] transition-all hover:-translate-y-0.5 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link href={`/employer/jobs/${job.id}/pipeline`}>
                      <h3 className="text-base font-black text-[#141413] hover:text-[#769FCD] transition-colors font-display">
                        {job.title}
                      </h3>
                    </Link>
                    <span className="text-xs font-mono text-[#74726A] mt-0.5 block">
                      {job.department} • {job.location} ({job.workMode})
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-bold text-[11px] shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{job.status}</span>
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 pt-1 text-xs text-center">
                  <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8]">
                    <span className="text-[#74726A] block text-[10px] font-mono font-bold uppercase tracking-wider">
                      Applicants
                    </span>
                    <strong className="text-[#141413] text-lg font-black font-mono mt-0.5 block">
                      {job.applicantsCount}
                    </strong>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8]">
                    <span className="text-[#74726A] block text-[10px] font-mono font-bold uppercase tracking-wider">
                      Shortlisted
                    </span>
                    <strong className="text-[#141413] text-lg font-black font-mono mt-0.5 block">
                      {job.shortlistedCount}
                    </strong>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8]">
                    <span className="text-[#74726A] block text-[10px] font-mono font-bold uppercase tracking-wider">
                      Interviews
                    </span>
                    <strong className="text-[#141413] text-lg font-black font-mono mt-0.5 block">
                      {job.interviewsCount}
                    </strong>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <Link href={`/employer/jobs/${job.id}/pipeline`}>
                    <button className="px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#D6E6F2] text-[#141413] border border-[#E8E2D8] hover:border-[#769FCD] font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer">
                      <span>View Applicant Pipeline</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#769FCD]" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Upcoming Interviews */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-[#141413] font-display">
              Upcoming Interviews
            </h2>
            <Link
              href="/employer/interviews"
              className="text-xs font-mono font-bold text-[#769FCD] hover:text-[#5E8BBF] transition-colors flex items-center gap-1"
            >
              <span>View Calendar</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-col gap-3.5">
            {interviews.map((int) => (
              <div
                key={int.id}
                className="bg-white border border-[#E2DDD3] hover:border-[#769FCD] rounded-3xl p-6 shadow-[0_4px_24px_rgba(26,40,56,0.04)] hover:shadow-[0_12px_32px_rgba(118,159,205,0.12)] transition-all hover:-translate-y-0.5 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-black text-[#141413] font-display">
                      {int.candidateName}
                    </h3>
                    <span className="text-xs text-[#74726A] font-medium">{int.jobTitle}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#141413] bg-[#D6E6F2] px-2.5 py-0.5 rounded-full border border-[#B9D7EA]">
                    {int.durationMinutes} mins
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] flex flex-col gap-1 text-xs">
                  <div className="flex items-center gap-2 text-[#141413] font-bold">
                    <Calendar className="w-3.5 h-3.5 text-[#769FCD]" />
                    <span className="font-mono">Thursday, 17 Sep 2026 · 03:00 PM IST</span>
                  </div>
                  <span className="text-[#74726A] text-[11px] font-medium pl-5.5">
                    Interviewer: {int.interviewerName} ({int.interviewerRole})
                  </span>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <a href={int.meetingLink} target="_blank" rel="noopener noreferrer">
                    <button className="px-5 py-2.5 rounded-xl bg-[#141413] hover:bg-[#769FCD] text-white font-extrabold text-xs shadow-[2px_2px_0px_#769FCD] hover:shadow-[3px_3px_0px_#5E8BBF] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center gap-2 transition-all cursor-pointer">
                      <Video className="w-3.5 h-3.5" />
                      <span>Launch Meeting</span>
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
