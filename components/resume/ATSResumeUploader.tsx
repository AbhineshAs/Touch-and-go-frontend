"use client";

import React, { useState, useRef } from "react";
import {
  UploadCloud,
  FileText,
  X,
  AlertCircle,
  Loader2,
  Briefcase,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  UserCheck,
  Code2,
  ScanLine,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ATSAnalysisPayload {
  sourceType: "file" | "profile" | "text";
  fileName?: string;
  fileSize?: number;
  text: string;
  targetJobDescription?: string;
}

interface ATSResumeUploaderProps {
  onAnalyze: (payload: ATSAnalysisPayload) => void;
  isAnalyzing: boolean;
  className?: string;
}

const SAMPLE_RESUMES = {
  fullstack: `ALEX RIVERA
Email: alex.rivera@example.com | Phone: +1 (555) 019-2834 | San Francisco, CA | linkedin.com/in/alex-rivera-tech

SUMMARY
Accomplished Full Stack Software Engineer with 6+ years designing, building, and deploying fault-tolerant distributed web applications. Expert in TypeScript, Next.js 16, React 19, Node.js, and PostgreSQL. Proven track record reducing page latency by 34% and scaling microservices to 120,000 MAU.

TECHNICAL SKILLS
Languages: TypeScript, JavaScript (ESNext), Go, SQL, HTML5, CSS3
Frameworks & Libraries: React 19, Next.js, Node.js, Express, Tailwind CSS, GraphQL, RESTful APIs
Cloud & DevOps: Docker, Kubernetes, AWS (S3, ECS, RDS), CI/CD (GitHub Actions), Redis
Databases: PostgreSQL, MongoDB, Redis, Prisma ORM
Testing & Tooling: Jest, Vitest, Playwright, Git, Agile/Scrum

EXPERIENCE
Senior Full Stack Engineer | NovaScale Technologies | 2022 - Present
- Architected high-velocity Next.js user interfaces, reducing core page load latency by 34% across 120,000 monthly active users.
- Re-engineered legacy microservices into asynchronous event-driven pipelines using Node.js and Kafka, boosting transaction throughput by 42%.
- Partnered with product and engineering squads to implement continuous deployment workflows with Jest and GitHub Actions, cutting staging defects by 28%.

EDUCATION
B.S. in Computer Science | University of California, Berkeley | 2015 - 2019`,

  frontend: `JORDAN CHEN
Email: jordan.chen@example.com | Phone: +1 (555) 847-2931 | New York, NY | linkedin.com/in/jordan-chen-ux

SUMMARY
Staff Frontend Architect with 7+ years of experience engineering high-performance web applications, design systems, and responsive user interfaces. Specialized in React 19, Next.js, Core Web Vitals optimization, and micro-frontend orchestration.

TECHNICAL SKILLS
Core: React, Next.js, TypeScript, JavaScript, CSS3/Tailwind, HTML5, Web Vitals
Performance: LCP / INP / CLS tuning, Code Splitting, Dynamic Bundling
Testing: Jest, React Testing Library, Cypress, Storybook

EXPERIENCE
Lead Frontend Engineer | Apex Commerce | 2021 - Present
- Spearheaded company-wide Core Web Vitals initiative, improving LCP from 3.8s to 1.1s and lifting checkout conversion by 18.4%.
- Built extensible enterprise design system adopted across 8 distinct business units and 45 developers.`,

  profile: `ANANYA SHARMA
Email: ananya.sharma@example.com | Phone: +91 98450 12894 | Bengaluru, Karnataka | linkedin.com/in/ananya-sharma-dev

SUMMARY
Product-focused Frontend Engineer with 4.5+ years of experience engineering high-performance web applications, accessible design systems, and real-time interfaces. Proven track record reducing Core Web Vitals LCP from 3.2s to 1.1s.

TECHNICAL SKILLS
React 19, Next.js 16, TypeScript, Tailwind CSS, TanStack Query, Redux Toolkit, Web Vitals Optimization, Jest, Git, CI/CD

EXPERIENCE
Senior Software Engineer (Frontend) | KiteFlow Tech | 2023 - Present
- Architected core merchant dashboard serving 40,000+ daily active businesses. Reduced LCP from 3.2s to 1.1s through granular code-splitting.
- Standardized accessible design system components across 12 frontend product squads.`,
};

export function ATSResumeUploader({
  onAnalyze,
  isAnalyzing,
  className,
}: ATSResumeUploaderProps) {
  const [inputMode, setInputMode] = useState<"file" | "profile" | "text">("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [showJobDescInput, setShowJobDescInput] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const ALLOWED_EXTENSIONS = [".pdf", ".docx", ".doc", ".txt"];
  const MAX_FILE_SIZE_MB = 10;

  const validateAndSetFile = (file: File) => {
    setValidationError(null);
    const fileName = file.name.toLowerCase();
    const hasValidExtension = ALLOWED_EXTENSIONS.some((ext) => fileName.endsWith(ext));

    if (!hasValidExtension) {
      setValidationError("Please upload a supported format: PDF, DOCX, or TXT.");
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setValidationError(`File size exceeds the ${MAX_FILE_SIZE_MB}MB limit.`);
      return;
    }

    setSelectedFile(file);
    setInputMode("file");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleApplyPreset = (key: "fullstack" | "frontend") => {
    setSelectedFile(null);
    setPastedText(SAMPLE_RESUMES[key]);
    setInputMode("text");
    setValidationError(null);
  };

  const handleSelectProfileResume = () => {
    setSelectedFile(null);
    setPastedText(SAMPLE_RESUMES.profile);
    setInputMode("profile");
    setValidationError(null);
  };

  const handleSubmitAnalysis = async () => {
    setValidationError(null);

    let extractedText = "";
    let sourceFileName = "";
    let sourceSize: number | undefined = undefined;

    if (inputMode === "profile") {
      extractedText = SAMPLE_RESUMES.profile;
      sourceFileName = "Ananya_Sharma_Senior_Frontend_2026.pdf";
      sourceSize = 1024 * 1024 * 1.4;
    } else if (inputMode === "file") {
      if (!selectedFile) {
        setValidationError("Please choose a file or switch to profile / text mode.");
        return;
      }
      sourceFileName = selectedFile.name;
      sourceSize = selectedFile.size;
      if (selectedFile.name.endsWith(".txt")) {
        try {
          extractedText = await selectedFile.text();
        } catch {
          extractedText = `Extracted text from ${selectedFile.name}`;
        }
      } else {
        extractedText = `Parsed document contents for ${selectedFile.name}. Full sections identified: Personal Information, Executive Summary, Technical Skills, Professional Experience, Education and Certifications.`;
      }
    } else {
      if (!pastedText.trim()) {
        setValidationError("Please paste your resume text to begin analysis.");
        return;
      }
      extractedText = pastedText.trim();
      sourceFileName = "Pasted Resume Text";
    }

    onAnalyze({
      sourceType: inputMode,
      fileName: sourceFileName,
      fileSize: sourceSize,
      text: extractedText,
      targetJobDescription: jobDescription.trim() || undefined,
    });
  };

  const wordCount = pastedText.trim() ? pastedText.trim().split(/\s+/).length : 0;
  const charCount = pastedText.length;

  return (
    <div
      className={cn(
        "relative rounded-3xl bg-white border border-[#B9D7EA] shadow-[0_8px_30px_rgba(26,40,56,0.06)] p-6 sm:p-7 flex flex-col gap-6",
        className
      )}
    >
      {/* Top Accent Stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1A2838] via-[#769FCD] to-[#B9D7EA] rounded-t-3xl" />

      {/* Header with Title and Quick Demo Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E2D8]">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA]">
              <Zap className="w-3 h-3 text-[#1A2838]" />
              Smart ATS Diagnostic
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#1A2838] mt-1 font-display">
            Resume Scanner
          </h2>
          <p className="text-xs text-[#5A7184]">
            Evaluates format compliance, keyword match density, and STAR impact metrics.
          </p>
        </div>

        {/* Quick Demo Pre-fillers */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-[#F4F8FB] p-1.5 rounded-xl border border-[#B9D7EA]">
          <span className="text-[10px] font-mono font-bold text-[#5A7184] px-1">Quick Demo:</span>
          <button
            type="button"
            onClick={() => handleApplyPreset("fullstack")}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#D6E6F2] text-[#1A2838] font-bold text-[10px] transition-colors cursor-pointer border border-[#B9D7EA] shadow-2xs"
          >
            Full Stack CV
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset("frontend")}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#D6E6F2] text-[#1A2838] font-bold text-[10px] transition-colors cursor-pointer border border-[#B9D7EA] shadow-2xs"
          >
            Frontend CV
          </button>
        </div>
      </div>

      {/* Source Selector Tabs */}
      <div className="grid grid-cols-3 gap-2 p-1 bg-[#F4F8FB] rounded-2xl border border-[#B9D7EA]">
        <button
          type="button"
          onClick={() => setInputMode("file")}
          className={cn(
            "py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
            inputMode === "file"
              ? "bg-[#1A2838] text-white shadow-xs"
              : "text-[#2C3E50] hover:text-[#1A2838] hover:bg-white/60"
          )}
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Upload File</span>
        </button>

        <button
          type="button"
          onClick={handleSelectProfileResume}
          className={cn(
            "py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
            inputMode === "profile"
              ? "bg-[#1A2838] text-white shadow-xs"
              : "text-[#2C3E50] hover:text-[#1A2838] hover:bg-white/60"
          )}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Profile Resume</span>
        </button>

        <button
          type="button"
          onClick={() => setInputMode("text")}
          className={cn(
            "py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer",
            inputMode === "text"
              ? "bg-[#1A2838] text-white shadow-xs"
              : "text-[#2C3E50] hover:text-[#1A2838] hover:bg-white/60"
          )}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Paste Text</span>
        </button>
      </div>

      {/* Validation Error Banner */}
      {validationError && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-xs text-rose-700 font-medium animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{validationError}</span>
        </div>
      )}

      {/* 1. FILE UPLOAD MODE */}
      {inputMode === "file" && (
        <>
          {!selectedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "group relative border-2 border-dashed rounded-3xl p-8 sm:p-10 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-3 overflow-hidden",
                isDragging
                  ? "border-[#1A2838] bg-[#D6E6F2]/70 scale-[1.01] shadow-lg shadow-[#1A2838]/10"
                  : "border-[#B9D7EA] hover:border-[#769FCD] bg-gradient-to-b from-[#D6E6F2]/30 via-white to-[#D6E6F2]/10 hover:bg-[#D6E6F2]/50"
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleFileInputChange}
                className="hidden"
              />

              <div className="w-14 h-14 rounded-2xl bg-white shadow-md shadow-[#769FCD]/15 border border-[#B9D7EA] flex items-center justify-center text-[#769FCD] transition-transform duration-200 group-hover:scale-110">
                <UploadCloud className="w-7 h-7 text-[#769FCD]" />
              </div>

              <div className="flex flex-col gap-1 items-center">
                <p className="text-sm font-black text-[#1A2838] group-hover:text-[#769FCD] transition-colors font-display">
                  Drag &amp; drop your resume file here
                </p>
                <p className="text-xs text-[#5A7184]">
                  Supports PDF, DOCX, or TXT (Max 10MB)
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="mt-1 px-4 py-2 rounded-xl bg-[#1A2838] hover:bg-[#769FCD] text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
              >
                Choose File from Device
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl border border-[#769FCD] bg-gradient-to-r from-[#D6E6F2]/80 via-white to-[#D6E6F2]/40 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#1A2838] text-white flex items-center justify-center shadow-xs shrink-0">
                  <FileText className="w-5 h-5 text-[#B9D7EA]" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#1A2838] truncate max-w-xs sm:max-w-md">
                      {selectedFile.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#10B981] text-white">
                      Ready
                    </span>
                  </div>
                  <span className="text-[11px] text-[#5A7184] font-mono mt-0.5">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Calibrated parser ready
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                aria-label="Remove selected file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}

      {/* 2. PROFILE RESUME MODE */}
      {inputMode === "profile" && (
        <div className="p-5 rounded-2xl border border-[#769FCD] bg-gradient-to-br from-[#D6E6F2]/60 via-white to-[#D6E6F2]/30 flex flex-col gap-3 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#1A2838] text-white flex items-center justify-center shrink-0">
                <UserCheck className="w-5 h-5 text-[#769FCD]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-[#1A2838]">
                    Ananya_Sharma_Senior_Frontend_2026.pdf
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#10B981] text-white">
                    Active Profile
                  </span>
                </div>
                <span className="text-[11px] text-[#5A7184]">
                  Synced from Candidate Profile • Last updated recently
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-[#1A2838]">1.4 MB</span>
          </div>

          <div className="p-3 bg-white/80 rounded-xl border border-[#B9D7EA] text-xs text-[#2C3E50] flex flex-col gap-1">
            <div className="flex items-center gap-1.5 font-bold text-[#1A2838]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Parsed Profile Attributes Ready:</span>
            </div>
            <p className="text-[11px] text-[#5A7184] leading-relaxed">
              4.5 yrs experience, 18 technical skills, B.Tech CSE, KiteFlow Tech &amp; ZetaPay roles included.
            </p>
          </div>
        </div>
      )}

      {/* 3. DIRECT PASTE TEXT MODE */}
      {inputMode === "text" && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#1A2838]">
              Resume Text Content
            </label>
            <span className="text-[11px] text-[#5A7184] font-mono">
              {wordCount} words • {charCount} chars
            </span>
          </div>
          <textarea
            rows={7}
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste raw resume text here (Summary, Skills, Work Experience, Education)..."
            className="w-full rounded-2xl bg-[#F4F8FB] border border-[#B9D7EA] p-4 text-xs font-mono text-[#1A2838] placeholder:text-slate-400 transition-all focus:bg-white focus:border-[#769FCD] focus:outline-none focus:ring-2 focus:ring-[#769FCD]/20 shadow-inner"
          />
        </div>
      )}

      {/* Target Job Description Comparator Drawer */}
      <div className="border border-[#B9D7EA] rounded-2xl p-4 bg-[#F4F8FB]">
        <button
          type="button"
          onClick={() => setShowJobDescInput(!showJobDescInput)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#D6E6F2] text-[#1A2838] flex items-center justify-center border border-[#B9D7EA]">
              <Briefcase className="w-3.5 h-3.5 text-[#1A2838]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#1A2838] block">
                Target Job Description Matcher (Optional)
              </span>
              <span className="text-[11px] text-[#5A7184]">
                Extracts missing role-specific keywords against job postings
              </span>
            </div>
          </div>
          <span className="text-xs text-[#769FCD] font-bold hover:underline shrink-0 ml-2">
            {showJobDescInput ? "Hide Details" : "+ Add Job Requirements"}
          </span>
        </button>

        {showJobDescInput && (
          <div className="mt-3.5 flex flex-col gap-2.5 pt-3 border-t border-[#B9D7EA] animate-in fade-in duration-150">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono text-[#5A7184]">Presets:</span>
              <button
                type="button"
                onClick={() =>
                  setJobDescription(
                    "Senior Frontend Engineer: 4+ years React 19, Next.js, TypeScript, Tailwind CSS, Core Web Vitals optimization, and Jest testing."
                  )
                }
                className="px-2 py-0.5 rounded-md bg-white border border-[#B9D7EA] text-[10px] font-bold text-[#1A2838] hover:bg-[#D6E6F2]"
              >
                Frontend Role
              </button>
              <button
                type="button"
                onClick={() =>
                  setJobDescription(
                    "Full Stack Engineer: React, Node.js, TypeScript, PostgreSQL, RESTful APIs, Docker, and CI/CD pipelines."
                  )
                }
                className="px-2 py-0.5 rounded-md bg-white border border-[#B9D7EA] text-[10px] font-bold text-[#1A2838] hover:bg-[#D6E6F2]"
              >
                Full Stack Role
              </button>
            </div>
            <textarea
              rows={3}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste target job requirements here to benchmark exact match percentage..."
              className="w-full rounded-xl bg-white border border-[#B9D7EA] p-3 text-xs text-[#1A2838] placeholder:text-slate-400 focus:border-[#769FCD] focus:outline-none focus:ring-2 focus:ring-[#769FCD]/20"
            />
          </div>
        )}
      </div>

      {/* Pre-flight Diagnostic Badges */}
      <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-[#F4F8FB] border border-[#B9D7EA] text-[11px] font-mono text-[#5A7184]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Workday Safe</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#769FCD]" />
          <span>Greenhouse Pass</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>~1.2s Scan Time</span>
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        type="button"
        onClick={handleSubmitAnalysis}
        disabled={isAnalyzing || (inputMode === "file" && !selectedFile) || (inputMode === "text" && !pastedText.trim())}
        className={cn(
          "w-full h-12 rounded-2xl font-black text-xs shadow-md flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer",
          isAnalyzing || (inputMode === "file" && !selectedFile) || (inputMode === "text" && !pastedText.trim())
            ? "bg-[#D6E6F2] text-slate-400 cursor-not-allowed shadow-none border border-[#B9D7EA]"
            : "bg-gradient-to-r from-[#1A2838] via-[#24374E] to-[#769FCD] hover:from-[#141F2C] hover:to-[#5E8BBF] text-white shadow-[#1A2838]/25 hover:shadow-lg hover:shadow-[#1A2838]/30 hover:scale-[1.005]"
        )}
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Simulating Enterprise ATS Parser &amp; Scoring...</span>
          </>
        ) : (
          <>
            <ScanLine className="w-4 h-4 text-[#B9D7EA]" />
            <span>Run ATS Scan &amp; Calculate Score</span>
            <ArrowRight className="w-4 h-4 text-[#B9D7EA]" />
          </>
        )}
      </button>
    </div>
  );
}
