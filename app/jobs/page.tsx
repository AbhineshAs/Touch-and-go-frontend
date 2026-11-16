"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input, SearchInput } from "@/components/ui/Input";
import { MatchBadge, SkillBadge } from "@/components/ui/Badge";
import { Drawer } from "@/components/ui/Modal";
import { LoadingState, EmptyState } from "@/components/ui/States";
import { Pagination } from "@/components/ui/Tabs";
import {
  Search,
  MapPin,
  Filter,
  Bookmark,
  Building2,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Zap,
  Target,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";
import { Job, WorkMode, EmploymentType, ExperienceLevel } from "@/types";
import { getJobs, JobFilterParams } from "@/lib/api/jobs";
import { getSavedJobIds, toggleSaveJob } from "@/lib/api/candidate";
import { formatSalaryRange, formatRelativeTime } from "@/lib/utils";
import { useAuth } from "@/lib/auth/AuthContext";
import { AuthGateModal } from "@/components/auth/AuthGateModal";

function JobsSearchContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const initialLoc = searchParams.get("location") || "";

  const [keyword, setKeyword] = useState(initialQ);
  const [location, setLocation] = useState(initialLoc);
  const [selectedWorkModes, setSelectedWorkModes] = useState<WorkMode[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<EmploymentType[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<ExperienceLevel[]>([]);
  const [sortBy, setSortBy] = useState<"relevant" | "newest" | "match">("relevant");

  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Auth gate state
  const { isAuthenticated } = useAuth();
  const [authGateOpen, setAuthGateOpen] = useState(false);
  const [targetJobToSave, setTargetJobToSave] = useState<{ id: string; title: string; org: string } | null>(null);

  const fetchJobs = async () => {
    setIsLoading(true);
    const filterPayload: JobFilterParams = {
      keyword: keyword || undefined,
      location: location || undefined,
      workModes: selectedWorkModes.length > 0 ? selectedWorkModes : undefined,
      employmentTypes: selectedTypes.length > 0 ? selectedTypes : undefined,
      experienceLevels: selectedLevels.length > 0 ? selectedLevels : undefined,
      sortBy,
    };
    const data = await getJobs(filterPayload);
    setJobs(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [keyword, location, selectedWorkModes, selectedTypes, selectedLevels, sortBy]);

  useEffect(() => {
    getSavedJobIds().then(setSavedJobIds);
  }, []);

  const handleToggleSave = async (jobId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      const found = jobs.find((j) => j.id === jobId);
      setTargetJobToSave({
        id: jobId,
        title: found?.title || "this job",
        org: found?.organizationName || "",
      });
      setAuthGateOpen(true);
      return;
    }
    const isCurrentlySaved = savedJobIds.includes(jobId);
    setSavedJobIds((prev) =>
      isCurrentlySaved ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
    const res = await toggleSaveJob(jobId);
    setSavedJobIds(res.savedIds);
  };

  const workModeOptions: WorkMode[] = ["Remote", "Hybrid", "On-site"];
  const employmentTypeOptions: EmploymentType[] = ["Full-time", "Contract", "Part-time", "Internship"];
  const experienceOptions: ExperienceLevel[] = [
    "Entry (0-2 yrs)",
    "Mid (3-5 yrs)",
    "Senior (6-8 yrs)",
    "Lead (8+ yrs)",
  ];

  const clearAllFilters = () => {
    setKeyword("");
    setLocation("");
    setSelectedWorkModes([]);
    setSelectedTypes([]);
    setSelectedLevels([]);
  };

  const activeFilterCount =
    (keyword ? 1 : 0) +
    (location ? 1 : 0) +
    selectedWorkModes.length +
    selectedTypes.length +
    selectedLevels.length;

  const FilterControls = () => (
    <div className="flex flex-col gap-6 text-xs font-sans text-[#141413]">
      <div className="flex items-center justify-between pb-3.5 border-b border-[#E8E2D8]">
        <div className="flex items-center gap-2">
          <span className="font-black text-sm font-display text-[#141413] tracking-tight">Filters</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#D6E6F2] text-[#141413] font-mono font-bold text-[10px]">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-[#769FCD] hover:text-[#5E8BBF] font-bold cursor-pointer text-xs transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      {/* Work Mode */}
      <div className="flex flex-col gap-2">
        <label className="font-mono font-bold text-[#74726A] uppercase tracking-wider text-[11px]">
          Work Mode
        </label>
        <div className="flex flex-col gap-1">
          {workModeOptions.map((mode) => (
            <label
              key={mode}
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-[#FAF7F2] cursor-pointer font-medium text-[#141413] transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedWorkModes.includes(mode)}
                onChange={(e) => {
                  setSelectedWorkModes(
                    e.target.checked
                      ? [...selectedWorkModes, mode]
                      : selectedWorkModes.filter((m) => m !== mode)
                  );
                }}
                className="rounded-md border-[#E2DDD3] text-[#141413] focus:ring-[#769FCD]/20 accent-[#141413] w-4 h-4 cursor-pointer"
              />
              <span className="text-xs">{mode}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Employment Type */}
      <div className="flex flex-col gap-2 pt-4 border-t border-[#E8E2D8]">
        <label className="font-mono font-bold text-[#74726A] uppercase tracking-wider text-[11px]">
          Employment Type
        </label>
        <div className="flex flex-col gap-1">
          {employmentTypeOptions.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-[#FAF7F2] cursor-pointer font-medium text-[#141413] transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={(e) => {
                  setSelectedTypes(
                    e.target.checked
                      ? [...selectedTypes, type]
                      : selectedTypes.filter((t) => t !== type)
                  );
                }}
                className="rounded-md border-[#E2DDD3] text-[#141413] focus:ring-[#769FCD]/20 accent-[#141413] w-4 h-4 cursor-pointer"
              />
              <span className="text-xs">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="flex flex-col gap-2 pt-4 border-t border-[#E8E2D8]">
        <label className="font-mono font-bold text-[#74726A] uppercase tracking-wider text-[11px]">
          Experience Level
        </label>
        <div className="flex flex-col gap-1">
          {experienceOptions.map((lvl) => (
            <label
              key={lvl}
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-[#FAF7F2] cursor-pointer font-medium text-[#141413] transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedLevels.includes(lvl)}
                onChange={(e) => {
                  setSelectedLevels(
                    e.target.checked
                      ? [...selectedLevels, lvl]
                      : selectedLevels.filter((l) => l !== lvl)
                  );
                }}
                className="rounded-md border-[#E2DDD3] text-[#141413] focus:ring-[#769FCD]/20 accent-[#141413] w-4 h-4 cursor-pointer"
              />
              <span className="text-xs">{lvl}</span>
            </label>
          ))}
        </div>
      </div>

      {/* AI Vector Info Box */}
      <div className="mt-2 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#141413]">
          <Zap className="w-3.5 h-3.5 text-[#769FCD] fill-[#769FCD]" />
          <span>Live Vector Ranking</span>
        </div>
        <p className="text-[11px] text-[#74726A] leading-relaxed">
          Opportunities are scored in real time against verified candidate profile criteria.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#141413] font-sans selection:bg-[#D6E6F2] selection:text-[#141413]">
      <PublicNavbar />

      {/* Top Search Command Center */}
      <div className="bg-white/95 backdrop-blur-md border-b border-[#E8E2D8] py-6 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col gap-3.5">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-full flex-1">
              <SearchInput
                placeholder="Search by job title, skills, or stack (e.g. React 19, Python, Node, AI)..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onClear={() => setKeyword("")}
                className="h-12 text-xs sm:text-sm rounded-2xl bg-white border-[#E2DDD3] focus:border-[#769FCD]"
              />
            </div>

            <div className="w-full md:w-72 flex items-center">
              <Input
                placeholder="City (e.g. Bengaluru, Gurgaon, Remote)"
                leftIcon={<MapPin className="w-4 h-4 text-[#769FCD]" />}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-12 text-xs sm:text-sm rounded-2xl bg-white border-[#E2DDD3] focus:border-[#769FCD]"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              {/* Mobile Filter Button */}
              <Button
                variant="secondary"
                size="md"
                leftIcon={<Filter className="w-4 h-4" />}
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex-1 h-12 rounded-2xl border-[#E2DDD3] bg-white text-xs font-bold"
              >
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </Button>

              {/* Sort Selector */}
              <div className="relative flex-1 md:w-56">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full h-12 appearance-none rounded-2xl bg-white border border-[#E2DDD3] px-4 pr-10 text-xs font-bold text-[#141413] focus:outline-none focus:border-[#769FCD] focus:ring-2 focus:ring-[#769FCD]/20 cursor-pointer shadow-2xs"
                >
                  <option value="relevant">Sort: Most Relevant</option>
                  <option value="match">Sort: Highest Match</option>
                  <option value="newest">Sort: Newest First</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#769FCD] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Quick search tags */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs text-[#74726A]">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#74726A] mr-1">
              Popular:
            </span>
            {["React 19", "Go Microservices", "Remote", "Bengaluru", "Senior", "AI Architect"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  if (tag === "Remote" || tag === "Bengaluru") {
                    setLocation(tag);
                  } else {
                    setKeyword(tag);
                  }
                }}
                className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#D6E6F2]/50 text-[#141413] border border-[#E8E2D8] hover:border-[#769FCD] text-[11px] font-medium transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white p-6 rounded-3xl border border-[#E2DDD3] shadow-[0_4px_24px_rgba(26,40,56,0.04)]">
              <FilterControls />
            </div>
          </aside>

          {/* Job Results List */}
          <main className="lg:col-span-3 flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs text-[#74726A] font-medium pb-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>
                  Showing <strong className="text-[#141413] font-mono font-bold">{jobs.length}</strong> verified opportunities in India
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#D6E6F2] border border-[#B9D7EA] text-[#141413] font-mono font-bold text-[11px] flex items-center gap-1.5 shadow-2xs">
                <Target className="w-3.5 h-3.5 text-[#769FCD]" />
                <span>Criteria Match Active</span>
              </span>
            </div>

            {isLoading ? (
              <LoadingState message="Discovering verified opportunities..." className="py-20" />
            ) : jobs.length === 0 ? (
              <EmptyState
                title="No jobs match your filter criteria"
                description="Try clearing your search terms or broadening your selected locations and work modes."
                action={{
                  label: "Clear All Filters",
                  onClick: clearAllFilters,
                }}
              />
            ) : (
              <div className="flex flex-col gap-4">
                {jobs.map((job) => {
                  const isSaved = savedJobIds.includes(job.id);
                  return (
                    <div
                      key={job.id}
                      className="bg-white border border-[#E2DDD3] hover:border-[#769FCD] rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(26,40,56,0.04)] hover:shadow-[0_12px_36px_rgba(118,159,205,0.12)] transition-all duration-200 group flex flex-col justify-between hover:-translate-y-0.5"
                    >
                      <div className="flex flex-col gap-4">
                        {/* Header line: Organization logo + title + badges */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <img
                              src={job.organizationLogo}
                              alt={job.organizationName}
                              className="w-13 h-13 rounded-2xl object-cover border border-[#E8E2D8] bg-[#FAF7F2] p-1 shrink-0 shadow-2xs group-hover:scale-105 transition-transform"
                            />
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#74726A]">
                                  {job.organizationName}
                                </span>
                                {job.organizationVerified && (
                                  <span title="Verified Employer" className="inline-flex">
                                    <ShieldCheck className="w-4 h-4 text-[#769FCD]" />
                                  </span>
                                )}
                              </div>
                              <Link href={`/jobs/${job.slug}`}>
                                <h2 className="text-lg sm:text-xl font-black text-[#141413] group-hover:text-[#769FCD] transition-colors mt-0.5 leading-snug font-display tracking-tight">
                                  {job.title}
                                </h2>
                              </Link>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {job.matchScore && (
                              <MatchBadge score={job.matchScore} size="md" />
                            )}
                            <button
                              onClick={(e) => handleToggleSave(job.id, e)}
                              className="w-9 h-9 rounded-xl border border-[#E2DDD3] hover:border-[#769FCD] text-[#74726A] hover:text-[#769FCD] hover:bg-[#FAF7F2] flex items-center justify-center transition-colors cursor-pointer"
                              aria-label={isSaved ? "Remove from saved" : "Save job"}
                              title={isSaved ? "Saved" : "Save Job"}
                            >
                              <Bookmark
                                className={`w-4 h-4 ${isSaved ? "fill-[#769FCD] text-[#769FCD]" : ""}`}
                              />
                            </button>
                          </div>
                        </div>

                        {/* Summary */}
                        <p className="text-xs sm:text-sm text-[#5A5850] line-clamp-2 leading-relaxed font-normal">
                          {job.summary}
                        </p>

                        {/* Key Attributes */}
                        <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#74726A] font-medium pt-1">
                          <span className="font-mono font-black text-[#141413] px-3 py-1 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] shadow-2xs">
                            {formatSalaryRange(job.minSalaryINR, job.maxSalaryINR, job.salaryPeriod)}
                          </span>
                          <span className="text-[#D8D2C6]">•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#769FCD]" />
                            <span>{job.location}</span>
                          </span>
                          <span className="text-[#D8D2C6]">•</span>
                          <span className="px-2.5 py-0.5 rounded-lg bg-[#D6E6F2] border border-[#B9D7EA] text-[11px] font-mono font-bold text-[#141413]">
                            {job.workMode}
                          </span>
                          <span className="text-[#D8D2C6]">•</span>
                          <span>{job.experienceLevel}</span>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {job.mustHaveSkills.map((skill) => (
                            <SkillBadge key={skill} name={skill} />
                          ))}
                        </div>

                        {/* Footer / Apply action */}
                        <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#E8E2D8] text-xs">
                          <span className="text-[#74726A] font-mono text-[11px] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Posted {formatRelativeTime(job.publishedAt)}
                          </span>
                          <div className="flex items-center gap-2">
                            <Link href={`/jobs/${job.slug}`}>
                              <button className="px-5 py-2.5 rounded-xl bg-[#141413] hover:bg-[#769FCD] text-white font-extrabold text-xs shadow-[2px_2px_0px_#769FCD] hover:shadow-[3px_3px_0px_#5E8BBF] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center gap-1.5 transition-all cursor-pointer">
                                <Zap className="w-3.5 h-3.5 fill-current" />
                                <span>1-Touch Apply</span>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <Pagination
                  currentPage={currentPage}
                  totalPages={1}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer Filter Sheet */}
      <Drawer
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        title="Filter Opportunities"
        side="bottom"
      >
        <div className="py-2">
          <FilterControls />
          <div className="mt-6 pt-4 border-t border-[#E8E2D8]">
            <Button
              className="w-full bg-[#141413] hover:bg-[#769FCD] text-white rounded-xl"
              size="md"
              onClick={() => setMobileFilterOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </Drawer>

      {/* Auth Gate for Saving Jobs */}
      <AuthGateModal
        isOpen={authGateOpen}
        onClose={() => setAuthGateOpen(false)}
        title="Sign in to save this job"
        subtitle="Sign in with your verified profile to track this role, receive status notifications, and compare criteria alignment."
        jobTitle={targetJobToSave?.title}
        companyName={targetJobToSave?.org}
        onAuthenticated={() => {
          if (targetJobToSave) {
            setSavedJobIds((prev) => [...prev, targetJobToSave.id]);
            toggleSaveJob(targetJobToSave.id);
          }
        }}
      />

      <Footer />
    </div>
  );
}

export default function JobsSearchPage() {
  return (
    <React.Suspense fallback={<LoadingState message="Loading jobs marketplace..." className="min-h-screen bg-[#FAF7F2]" />}>
      <JobsSearchContent />
    </React.Suspense>
  );
}
