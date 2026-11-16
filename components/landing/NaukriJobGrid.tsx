"use client";

import React from "react";
import Link from "next/link";
import { Briefcase, MapPin, Zap, ArrowRight, Clock, Building2, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";

export function NaukriJobGrid() {
  const { isAuthenticated, user } = useAuth();
  const applyHref = isAuthenticated && user?.role === "candidate" ? "/candidate/jobs" : "/sign-up?role=candidate";
  const jobs = [
    {
      title: "Senior Full-Stack Engineer (Next.js 16 & Node)",
      company: "WhiteTrack Technologies",
      url: "https://www.whitetracktech.com",
      location: "Bengaluru, KA",
      ctc: "₹28,00,000 - ₹36,00,000 / yr",
      exp: "4-7 Yrs",
      posted: "1 day ago",
      tags: ["React 19", "Next.js", "Node.js", "PostgreSQL"],
      matchRate: "96% Match",
    },
    {
      title: "Lead AI & LLM Systems Engineer",
      company: "WhiteAurax",
      url: "https://www.whiteaurax.com",
      location: "Gurgaon / Remote",
      ctc: "₹38,00,000 - ₹50,00,000 / yr",
      exp: "5-9 Yrs",
      posted: "2 hours ago",
      tags: ["Python", "PyTorch", "LangChain", "Vector DB"],
      matchRate: "98% Match",
    },
    {
      title: "Staff Cloud Architect (Kubernetes & Go)",
      company: "Zynorix Global",
      url: "https://zynorixglobal.com",
      location: "Mumbai, MH",
      ctc: "₹42,00,000 - ₹60,00,000 / yr",
      exp: "8+ Yrs",
      posted: "3 hours ago",
      tags: ["Go", "AWS", "Kubernetes", "Microservices"],
      matchRate: "94% Match",
    },
    {
      title: "Backend Microservices Specialist",
      company: "Techcy Routes",
      url: "https://www.whitetracktech.com",
      location: "Bengaluru / Remote",
      ctc: "₹22,00,000 - ₹32,00,000 / yr",
      exp: "3-6 Yrs",
      posted: "Today",
      tags: ["Node.js", "PostgreSQL", "Kafka", "Docker"],
      matchRate: "92% Match",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F2] text-[#141413] border-b border-[#E8E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E2DDD3] text-[11px] font-mono font-bold text-[#141413] mb-4 shadow-[1px_1px_0px_#141413]">
              <Zap className="w-3.5 h-3.5 text-[#769FCD]" />
              <span>DAILY FEATURED ROLES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#141413] leading-tight font-display">
              Recommended Tech Jobs{" "}
              <span className="relative inline-block px-3.5 py-0.5 rounded-2xl bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA]/60 shadow-[2px_2px_0px_#769FCD]">
                For You
              </span>
            </h2>
            <p className="text-[#5A5852] font-sans font-normal text-base sm:text-lg mt-3 leading-relaxed">
              Pre-vetted salaries, transparent hiring timelines, and instant 1-touch applications.
            </p>
          </div>
          <Link
            href="/jobs"
            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E2DDD3] text-xs font-mono font-bold text-[#141413] hover:border-[#769FCD] hover:text-[#769FCD] transition-all shadow-[1px_1px_0px_#141413] hover:shadow-[2px_2px_0px_#769FCD] shrink-0"
          >
            <span>Explore all 1,420+ active jobs</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#769FCD] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((j, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between group border border-[#E2DDD3] hover:border-[#769FCD] shadow-[0_4px_24px_rgba(26,40,56,0.06)] hover:shadow-[0_8px_30px_rgba(118,159,205,0.15)] transition-all hover:-translate-y-1"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] group-hover:border-[#769FCD] text-[#769FCD] flex items-center justify-center shrink-0 font-bold shadow-2xs group-hover:scale-105 transition-all">
                      <Building2 className="w-6 h-6 text-[#769FCD]" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-[#141413] mb-0.5 group-hover:text-[#769FCD] transition-colors font-display">
                        {j.title}
                      </h3>
                      <a
                        href={j.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-[#5A5852] hover:text-[#141413] inline-flex items-center gap-1 transition-colors font-sans"
                      >
                        {j.company} <span className="text-[10px] text-[#769FCD]">↗</span>
                      </a>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold text-[#141413] bg-[#FAF7F2] border border-[#E8E2D8] shrink-0 shadow-2xs">
                    {j.ctc}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3.5 text-xs text-[#5A5852] mb-4 font-medium font-sans">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#769FCD]" />
                    <span>{j.exp}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#769FCD]" />
                    <span>{j.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#74726A] font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{j.posted}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6 items-center">
                  {j.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-[#FAF7F2] border border-[#E8E2D8] text-[#5A5852] font-medium group-hover:text-[#141413] group-hover:border-[#D6E6F2] transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                  <span className="px-2.5 py-1 rounded-lg bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA]/60 text-[11px] font-mono font-bold ml-auto shadow-2xs">
                    {j.matchRate}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E2D8] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#141413]">
                  <CheckCircle2 className="w-4 h-4 text-[#769FCD]" />
                  <span>100% Verified Employer</span>
                </div>
                <Link href={applyHref}>
                  <button className="px-5 py-2.5 rounded-xl bg-[#141413] hover:bg-[#769FCD] text-white font-mono font-bold text-xs shadow-md shadow-[#141413]/15 flex items-center gap-1.5 transition-all cursor-pointer hover:scale-[1.02]">
                    <Zap className="w-3.5 h-3.5 fill-[#D6E6F2] text-[#D6E6F2]" />
                    <span>{isAuthenticated && user?.role === "candidate" ? "View in Portal" : "1-Touch Apply"}</span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
