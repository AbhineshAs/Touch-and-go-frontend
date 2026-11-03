"use client";

import React from "react";
import Link from "next/link";
import { Briefcase, MapPin, Zap, ArrowRight, Clock, Building2, CheckCircle2, Sparkles } from "lucide-react";
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
    <section className="py-16 lg:py-24 bg-gradient-to-b from-[#F4F8FB] via-white to-[#F4F8FB] text-[#1A2838] border-b border-[#B9D7EA]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D6E6F2] border border-[#B9D7EA] text-xs font-bold text-[#1A2838] mb-3 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-[#1A2838] fill-[#1A2838]" />
              <span>DAILY FEATURED ROLES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1A2838]">
              Recommended Tech Jobs <span className="bg-gradient-to-r from-[#1A2838] to-[#769FCD] bg-clip-text text-transparent">For You</span>
            </h2>
            <p className="text-sm text-[#2C3E50] mt-1 font-normal">
              Pre-vetted salaries, transparent hiring timelines, and instant 1-touch applications.
            </p>
          </div>
          <Link
            href="/jobs"
            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#B9D7EA] text-xs font-bold text-[#1A2838] hover:border-[#769FCD] hover:bg-[#D6E6F2]/50 shadow-2xs transition-all"
          >
            <span>Explore all 1,420+ active jobs</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#769FCD] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((j, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl bg-white border border-[#B9D7EA] p-6 sm:p-7 hover:border-[#769FCD] hover:shadow-xl hover:shadow-[#769FCD]/15 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Subtle hover gradient glow in #D6E6F2 */}
              <div className="pointer-events-none absolute -top-16 -right-16 w-36 h-36 bg-gradient-to-br from-[#769FCD]/10 to-[#B9D7EA]/20 rounded-full blur-2xl group-hover:from-[#769FCD]/20 transition-all" />

              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D6E6F2] border border-[#B9D7EA] flex items-center justify-center text-[#1A2838] shrink-0 font-black text-sm">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-base sm:text-lg text-[#1A2838] mb-0.5 group-hover:text-[#769FCD] transition-colors">
                        {j.title}
                      </h3>
                      <a
                        href={j.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-[#2C3E50] hover:text-[#1A2838] inline-flex items-center gap-1 transition-colors"
                      >
                        {j.company} <span className="text-[10px] text-[#769FCD]">↗</span>
                      </a>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-xl text-xs font-mono font-black text-[#1A2838] bg-[#D6E6F2] border border-[#B9D7EA] shrink-0 shadow-2xs">
                    {j.ctc}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3.5 text-xs text-[#2C3E50] mb-4 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#769FCD]" />
                    <span>{j.exp}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#769FCD]" />
                    <span>{j.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#5A7184] font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{j.posted}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {j.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg bg-[#D6E6F2]/40 border border-[#B9D7EA] text-[11px] font-semibold text-[#1A2838]"
                    >
                      {t}
                    </span>
                  ))}
                  <span className="px-2.5 py-1 rounded-lg bg-[#769FCD] text-white text-[11px] font-bold ml-auto shadow-2xs">
                    {j.matchRate}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#B9D7EA]/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1A2838]">
                  <CheckCircle2 className="w-4 h-4 text-[#769FCD]" />
                  <span>100% Verified Employer</span>
                </div>
                <Link href={applyHref}>
                  <button className="px-5 py-2.5 rounded-xl bg-[#1A2838] hover:bg-[#769FCD] text-white font-extrabold text-xs shadow-md shadow-[#1A2838]/20 flex items-center gap-1.5 transition-all cursor-pointer hover:scale-[1.02]">
                    <Zap className="w-3.5 h-3.5 fill-[#B9D7EA] text-[#B9D7EA]" />
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
