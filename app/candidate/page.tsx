"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MatchBadge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import {
  User,
  FileText,
  Search,
  Briefcase,
  CheckCircle2,
  Sparkles,
  Bot,
  BrainCircuit,
  Mic,
  TrendingUp,
  Award,
  ArrowRight,
  Upload,
  Download,
  Trash2,
  RefreshCw,
  Plus,
  Pencil,
  MapPin,
  Building2,
  Bookmark,
  Send,
  ShieldCheck,
  Zap,
  ChevronRight,
  BarChart3,
  GraduationCap,
} from "lucide-react";
import { useCandidate } from "@/lib/candidate/context/CandidateContext";
import { formatSalaryRange, formatRelativeTime } from "@/lib/utils";
import { MOCK_JOBS } from "@/lib/mocks/data";
import { Job } from "@/types";

export default function CandidatePage() {
  const router = useRouter();
  const {
    candidateRecord,
    completeness,
    matchedJobs,
    savedJobIds,
    applications,
    resumeDraft,
    toggleSaveJob,
    applyToJob,
    updateCandidateProfile,
    addExperience,
    deleteExperience,
    addEducation,
    deleteEducation,
    addSkill,
    deleteSkill,
    loadDemoCandidate,
  } = useCandidate();

  // Selected Tab State
  const [activeTab, setActiveTab] = useState<
    "overview" | "profile" | "resume" | "jobs" | "agent" | "matching" | "career" | "assessments" | "interview" | "rag"
  >("overview");

  // Stepper Stage state
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Job Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedJobType, setSelectedJobType] = useState("All");
  const [applyingJob, setApplyingJob] = useState<Job | null>(null);
  const [applyNote, setApplyNote] = useState("");
  const [applySuccess, setApplySuccess] = useState(false);

  // Resume Upload / Simulation state
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [resumeParsedSuccess, setResumeParsedSuccess] = useState(false);

  // Profile Form state (Personal Info)
  const [editMode, setEditMode] = useState(false);
  const [fullName, setFullName] = useState(candidateRecord?.identity.fullName || "Candidate");
  const [headline, setHeadline] = useState(candidateRecord?.profile.headline || "Senior Full-Stack Engineer");
  const [location, setLocation] = useState(candidateRecord?.profile.location || "Bengaluru, India");

  // Experience Form Modal State
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [expTitle, setExpTitle] = useState("");
  const [expCompany, setExpCompany] = useState("");

  // Skill Add State
  const [newSkill, setNewSkill] = useState("");

  // Agent Interactive State
  const [selectedAgent, setSelectedAgent] = useState("Job Agent");
  const [agentPrompt, setAgentPrompt] = useState("");
  const [agentLogs, setAgentLogs] = useState<string[]>([
    "🤖 Candidate Agent initialized with 6 sub-agents.",
    "👤 Profile Agent: Synchronized candidate skills (React, TypeScript, Next.js).",
    "🎯 Job Agent: Found 4 high-match jobs in Bengaluru matching candidate preferences.",
    "📄 Resume Agent: ATS compatibility calculated at 94%.",
  ]);
  const [humanApprovalRequired, setHumanApprovalRequired] = useState(false);
  const [pendingActionText, setPendingActionText] = useState("");

  if (!candidateRecord) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#D6E6F2] text-[#141413] flex items-center justify-center font-black text-xl">
          TAG
        </div>
        <h2 className="text-xl font-bold text-[#141413]">Candidate Experience Portal Demo</h2>
        <p className="text-xs text-[#141413]/70 max-w-md">
          Experience the full candidate workflow, AI resume parser, match engine, interview simulator, and autonomous AI agents.
        </p>
        <div className="flex items-center gap-3 mt-2">
          <Button variant="primary" size="md" onClick={() => loadDemoCandidate("ananya")}>
            Launch Candidate Demo
          </Button>
          <Link href="/onboarding">
            <Button variant="outline" size="md">
              Start Onboarding
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Stepper Items
  const workflowSteps = [
    { step: 1, label: "Candidate", description: "Identity & Portal Hub", tab: "overview" },
    { step: 2, label: "Profile", description: "Personal & Experience", tab: "profile" },
    { step: 3, label: "Resume", description: "Upload & AI Parsing", tab: "resume" },
    { step: 4, label: "Search Jobs", description: "Browse & Match", tab: "jobs" },
    { step: 5, label: "Apply", description: "Instant Submission", tab: "jobs" },
    { step: 6, label: "Track Application", description: "Pipeline Status", tab: "overview" },
  ];

  // AI Sub-Agents Data
  const subAgents = [
    { name: "Profile Agent", icon: <User className="w-4 h-4 text-[#769FCD]" />, desc: "Manages identity, bio, and skills sync" },
    { name: "Resume Agent", icon: <FileText className="w-4 h-4 text-[#769FCD]" />, desc: "Extracts data, parses PDFs & optimizes ATS" },
    { name: "Job Agent", icon: <Search className="w-4 h-4 text-[#769FCD]" />, desc: "Matches jobs, evaluates compatibility" },
    { name: "Skill Agent", icon: <Award className="w-4 h-4 text-[#141413]" />, desc: "Detects skill gaps & verifies badges" },
    { name: "Interview Agent", icon: <Mic className="w-4 h-4 text-[#769FCD]" />, desc: "Simulates STAR interviews & scores" },
    { name: "Career Agent", icon: <TrendingUp className="w-4 h-4 text-[#769FCD]" />, desc: "Builds 12-month career growth roadmaps" },
  ];

  // Filter Jobs
  const filteredJobs = MOCK_JOBS.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.organizationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.mustHaveSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLocation =
      selectedLocation === "All" || job.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesType = selectedJobType === "All" || job.workMode === selectedJobType;

    return matchesSearch && matchesLocation && matchesType;
  });

  const handleApplyClick = (job: Job) => {
    setApplyingJob(job);
    setApplyNote("");
    setApplySuccess(false);
  };

  const handleConfirmApply = () => {
    if (!applyingJob) return;
    applyToJob(applyingJob.id, applyNote || "Excited to apply for this role!");
    setApplySuccess(true);
    setTimeout(() => {
      setApplyingJob(null);
      setApplySuccess(false);
    }, 1500);
  };

  const handleSimulateResumeUpload = () => {
    setIsUploadingResume(true);
    setTimeout(() => {
      setIsUploadingResume(false);
      setResumeParsedSuccess(true);
      setTimeout(() => setResumeParsedSuccess(false), 3000);
    }, 1200);
  };

  const handleAddExperienceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle || !expCompany) return;
    addExperience({
      company: expCompany,
      title: expTitle,
      location: "Bengaluru, India",
      startDate: "2023",
      endDate: "Present",
      current: true,
      description: "Leading frontend architecture and responsive component development.",
      skillsUsed: ["React", "TypeScript", "Next.js"],
    });
    setExpTitle("");
    setExpCompany("");
    setIsExpModalOpen(false);
  };

  const handleAddSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    addSkill({ name: newSkill.trim(), level: "comfortable" });
    setNewSkill("");
  };

  const handleAgentPromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentPrompt.trim()) return;
    const promptText = agentPrompt;
    setAgentPrompt("");

    setAgentLogs((prev) => [...prev, `💬 Candidate: "${promptText}"`]);

    setTimeout(() => {
      setAgentLogs((prev) => [
        ...prev,
        `⚡ ${selectedAgent} executing task: Analyzing profile and cross-referencing market data...`,
      ]);

      if (promptText.toLowerCase().includes("apply") || promptText.toLowerCase().includes("submit")) {
        setPendingActionText(`Submit application to Senior Frontend Engineer at TechCorp`);
        setHumanApprovalRequired(true);
      } else {
        setTimeout(() => {
          setAgentLogs((prev) => [
            ...prev,
            `✅ ${selectedAgent}: Task complete. Generated personalized strategy and updated memory state.`,
          ]);
        }, 800);
      }
    }, 500);
  };

  const handleApproveAction = () => {
    setHumanApprovalRequired(false);
    setAgentLogs((prev) => [
      ...prev,
      `👍 Human Approved: "${pendingActionText}"`,
      `🚀 Candidate Agent: Action executed successfully! Application registered in database.`,
    ]);
    setPendingActionText("");
  };

  const profileScore = completeness?.score || 85;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-16">
      {/* 1. Clean, Minimal Editorial Profile Header */}
      <div className="bg-white border border-[#E2DDD3] rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(26,40,56,0.04)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Identity Section */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#141413] text-white flex items-center justify-center font-black text-2xl font-display shadow-2xs shrink-0 border border-[#E8E2D8]">
              {candidateRecord.identity.fullName.charAt(0)}
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-[#141413] font-display">
                  {candidateRecord.identity.fullName}
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Open to Opportunities</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#74726A] font-medium">
                {candidateRecord.profile.headline}
              </p>
              <div className="flex items-center gap-3 text-xs text-[#74726A] mt-1 flex-wrap font-mono">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#769FCD]" />
                  <span>{candidateRecord.profile.location || "Bengaluru, India"}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#769FCD]" />
                  <span>ATS Score: <strong className="text-[#141413] font-black">94%</strong></span>
                </span>
                <span>•</span>
                <span className="text-[#769FCD] font-bold">1-Touch Stealth Active</span>
              </div>
            </div>
          </div>

          {/* Profile Health Mini-Panel */}
          <div className="flex flex-col gap-2.5 min-w-[280px] bg-[#FAF7F2] p-4.5 rounded-2xl border border-[#E8E2D8]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#141413] font-bold font-display">Profile Readiness</span>
              <span className="font-mono font-black text-[#769FCD]">{profileScore}%</span>
            </div>
            <div className="w-full bg-[#E8E2D8] rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#769FCD] h-2 rounded-full transition-all duration-500"
                style={{ width: `${profileScore}%` }}
              />
            </div>
            <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-[#74726A]">
              <span>Applications: <strong className="text-[#141413]">{applications.length}</strong></span>
              <span>Saved: <strong className="text-[#141413]">{savedJobIds.length}</strong></span>
              <span className="text-[#769FCD] font-bold">Matched: {matchedJobs.length}</span>
            </div>
          </div>
        </div>

        {/* Minimalist Workflow Progression Track */}
        <div className="mt-6 pt-5 border-t border-[#E8E2D8]">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-mono font-bold text-[11px] uppercase tracking-wider text-[#74726A] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#769FCD] fill-[#769FCD]" />
              Candidate Progression Pipeline
            </span>
            <span className="text-[11px] font-mono text-[#74726A]">Tap stage to jump</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {workflowSteps.map((stepItem) => {
              const isActive = currentStep === stepItem.step;
              return (
                <button
                  key={stepItem.step}
                  onClick={() => {
                    setCurrentStep(stepItem.step);
                    setActiveTab(stepItem.tab as any);
                  }}
                  className={`flex flex-col text-left p-3 rounded-2xl border transition-all text-xs cursor-pointer ${
                    isActive
                      ? "bg-[#141413] border-[#141413] text-white shadow-xs"
                      : "bg-[#FAF7F2] border-[#E8E2D8] text-[#5A5850] hover:border-[#769FCD] hover:text-[#141413]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isActive ? "bg-white/20 text-white" : "bg-white text-[#74726A] border border-[#E8E2D8]"
                    }`}>
                      0{stepItem.step}
                    </span>
                    {isActive ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#769FCD]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D8D2C6]" />
                    )}
                  </div>
                  <span className="font-bold text-xs mt-0.5">{stepItem.label}</span>
                  <span className={`text-[10px] truncate mt-0.5 ${isActive ? "text-white/70" : "text-[#74726A]"}`}>
                    {stepItem.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Clean Streamlined Tab Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none p-1.5 rounded-2xl bg-white border border-[#E8E2D8] shadow-2xs">
        {[
          { id: "overview", label: "Overview & Launchpad", icon: <BarChart3 className="w-4 h-4" /> },
          { id: "profile", label: "Profile & Experience", icon: <User className="w-4 h-4" /> },
          { id: "resume", label: "Resume Hub", icon: <FileText className="w-4 h-4" /> },
          { id: "jobs", label: "Job Search & Apply", icon: <Search className="w-4 h-4" /> },
          { id: "agent", label: "Candidate AI Agent", icon: <Bot className="w-4 h-4" />, badge: "6 Agents" },
          { id: "matching", label: "AI Job Matching", icon: <Sparkles className="w-4 h-4" /> },
          { id: "interview", label: "AI Interviewer", icon: <Mic className="w-4 h-4" /> },
          { id: "rag", label: "RAG Assistant", icon: <BrainCircuit className="w-4 h-4" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#141413] text-white shadow-xs"
                  : "text-[#74726A] hover:text-[#141413] hover:bg-[#FAF7F2]"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                  isActive ? "bg-[#769FCD] text-white" : "bg-[#D6E6F2] text-[#141413] border border-[#E8E2D8]"
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT AREAS */}

      {/* 1. OVERVIEW & LAUNCHPAD TAB */}
      {activeTab === "overview" && (
        <div className="flex flex-col gap-8">
          {/* Top Trio Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Match Engine */}
            <div className="bg-white border border-[#E2DDD3] hover:border-[#769FCD] rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(26,40,56,0.04)] hover:shadow-[0_12px_32px_rgba(118,159,205,0.12)] transition-all hover:-translate-y-0.5 flex flex-col justify-between gap-5 group">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#74726A]">
                    AI Match Engine
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#D6E6F2] border border-[#E8E2D8] flex items-center justify-center text-[#769FCD] group-hover:scale-105 transition-transform">
                    <Sparkles className="w-4.5 h-4.5" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-[#141413] font-display mt-1">
                  {matchedJobs.length} High-Match Jobs
                </h3>
                <p className="text-xs text-[#5A5850] leading-relaxed">
                  Roles exceeding 85% criteria vector overlap based on your verified tech stack.
                </p>
              </div>
              <button
                className="w-full py-2.5 rounded-xl bg-[#141413] hover:bg-[#769FCD] text-white font-extrabold text-xs shadow-[2px_2px_0px_#769FCD] hover:shadow-[3px_3px_0px_#5E8BBF] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                onClick={() => setActiveTab("jobs")}
              >
                <span>Browse Matched Jobs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2: Autonomous Agent */}
            <div className="bg-white border border-[#E2DDD3] hover:border-[#769FCD] rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(26,40,56,0.04)] hover:shadow-[0_12px_32px_rgba(118,159,205,0.12)] transition-all hover:-translate-y-0.5 flex flex-col justify-between gap-5 group">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#74726A]">
                    Autonomous Agent
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#D6E6F2] border border-[#E8E2D8] flex items-center justify-center text-[#769FCD] group-hover:scale-105 transition-transform">
                    <Bot className="w-4.5 h-4.5" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-[#141413] font-display mt-1">
                  Candidate AI Agent
                </h3>
                <p className="text-xs text-[#5A5850] leading-relaxed">
                  6 coordinated sub-agents executing profile sync, resume ATS optimization, and match screening.
                </p>
              </div>
              <button
                className="w-full py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#D6E6F2] text-[#141413] border border-[#E8E2D8] hover:border-[#769FCD] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                onClick={() => setActiveTab("agent")}
              >
                <span>Launch Agent Console</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#769FCD]" />
              </button>
            </div>

            {/* Card 3: Interactive Prep */}
            <div className="bg-white border border-[#E2DDD3] hover:border-[#769FCD] rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(26,40,56,0.04)] hover:shadow-[0_12px_32px_rgba(118,159,205,0.12)] transition-all hover:-translate-y-0.5 flex flex-col justify-between gap-5 group">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#74726A]">
                    Interactive Prep
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#D6E6F2] border border-[#E8E2D8] flex items-center justify-center text-[#769FCD] group-hover:scale-105 transition-transform">
                    <Mic className="w-4.5 h-4.5" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-[#141413] font-display mt-1">
                  AI Interview Simulator
                </h3>
                <p className="text-xs text-[#5A5850] leading-relaxed">
                  Practice STAR interview questions with real-time feedback, speech analysis, and scoring.
                </p>
              </div>
              <button
                className="w-full py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#D6E6F2] text-[#141413] border border-[#E8E2D8] hover:border-[#769FCD] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                onClick={() => setActiveTab("interview")}
              >
                <span>Start Practice Session</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#769FCD]" />
              </button>
            </div>
          </div>

          {/* Quick Action Navigation Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Candidate Profile",
                desc: "Personal info, experience, education & skills CRUD",
                icon: <User className="w-4.5 h-4.5 text-[#769FCD]" />,
                tab: "profile",
              },
              {
                title: "Resume Manager",
                desc: "Upload, view, download, replace & delete resume",
                icon: <FileText className="w-4.5 h-4.5 text-[#769FCD]" />,
                tab: "resume",
              },
              {
                title: "Job Search & Apply",
                desc: "Filter by location, job type, salary & skills",
                icon: <Search className="w-4.5 h-4.5 text-[#769FCD]" />,
                tab: "jobs",
              },
              {
                title: "RAG Career Assistant",
                desc: "RAG-grounded candidate Q&A knowledge base",
                icon: <BrainCircuit className="w-4.5 h-4.5 text-[#769FCD]" />,
                tab: "rag",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white border border-[#E2DDD3] hover:border-[#769FCD] rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between gap-4 group"
                onClick={() => setActiveTab(feature.tab as any)}
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] group-hover:bg-[#D6E6F2]/40 transition-colors">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-[#141413] font-display group-hover:text-[#769FCD] transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-[#5A5850] mt-1 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-[#769FCD] font-mono font-bold pt-2 border-t border-[#E8E2D8]/60">
                  <span>Open Tool</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Recent Applications Tracker */}
          <div className="bg-white border border-[#E2DDD3] rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(26,40,56,0.04)] flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
              <div className="flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-[#769FCD]" />
                <h3 className="font-black text-base text-[#141413] font-display">
                  Application Tracking Pipeline
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-[#74726A]">
                Total Applied: <strong className="text-[#141413]">{applications.length}</strong>
              </span>
            </div>

            {applications.length === 0 ? (
              <div className="p-8 text-center bg-[#FAF7F2] rounded-2xl border border-dashed border-[#E8E2D8] flex flex-col items-center gap-3">
                <p className="text-xs text-[#74726A] font-medium">No job applications submitted yet.</p>
                <button
                  className="px-4 py-2 rounded-xl bg-[#141413] hover:bg-[#769FCD] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  onClick={() => setActiveTab("jobs")}
                >
                  Explore Jobs &amp; Apply
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-2xl border border-[#E8E2D8] bg-[#FAF7F2] hover:border-[#769FCD] flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#141413] text-white flex items-center justify-center font-black text-sm font-display">
                        {app.jobTitle.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#141413]">{app.jobTitle}</h4>
                        <p className="text-xs font-mono text-[#74726A]">
                          {app.organizationName} • Applied {formatRelativeTime(app.appliedAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs px-3 py-1 rounded-full font-mono font-bold bg-[#D6E6F2] text-[#141413] border border-[#E8E2D8]">
                        {app.stage.toUpperCase()}
                      </span>
                      <button
                        className="px-3.5 py-1.5 rounded-xl border border-[#E8E2D8] hover:border-[#769FCD] bg-white text-xs font-bold text-[#141413] transition-colors cursor-pointer"
                        onClick={() => router.push(`/candidate/applications`)}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. PROFILE & EXPERIENCE TAB */}
      {activeTab === "profile" && (
        <div className="flex flex-col gap-6">
          {/* Identity & Personal Info Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Personal Information
              </h3>
              <Button
                size="sm"
                variant={editMode ? "primary" : "outline"}
                onClick={() => {
                  if (editMode) {
                    updateCandidateProfile({ headline, location });
                  }
                  setEditMode(!editMode);
                }}
              >
                {editMode ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Save Changes
                  </>
                ) : (
                  <>
                    <Pencil className="w-4 h-4 mr-1" /> Edit Profile
                  </>
                )}
              </Button>
            </div>

            {editMode ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Headline</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-400 block font-medium">Full Name</span>
                  <strong className="text-slate-900 text-sm mt-0.5 block">{fullName}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-400 block font-medium">Headline</span>
                  <strong className="text-slate-900 text-sm mt-0.5 block">{headline}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-slate-400 block font-medium">Location</span>
                  <strong className="text-slate-900 text-sm mt-0.5 block">{location}</strong>
                </div>
              </div>
            )}
          </Card>

          {/* Work Experience CRUD */}
          <Card className="p-6 border-[#E8E2D8]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-base text-[#141413] flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#769FCD]" />
                Work Experience (CRUD)
              </h3>
              <Button size="sm" variant="outline" onClick={() => setIsExpModalOpen(true)}>
                <Plus className="w-4 h-4 mr-1" /> Add Experience
              </Button>
            </div>

            <div className="flex flex-col gap-3">
              {candidateRecord.profile.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="p-4 rounded-xl border border-[#E8E2D8] bg-white flex items-start justify-between gap-4"
                >
                  <div>
                    <h4 className="font-bold text-sm text-[#141413]">{exp.title}</h4>
                    <p className="text-xs font-semibold text-[#769FCD]">{exp.company}</p>
                    <span className="text-[11px] text-[#141413]/60">
                      {exp.startDate} – {exp.endDate || "Present"}
                    </span>
                    <p className="text-xs text-[#141413]/70 mt-2 leading-relaxed">{exp.description}</p>
                  </div>
                  <button
                    onClick={() => deleteExperience(exp.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Skills CRUD */}
          <Card className="p-6">
            <h3 className="font-extrabold text-base text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              Technical & Functional Skills (CRUD)
            </h3>

            <form onSubmit={handleAddSkillSubmit} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a new skill (e.g. Next.js, GraphQL, Docker)..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button type="submit" size="sm" variant="primary">
                Add Skill
              </Button>
            </form>

            <div className="flex flex-wrap gap-2">
              {candidateRecord.profile.skills.map((skillItem, idx) => {
                const skillName = typeof skillItem === "string" ? skillItem : skillItem.name;
                return (
                  <span
                    key={skillName || idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200"
                  >
                    {skillName}
                    <button
                      onClick={() => deleteSkill(skillName)}
                      className="text-slate-400 hover:text-red-600"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          </Card>

          {/* Education CRUD */}
          <Card className="p-6">
            <h3 className="font-extrabold text-base text-slate-900 mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
              Education & Certifications
            </h3>
            <div className="flex flex-col gap-3">
              {candidateRecord.profile.education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      {edu.degree} in {edu.fieldOfStudy}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {edu.institution} • {edu.startYear} – {edu.endYear}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteEducation(edu.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* 3. RESUME HUB TAB */}
      {activeTab === "resume" && (
        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  Resume Management & AI Extraction
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Upload, inspect, parse, and download your primary ATS resume.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleSimulateResumeUpload}
                  disabled={isUploadingResume}
                >
                  {isUploadingResume ? (
                    <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4 mr-1" />
                  )}
                  {isUploadingResume ? "Parsing PDF..." : "Upload New Resume"}
                </Button>

                <Button size="sm" variant="outline" onClick={() => alert("Downloading active ATS resume PDF...")}>
                  <Download className="w-4 h-4 mr-1" /> Download PDF
                </Button>
              </div>
            </div>

            {resumeParsedSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Resume uploaded & parsed successfully! Extracted skills and 4 years of experience.
              </div>
            )}

            {/* Resume Preview Window */}
            <div className="p-6 rounded-2xl bg-[#1A2838] text-white font-mono text-xs leading-relaxed overflow-x-auto border border-[#E8E2D8]/30 shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]/20 mb-4 font-sans text-xs">
                <span className="text-[#B9D7EA] font-bold flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#769FCD]" />
                  {`${(candidateRecord?.identity.fullName || "Candidate").replace(/\s+/g, "_")}_Resume.pdf`}
                </span>
                <span className="text-[#D6E6F2]/60 text-[11px]">Last Updated: 2 Hours Ago</span>
              </div>

              <p className="text-white font-bold text-sm font-sans mb-1">{candidateRecord.identity.fullName}</p>
              <p className="text-[#D6E6F2]/80 text-xs font-sans mb-4">{candidateRecord.profile.headline}</p>

              <div className="text-[#B9D7EA] mb-2">// SUMMARY</div>
              <p className="text-[#D6E6F2] mb-4 font-sans leading-normal">
                {candidateRecord.profile.summary}
              </p>

              <div className="text-[#B9D7EA] mb-2">// EXTRACTED SKILLS</div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {candidateRecord.profile.skills.map((s, idx) => {
                  const sName = typeof s === "string" ? s : s.name;
                  return (
                    <span key={sName || idx} className="px-2 py-0.5 rounded bg-[#141F2C] text-[#B9D7EA] border border-[#E8E2D8]/20 font-sans text-[11px]">
                      {sName}
                    </span>
                  );
                })}
              </div>

              <div className="text-[#B9D7EA] mb-2">// ATS COMPATIBILITY METRICS</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans mt-2">
                <div className="p-3 rounded-xl bg-[#141F2C] border border-[#E8E2D8]/20">
                  <span className="text-[#D6E6F2]/70 text-[10px]">Readability Index</span>
                  <span className="text-white font-extrabold text-sm block">98/100</span>
                </div>
                <div className="p-3 rounded-xl bg-[#141F2C] border border-[#E8E2D8]/20">
                  <span className="text-[#D6E6F2]/70 text-[10px]">Keyword Match Rate</span>
                  <span className="text-[#B9D7EA] font-extrabold text-sm block">92%</span>
                </div>
                <div className="p-3 rounded-xl bg-[#141F2C] border border-[#E8E2D8]/20">
                  <span className="text-[#D6E6F2]/70 text-[10px]">Format Compliance</span>
                  <span className="text-white font-extrabold text-sm block">Passed</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 4. SEARCH JOBS & APPLY TAB */}
      {activeTab === "jobs" && (
        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <h3 className="font-extrabold text-base text-slate-900 mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-emerald-600" />
              Interactive Job Search & Filters
            </h3>

            {/* Search inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <input
                type="text"
                placeholder="Job title, company or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
              >
                <option value="All">All Locations</option>
                <option value="Bengaluru">Bengaluru, India</option>
                <option value="Remote">Remote</option>
                <option value="San Francisco">San Francisco, CA</option>
              </select>

              <select
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
              >
                <option value="All">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            {/* Job Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredJobs.map((job) => {
                const isSaved = savedJobIds.includes(job.id);
                const hasApplied = applications.some((a) => a.jobId === job.id);

                return (
                  <div
                    key={job.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-white hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <h4 className="font-extrabold text-base text-slate-900">{job.title}</h4>
                          <p className="text-xs font-semibold text-slate-600">{job.organizationName}</p>
                        </div>
                        <MatchBadge score={job.matchScore || 88} />
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 flex-wrap">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          {job.workMode}
                        </span>
                        {job.minSalaryINR && job.maxSalaryINR && (
                          <span className="font-bold text-slate-700">
                            {formatSalaryRange(job.minSalaryINR, job.maxSalaryINR)}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {job.mustHaveSkills.slice(0, 4).map((skill) => (
                          <span key={skill} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                          isSaved
                            ? "bg-amber-50 border-amber-300 text-amber-700"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>

                      {hasApplied ? (
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Applied
                        </span>
                      ) : (
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => handleApplyClick(job)}
                        >
                          Apply Now <Send className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {/* 5. CANDIDATE AI AGENT TAB */}
      {activeTab === "agent" && (
        <div className="flex flex-col gap-6">
          <Card className="p-6 bg-[#1A2838] text-white border-[#E8E2D8]/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E8E2D8]/20">
              <div>
                <div className="flex items-center gap-2">
                  <Bot className="w-6 h-6 text-[#769FCD]" />
                  <h3 className="font-extrabold text-lg text-white">Autonomous Candidate AI Agent</h3>
                </div>
                <p className="text-xs text-[#D6E6F2]/70 mt-1">
                  Single unified master agent with 6 specialized sub-agents & human-in-the-loop approval.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-[#141F2C] p-1.5 rounded-xl border border-[#E8E2D8]/20">
                <span className="text-xs text-[#D6E6F2]/70 pl-2">Active Sub-Agent:</span>
                <select
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  className="bg-[#1A2838] text-[#D6E6F2] text-xs font-bold px-3 py-1.5 rounded-lg border border-[#E8E2D8]/30 focus:outline-none cursor-pointer"
                >
                  {subAgents.map((sa) => (
                    <option key={sa.name} value={sa.name}>
                      {sa.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sub-Agents Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              {subAgents.map((sa) => {
                const isSel = selectedAgent === sa.name;
                return (
                  <button
                    key={sa.name}
                    onClick={() => setSelectedAgent(sa.name)}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      isSel
                        ? "bg-[#769FCD]/30 border-[#769FCD] text-white shadow-lg ring-1 ring-[#769FCD]"
                        : "bg-[#141F2C] border-[#E8E2D8]/20 text-[#D6E6F2]/70 hover:bg-[#769FCD]/10 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      {sa.icon}
                      <span className="w-2 h-2 rounded-full bg-[#769FCD] animate-pulse" />
                    </div>
                    <span className="font-bold text-xs">{sa.name}</span>
                    <span className="text-[10px] text-[#D6E6F2]/60 truncate mt-0.5">{sa.desc}</span>
                  </button>
                );
              })}
            </div>

            {/* Agent Live Feed */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs flex flex-col gap-2 max-h-64 overflow-y-auto mb-4">
              <span className="text-slate-500 text-[10px] uppercase tracking-wider font-sans border-b border-slate-800 pb-1">
                // Agent Tool Call & Execution Memory
              </span>
              {agentLogs.map((log, index) => (
                <p key={index} className="text-slate-300 leading-relaxed">
                  {log}
                </p>
              ))}
            </div>

            {/* Prompt Command Bar */}
            <form onSubmit={handleAgentPromptSubmit} className="flex gap-2">
              <input
                type="text"
                value={agentPrompt}
                onChange={(e) => setAgentPrompt(e.target.value)}
                placeholder={`Ask ${selectedAgent} (e.g. "Find high-salary Next.js jobs in Bengaluru and submit application")...`}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
              />
              <Button type="submit" size="sm" variant="primary">
                Execute Agent <Send className="w-3.5 h-3.5 ml-1" />
              </Button>
            </form>
          </Card>
        </div>
      )}

      {/* 6. AI JOB MATCHING TAB */}
      {activeTab === "matching" && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              AI Profile & Job Match Explanation Engine
            </h3>
            <span className="text-xs text-slate-500">Algorithm: TAG Vector Semantic Match 2026</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchedJobs.slice(0, 4).map((matchItem, idx) => {
              const matchedJob = matchItem.job;
              const matchScore = matchItem.score || 90;
              return (
                <div key={matchedJob.id || idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-sm text-slate-900">{matchedJob.title}</h4>
                      <MatchBadge score={matchScore} />
                    </div>
                    <p className="text-xs text-[#141413]/70 font-medium mb-3">{matchedJob.organizationName} • {matchedJob.location}</p>

                    <div className="p-3 rounded-xl bg-white border border-[#E8E2D8] text-xs text-[#141413] leading-relaxed mb-3">
                      <strong className="text-[#141413] block mb-1">💡 Match Reason:</strong>
                      "{matchItem.matchReasons[0] || 'Strong overlap in React, TypeScript, and micro-frontend architecture.'}"
                    </div>
                  </div>

                  <Button size="sm" variant="primary" className="w-full" onClick={() => handleApplyClick(matchedJob)}>
                    Apply with AI Match Score ({matchScore}%)
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* 7. CAREER INTELLIGENCE TAB */}
      {activeTab === "career" && (
        <Card className="p-6 border-[#E8E2D8]">
          <h3 className="font-extrabold text-base text-[#141413] mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#769FCD]" />
            Skill Gap & 12-Month Career Progression Roadmap
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-[#D6E6F2]/40 border border-[#E8E2D8]">
              <h4 className="font-bold text-xs text-[#141413] uppercase">Target Role</h4>
              <p className="text-lg font-black text-[#141413] mt-1">Staff Frontend Architect</p>
              <span className="text-xs text-[#769FCD] mt-2 block font-semibold">Estimated Timeline: 12 Months</span>
            </div>

            <div className="p-4 rounded-xl bg-[#D6E6F2]/30 border border-[#E8E2D8]">
              <h4 className="font-bold text-xs text-[#141413] uppercase">Skill Gap Identified</h4>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="px-2 py-0.5 rounded bg-[#D6E6F2] text-[#141413] border border-[#E8E2D8] text-xs font-bold">GraphQL Federation</span>
                <span className="px-2 py-0.5 rounded bg-[#D6E6F2] text-[#141413] border border-[#E8E2D8] text-xs font-bold">WebAssembly</span>
                <span className="px-2 py-0.5 rounded bg-[#D6E6F2] text-[#141413] border border-[#E8E2D8] text-xs font-bold">Performance CWV</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#D6E6F2]/40 border border-[#E8E2D8]">
              <h4 className="font-bold text-xs text-[#141413] uppercase">Projected Compensation Increase</h4>
              <p className="text-lg font-black text-[#141413] mt-1">+35% (₹38L – ₹48L PA)</p>
              <span className="text-xs text-[#769FCD] mt-2 block font-semibold">Based on India Tech Report 2026</span>
            </div>
          </div>
        </Card>
      )}

      {/* 8. SKILL ASSESSMENTS TAB */}
      {activeTab === "assessments" && (
        <Card className="p-6 border-[#E8E2D8]">
          <h3 className="font-extrabold text-base text-[#141413] mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#769FCD]" />
            Skill Assessments & Verified Badges
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "React 19 & Next.js Architecture", duration: "15 Mins", questions: "10 MCQs", status: "Verified 95%" },
              { title: "TypeScript & Type Safety", duration: "12 Mins", questions: "8 MCQs", status: "Verified 92%" },
              { title: "Frontend Performance & CWV", duration: "20 Mins", questions: "12 MCQs", status: "Take Quiz" },
            ].map((quiz, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#E8E2D8] bg-white flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#141413]">{quiz.title}</h4>
                  <p className="text-xs text-[#141413]/60 mt-1">{quiz.duration} • {quiz.questions}</p>
                </div>
                <Button size="sm" variant={quiz.status.includes("Verified") ? "outline" : "primary"} className="mt-4 w-full">
                  {quiz.status}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 9. AI INTERVIEW SIMULATOR TAB */}
      {activeTab === "interview" && (
        <Card className="p-6 border-[#E8E2D8]">
          <h3 className="font-extrabold text-base text-[#141413] mb-4 flex items-center gap-2">
            <Mic className="w-5 h-5 text-[#769FCD]" />
            AI STAR Method Interview Simulator
          </h3>
          <div className="p-6 rounded-2xl bg-[#1A2838] text-white flex flex-col items-center justify-center text-center gap-4 border border-[#E8E2D8]/30">
            <div className="w-16 h-16 rounded-full bg-[#769FCD]/30 border border-[#E8E2D8]/40 flex items-center justify-center text-[#B9D7EA] animate-pulse">
              <Mic className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-extrabold text-lg text-white">Interview Question:</h4>
              <p className="text-xs text-[#D6E6F2]/80 max-w-md mt-1 italic">
                "Describe a situation where you optimized performance for a Next.js application facing high traffic."
              </p>
            </div>
            <Button variant="primary" size="md" onClick={() => alert("Simulating audio recording & STAR analysis...")}>
              Start Audio Response Recording
            </Button>
          </div>
        </Card>
      )}

      {/* 10. RAG CAREER ASSISTANT TAB */}
      {activeTab === "rag" && (
        <Card className="p-6 border-[#E8E2D8]">
          <h3 className="font-extrabold text-base text-[#141413] mb-4 flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-[#769FCD]" />
            RAG Grounded Career Assistant
          </h3>
          <div className="p-4 rounded-2xl bg-[#1A2838] text-white font-mono text-xs flex flex-col gap-3 border border-[#E8E2D8]/30">
            <div className="p-3 rounded-xl bg-[#141F2C] text-[#D6E6F2]">
              💬 <strong className="text-[#B9D7EA]">Candidate:</strong> "What salary expectation should I set for a Senior Frontend role in Bengaluru?"
            </div>
            <div className="p-3 rounded-xl bg-[#D6E6F2]/10 border border-[#E8E2D8]/30 text-[#D6E6F2]">
              🤖 <strong className="text-[#B9D7EA]">RAG Assistant:</strong> Based on the <em>[India Tech Compensation Report 2026]</em>, candidate with 4+ years in React/Next.js commands ₹28L – ₹36L base salary.
            </div>
          </div>
        </Card>
      )}

      {/* APPLY JOB MODAL */}
      {applyingJob && (
        <Modal
          isOpen={Boolean(applyingJob)}
          onClose={() => setApplyingJob(null)}
          title={`Apply to ${applyingJob.title}`}
        >
          <div className="flex flex-col gap-4 text-xs">
            <p className="text-slate-600">
              Applying to <strong>{applyingJob.organizationName}</strong> ({applyingJob.location}).
            </p>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Cover Note / Remarks</label>
              <textarea
                value={applyNote}
                onChange={(e) => setApplyNote(e.target.value)}
                placeholder="Why are you a great fit for this position?..."
                className="w-full h-24 p-3 rounded-xl border border-slate-300 font-sans focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {applySuccess ? (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Application Submitted!
              </div>
            ) : (
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => setApplyingJob(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleConfirmApply}>
                  Submit Application
                </Button>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* ADD EXPERIENCE MODAL */}
      {isExpModalOpen && (
        <Modal
          isOpen={isExpModalOpen}
          onClose={() => setIsExpModalOpen(false)}
          title="Add Work Experience"
        >
          <form onSubmit={handleAddExperienceSubmit} className="flex flex-col gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Job Title</label>
              <input
                type="text"
                required
                value={expTitle}
                onChange={(e) => setExpTitle(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Company Name</label>
              <input
                type="text"
                required
                value={expCompany}
                onChange={(e) => setExpCompany(e.target.value)}
                placeholder="e.g. TechCorp Inc."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsExpModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save Experience
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* HUMAN APPROVAL MODAL */}
      {humanApprovalRequired && (
        <Modal
          isOpen={humanApprovalRequired}
          onClose={() => setHumanApprovalRequired(false)}
          title="⚠️ Human Approval Required"
        >
          <div className="flex flex-col gap-4 text-xs">
            <p className="text-slate-700 leading-relaxed">
              The <strong>Candidate AI Agent</strong> requests your explicit confirmation before taking this high-stakes action:
            </p>
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold">
              {pendingActionText}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setHumanApprovalRequired(false);
                  setAgentLogs((prev) => [...prev, `❌ Human Rejected action: "${pendingActionText}"`]);
                }}
              >
                Reject Action
              </Button>
              <Button variant="primary" size="sm" onClick={handleApproveAction}>
                Approve Action
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
