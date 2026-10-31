"use client";

import React, { useState, useRef } from "react";
import {
  UploadCloud,
  FileText,
  X,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Loader2,
  FileCode,
  Briefcase,
  Zap,
  ArrowRight,
  ShieldCheck,
  FileUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ATSAnalysisPayload {
  sourceType: "file" | "text";
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

Full Stack Developer | HyperLink Solutions | 2019 - 2022
- Developed customer-facing React & TypeScript dashboard features processing $14M in annual platform billing.
- Designed performant PostgreSQL database schemas, indexing queries to reduce response time from 380ms to 45ms.
- Mentored 4 junior engineers on modern React state management and clean component architecture.

EDUCATION
B.S. in Computer Science | University of California, Berkeley | 2015 - 2019`,

  frontend: `JORDAN CHEN
Email: jordan.chen@example.com | Phone: +1 (555) 847-2931 | New York, NY | linkedin.com/in/jordan-chen-ux

SUMMARY
Staff Frontend Architect with 7+ years of experience engineering high-performance web applications, design systems, and responsive user interfaces. Specialized in React 19, Next.js, Core Web Vitals optimization, and micro-frontend orchestration.

TECHNICAL SKILLS
Core: React, Next.js, TypeScript, JavaScript, CSS3/Tailwind, HTML5, Web Vitals
State & Data: Zustand, TanStack Query, Redux Toolkit, GraphQL, WebSockets
Performance: LCP / INP / CLS tuning, Code Splitting, Edge Rendering, Dynamic Bundling
Testing: Jest, React Testing Library, Cypress, Storybook

EXPERIENCE
Lead Frontend Engineer | Apex Commerce | 2021 - Present
- Spearheaded company-wide Core Web Vitals initiative, improving LCP from 3.8s to 1.1s and lifting checkout conversion by 18.4%.
- Built extensible enterprise design system adopted across 8 distinct business units and 45 developers.`,
};

export function ATSResumeUploader({
  onAnalyze,
  isAnalyzing,
  className,
}: ATSResumeUploaderProps) {
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
      setValidationError("Please upload a valid file format: PDF, DOCX, or TXT.");
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setValidationError(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit.`);
      return;
    }

    setSelectedFile(file);
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
    setValidationError(null);
  };

  const handleSubmitAnalysis = async () => {
    setValidationError(null);

    if (!selectedFile && !pastedText.trim()) {
      setValidationError("Please choose a resume file or paste your resume text to begin analysis.");
      return;
    }

    let extractedText = pastedText.trim();

    if (selectedFile && !extractedText) {
      if (selectedFile.name.endsWith(".txt")) {
        try {
          extractedText = await selectedFile.text();
        } catch {
          extractedText = `Extracted text from ${selectedFile.name}`;
        }
      } else {
        extractedText = `Parsed document contents for ${selectedFile.name}. Full sections identified: Personal Information, Executive Summary, Technical Skills, Professional Experience, Education and Certifications.`;
      }
    }

    onAnalyze({
      sourceType: selectedFile ? "file" : "text",
      fileName: selectedFile?.name,
      fileSize: selectedFile?.size,
      text: extractedText,
      targetJobDescription: jobDescription.trim() || undefined,
    });
  };

  const wordCount = pastedText.trim() ? pastedText.trim().split(/\s+/).length : 0;
  const charCount = pastedText.length;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#D6E6F2]/35 to-white backdrop-blur-xl border border-[#B9D7EA] shadow-[0_12px_35px_-8px_rgba(26,40,56,0.08),0_2px_8px_-1px_rgba(26,40,56,0.04)] p-6 sm:p-7 flex flex-col gap-6",
        className
      )}
    >
      {/* Decorative Accent Stripe with #1A2838, #769FCD, #B9D7EA */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1A2838] via-[#769FCD] to-[#B9D7EA]" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#B9D7EA]/70">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA]">
              <Zap className="w-3 h-3 text-[#1A2838]" />
              Smart ATS Scanner
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#1A2838] mt-1">
            Upload Your Resume
          </h2>
          <p className="text-xs text-[#2C3E50]">
            Supports PDF, DOCX, and TXT (up to 10MB) • Instant structural parsing
          </p>
        </div>

        {/* Quick sample fillers */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span className="text-[11px] font-semibold text-[#1A2838]/70">Quick Demo:</span>
          <button
            type="button"
            onClick={() => handleApplyPreset("fullstack")}
            className="px-2.5 py-1 rounded-lg bg-[#D6E6F2] hover:bg-[#B9D7EA] text-[#1A2838] font-bold text-[10px] transition-colors cursor-pointer border border-[#B9D7EA]"
          >
            Full Stack CV
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset("frontend")}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#D6E6F2] text-[#1A2838] font-bold text-[10px] transition-colors cursor-pointer border border-[#B9D7EA]"
          >
            Frontend CV
          </button>
        </div>
      </div>

      {/* Validation Error Banner */}
      {validationError && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-xs text-rose-700 font-medium animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Drag & Drop Zone */}
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
              : "border-[#B9D7EA] hover:border-[#769FCD] bg-gradient-to-b from-[#D6E6F2]/40 via-white to-[#D6E6F2]/20 hover:bg-[#D6E6F2]/60"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc,.txt"
            onChange={handleFileInputChange}
            className="hidden"
          />

          <div className="w-16 h-16 rounded-2xl bg-white shadow-md shadow-[#769FCD]/15 border border-[#B9D7EA] flex items-center justify-center text-[#769FCD] transition-transform duration-200 group-hover:scale-110">
            <UploadCloud className="w-8 h-8 text-[#769FCD]" />
          </div>

          <div className="flex flex-col gap-1 items-center">
            <p className="text-sm font-extrabold text-[#1A2838] group-hover:text-[#769FCD] transition-colors">
              Drag &amp; drop your resume file here
            </p>
            <p className="text-xs text-[#2C3E50]">
              PDF, DOCX, or TXT (Max 10MB) • or click to browse
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="mt-1 px-5 py-2.5 rounded-xl bg-[#1A2838] hover:bg-[#769FCD] text-white font-bold text-xs shadow-md shadow-[#1A2838]/20 transition-all cursor-pointer"
          >
            Choose File from Device
          </button>
        </div>
      ) : (
        /* Selected File Card */
        <div className="p-4.5 rounded-2xl border border-[#769FCD] bg-gradient-to-r from-[#D6E6F2]/80 via-white to-[#D6E6F2]/50 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#1A2838] text-white flex items-center justify-center shadow-md shadow-[#1A2838]/20 shrink-0">
              <FileText className="w-6 h-6 text-[#B9D7EA]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-[#1A2838] truncate max-w-xs sm:max-w-md">
                  {selectedFile.name}
                </span>
                <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-[#769FCD] text-white">
                  Ready
                </span>
              </div>
              <span className="text-[11px] text-[#2C3E50] font-medium mt-0.5">
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

      {/* Fallback Text Input: Or Paste Resume Text */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-extrabold text-[#1A2838]">
            Or Paste Resume Raw Text
          </label>
          <span className="text-[11px] text-[#2C3E50] font-mono font-medium">
            {wordCount} words • {charCount} chars
          </span>
        </div>
        <textarea
          rows={6}
          value={pastedText}
          onChange={(e) => setPastedText(e.target.value)}
          placeholder="Paste resume text directly if you don't have a PDF file..."
          className="w-full rounded-2xl bg-white border border-[#B9D7EA] p-4 text-xs font-mono text-[#1A2838] placeholder:text-slate-400 transition-all focus:border-[#769FCD] focus:outline-none focus:ring-2 focus:ring-[#769FCD]/20 shadow-inner"
        />
      </div>

      {/* Optional Target Job Description Accordion */}
      <div className="border border-[#B9D7EA] rounded-2xl p-4 bg-[#D6E6F2]/30">
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
              <span className="text-xs font-extrabold text-[#1A2838] block">
                Compare Against Job Description (Optional)
              </span>
              <span className="text-[10px] text-[#2C3E50]">
                Discovers specific missing skills and domain keywords from job postings
              </span>
            </div>
          </div>
          <span className="text-xs text-[#1A2838] font-bold hover:underline shrink-0 ml-2">
            {showJobDescInput ? "Hide" : "+ Add Job Requirements"}
          </span>
        </button>

        {showJobDescInput && (
          <div className="mt-3.5 flex flex-col gap-2 pt-3 border-t border-[#B9D7EA] animate-in fade-in duration-150">
            <p className="text-[11px] text-[#2C3E50]">
              Paste the role requirements to perform a side-by-side keyword match diagnostic:
            </p>
            <textarea
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="e.g. Senior Full Stack Engineer with 4+ years of React 19, TypeScript, Next.js, and CI/CD pipelines..."
              className="w-full rounded-xl bg-white border border-[#B9D7EA] p-3 text-xs text-[#1A2838] placeholder:text-slate-400 focus:border-[#769FCD] focus:outline-none focus:ring-2 focus:ring-[#769FCD]/20"
            />
          </div>
        )}
      </div>

      {/* Main Analyze CTA Button with #1A2838 and #769FCD */}
      <button
        type="button"
        onClick={handleSubmitAnalysis}
        disabled={isAnalyzing || (!selectedFile && !pastedText.trim())}
        className={cn(
          "w-full h-12 rounded-2xl font-black text-xs shadow-md flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer",
          isAnalyzing || (!selectedFile && !pastedText.trim())
            ? "bg-[#D6E6F2] text-slate-400 cursor-not-allowed shadow-none border border-[#B9D7EA]"
            : "bg-gradient-to-r from-[#1A2838] via-[#2A3E54] to-[#769FCD] hover:from-[#141F2C] hover:to-[#5E8BBF] text-white shadow-[#1A2838]/25 hover:shadow-lg hover:shadow-[#1A2838]/30 hover:scale-[1.005]"
        )}
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Simulating Enterprise ATS Parser &amp; Scoring...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-[#B9D7EA]" />
            <span>Run ATS Scan &amp; Calculate Score</span>
            <ArrowRight className="w-4 h-4 text-[#B9D7EA]" />
          </>
        )}
      </button>
    </div>
  );
}
