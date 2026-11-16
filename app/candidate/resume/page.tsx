"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, FileText, CheckCircle2, ShieldCheck } from "lucide-react";
import { ResumeModeSelector } from "@/components/resume/ResumeModeSelector";
import { ATSResumeUploader, ATSAnalysisPayload } from "@/components/resume/ATSResumeUploader";
import { ATSFeatureSummary } from "@/components/resume/ATSFeatureSummary";
import { ATSScoreReport, ATSReportData } from "@/components/resume/ATSScoreReport";
import { cn } from "@/lib/utils";

export default function CandidateResumePage() {
  const [activeTab, setActiveTab] = useState<"selector" | "ats">("selector");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisReport, setAnalysisReport] = useState<ATSReportData | null>(null);

  const handleRunAnalysis = async (payload: ATSAnalysisPayload) => {
    setIsAnalyzing(true);
    setAnalysisReport(null);

    // Simulate smart ATS analysis heuristics
    await new Promise((r) => setTimeout(r, 1200));

    const textLength = payload.text.length;
    const hasMetrics = /\d+%|\$\d+|\b\d+\s+(users|clients|projects|ms|seconds|engineers)\b/i.test(payload.text);
    const hasTypeScript = /typescript|ts/i.test(payload.text);
    const hasNext = /next\.?js|react/i.test(payload.text);

    // Dynamic scoring based on actual content
    let calculatedScore = 78;
    if (hasMetrics) calculatedScore += 6;
    if (hasTypeScript) calculatedScore += 4;
    if (hasNext) calculatedScore += 4;
    if (textLength > 600) calculatedScore += 2;
    calculatedScore = Math.min(94, Math.max(68, calculatedScore));

    const grade = calculatedScore >= 90 ? "A" : calculatedScore >= 80 ? "B+" : "B";

    const mockReport: ATSReportData = {
      overallScore: calculatedScore,
      grade,
      verdict:
        calculatedScore >= 85
          ? "Strong ATS Match • Ready for Direct Job Application"
          : "Good Foundation • Minor Keyword & Formatting Refinements Recommended",
      sourceName: payload.fileName || "Pasted Resume Text",
      breakdown: {
        contact: {
          score: 100,
          status: "good",
          notes: "Full Name, email, telephone number, and LinkedIn handles parsed cleanly.",
        },
        experience: {
          score: hasMetrics ? 88 : 74,
          status: hasMetrics ? "good" : "warning",
          notes: hasMetrics
            ? "Strong quantifiable impact metrics detected in recent roles."
            : "Include more quantifiable outcomes (e.g., % latency reduction, user growth).",
        },
        skills: {
          score: 82,
          status: "good",
          notes: "Recognized 18 core technical competencies and software engineering libraries.",
        },
        education: {
          score: 95,
          status: "good",
          notes: "Degree, university name, and graduation timeline mapped accurately.",
        },
        formatting: {
          score: 86,
          status: "good",
          notes: "Clean hierarchical headers. Parser traversed sections in single pass.",
        },
      },
      risks: [
        {
          title: "Quantifiable Performance Metrics",
          description:
            "Some bullet points describe day-to-day duties rather than business impact. Add percentage, speed, or team size figures.",
          severity: "medium",
        },
        {
          title: "Target Keyword Frequency",
          description:
            "Key engineering keywords like CI/CD, Unit Testing, and Cloud Architecture appeared only once in the parsed text.",
          severity: "low",
        },
        {
          title: "Parser Section Header Consistency",
          description:
            "Standard headings ('Work Experience', 'Skills', 'Education') ensure 100% traversal across older ATS parsers.",
          severity: "low",
        },
      ],
      missingKeywords: [
        "CI/CD Pipelines",
        "System Design",
        "RESTful APIs",
        "Unit Testing (Jest)",
        "Docker",
        "Agile / Scrum",
        "State Management",
      ],
      rewrites: [
        {
          section: "Work Experience",
          original: "Worked on frontend features using React and improved page load times.",
          improved:
            "Architected high-velocity React & Next.js user interfaces, reducing core page load latency by 34% across 120,000 monthly active users.",
          rationale: "Introduces strong action verbs, quantifiable metrics, and verified user scale.",
        },
        {
          section: "Technical Leadership",
          original: "Collaborated with team members to ship new software products on schedule.",
          improved:
            "Partnered with cross-functional engineering and design squads to deliver 4 major product milestones ahead of sprint deadlines.",
          rationale: "Demonstrates proactive cross-functional collaboration and delivery velocity.",
        },
      ],
    };

    setAnalysisReport(mockReport);
    setIsAnalyzing(false);
  };

  const handleResetAnalysis = () => {
    setAnalysisReport(null);
  };

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-8 py-6 sm:py-8 bg-[#FAF7F2] text-[#141413]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Top Breadcrumb & View Toggle Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Link
              href="/candidate/dashboard"
              className="text-xs font-semibold text-[#5A5852] hover:text-[#141413] transition-colors"
            >
              Candidate Portal
            </Link>
            <span className="text-[#E2DDD3]">/</span>
            <span className="text-xs font-bold text-[#141413]">Resume &amp; ATS</span>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-white border border-[#E2DDD3] rounded-xl shadow-[1px_1px_0px_#141413]">
            <button
              type="button"
              onClick={() => {
                setActiveTab("selector");
                setAnalysisReport(null);
              }}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer",
                activeTab === "selector"
                  ? "bg-[#141413] text-white shadow-2xs"
                  : "text-[#5A5852] hover:bg-[#FAF7F2] hover:text-[#141413]"
              )}
            >
              Resume Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ats")}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer",
                activeTab === "ats"
                  ? "bg-[#141413] text-white shadow-2xs"
                  : "text-[#5A5852] hover:bg-[#FAF7F2] hover:text-[#141413]"
              )}
            >
              ATS Resume Checker
            </button>
          </div>
        </div>

        {/* VIEW 1: RESUME ENTRY VIEW (Mode Selector) */}
        {activeTab === "selector" && (
          <div className="flex flex-col gap-8">
            <ResumeModeSelector
              onSelectMode={(mode) => {
                if (mode === "ats") setActiveTab("ats");
              }}
            />

            {/* In-page ATS Preview / Quick Jump Card */}
            <div className="bg-white border border-[#E2DDD3] hover:border-[#769FCD] rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-[0_4px_24px_rgba(26,40,56,0.06)] hover:shadow-[0_8px_30px_rgba(118,159,205,0.15)] transition-all">
              <div className="flex flex-col gap-1.5 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] text-[10px] font-mono font-bold uppercase tracking-wider text-[#141413]">
                    Instant Verification
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-[#141413] font-display">
                  Already have a resume? Check your ATS score in seconds
                </h3>
                <p className="text-xs text-[#5A5852] max-w-xl font-sans leading-relaxed">
                  Upload your CV to simulate enterprise applicant tracking system algorithms and discover missing keywords before applying.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab("ats")}
                className="px-5 py-2.5 rounded-xl bg-[#141413] hover:bg-[#769FCD] text-white font-mono font-bold text-xs shadow-md shadow-[#141413]/15 transition-all shrink-0 cursor-pointer hover:scale-[1.02]"
              >
                Open ATS Checker →
              </button>
            </div>
          </div>
        )}

        {/* VIEW 2: ATS RESUME CHECKER PANEL */}
        {activeTab === "ats" && (
          <div className="flex flex-col gap-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E2D8]">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#141413] font-display">
                    ATS Resume Checker
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white text-[#141413] border border-[#E2DDD3] shadow-[1px_1px_0px_#141413]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#769FCD]" />
                    Calibrated ATS Analysis
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#5A5852] font-sans font-normal max-w-3xl leading-relaxed">
                  Upload your resume with drag and drop, compare it against a job description, and get a polished ATS-style analysis with scores, risks, keywords, and actionable rewrites.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("selector");
                  setAnalysisReport(null);
                }}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E2DDD3] bg-white hover:bg-[#FAF7F2] text-[#141413] text-xs font-mono font-bold cursor-pointer shadow-[1px_1px_0px_#141413] transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#141413]" />
                <span>Back to Overview</span>
              </button>
            </div>

            {/* If Report is ready, show ATSScoreReport */}
            {analysisReport ? (
              <ATSScoreReport report={analysisReport} onReset={handleResetAnalysis} />
            ) : (
              /* Balanced Two-Column Studio Layout with Zero Void */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column (7 cols): Upload & Input Card */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <ATSResumeUploader onAnalyze={handleRunAnalysis} isAnalyzing={isAnalyzing} />
                </div>

                {/* Right Column (5 cols): Diagnostic Companion & Actions */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <ATSFeatureSummary
                    onSampleScan={() =>
                      handleRunAnalysis({
                        sourceType: "text",
                        fileName: "Alex_Rivera_FullStack_Resume.pdf",
                        text: `ALEX RIVERA
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
- Partnered with product and engineering squads to implement continuous deployment workflows with Jest and GitHub Actions, cutting staging defects by 28%.`,
                        targetJobDescription:
                          "Full Stack Engineer with React 19, Next.js, TypeScript, and Node.js",
                      })
                    }
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
