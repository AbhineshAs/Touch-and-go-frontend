"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Code, Cpu, Database, Cloud, ShieldCheck, Layers, Server } from "lucide-react";

export function NaukriJobCategories() {
  const categories = [
    {
      title: "Full-Stack & Frontend",
      roles: "420+ Openings",
      avgCTC: "₹18 - ₹36 LPA",
      icon: Code,
      skills: ["React 19", "Next.js", "TypeScript", "Tailwind"],
    },
    {
      title: "Backend & Microservices",
      roles: "380+ Openings",
      avgCTC: "₹22 - ₹45 LPA",
      icon: Server,
      skills: ["Node.js", "Go", "PostgreSQL", "Kafka"],
    },
    {
      title: "Artificial Intelligence & ML",
      roles: "290+ Openings",
      avgCTC: "₹28 - ₹55 LPA",
      icon: Cpu,
      skills: ["Python", "PyTorch", "LLMs", "Vector DB"],
    },
    {
      title: "Cloud & DevOps Systems",
      roles: "310+ Openings",
      avgCTC: "₹24 - ₹48 LPA",
      icon: Cloud,
      skills: ["AWS", "Kubernetes", "Docker", "Terraform"],
    },
    {
      title: "Data Engineering & Analytics",
      roles: "240+ Openings",
      avgCTC: "₹20 - ₹40 LPA",
      icon: Database,
      skills: ["Snowflake", "Spark", "SQL", "Python"],
    },
    {
      title: "Cyber Security & Infra",
      roles: "180+ Openings",
      avgCTC: "₹26 - ₹50 LPA",
      icon: ShieldCheck,
      skills: ["SecOps", "PenTesting", "IAM", "Compliance"],
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F2] text-[#141413] border-b border-[#E8E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E2DDD3] text-[11px] font-mono font-bold text-[#141413] mb-4 shadow-[1px_1px_0px_#141413]">
              <Layers className="w-3.5 h-3.5 text-[#769FCD]" />
              <span>EXPLORE HOT JOB CATEGORIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#141413] leading-tight font-display">
              Popular tech career{" "}
              <span className="relative inline-block px-3.5 py-0.5 rounded-2xl bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA]/60 shadow-[2px_2px_0px_#769FCD]">
                tracks in India
              </span>
            </h2>
            <p className="text-[#5A5852] font-sans font-normal text-base sm:text-lg mt-3 leading-relaxed">
              High-growth technical specializations with active openings and verified upfront CTC brackets.
            </p>
          </div>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E2DDD3] text-xs font-mono font-bold text-[#141413] hover:border-[#769FCD] hover:text-[#769FCD] transition-all shadow-[1px_1px_0px_#141413] hover:shadow-[2px_2px_0px_#769FCD] shrink-0"
          >
            Browse all categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={`/jobs?q=${encodeURIComponent(cat.title)}`}
                className="bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between group border border-[#E2DDD3] hover:border-[#769FCD] shadow-[0_4px_24px_rgba(26,40,56,0.06)] hover:shadow-[0_8px_30px_rgba(118,159,205,0.15)] transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] group-hover:border-[#769FCD] text-[#769FCD] flex items-center justify-center font-bold shadow-2xs group-hover:scale-105 transition-all">
                      <Icon className="w-6 h-6 text-[#769FCD]" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#141413] bg-[#FAF7F2] px-3 py-1 rounded-xl border border-[#E8E2D8]">
                      {cat.avgCTC}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#141413] group-hover:text-[#769FCD] transition-colors mb-1 font-display">
                    {cat.title}
                  </h3>
                  <div className="text-xs font-mono font-bold text-[#769FCD] mb-4">
                    {cat.roles}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cat.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-[#FAF7F2] border border-[#E8E2D8] text-[#5A5852] font-medium group-hover:text-[#141413] group-hover:border-[#D6E6F2] transition-colors"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E2D8] flex items-center justify-between text-xs font-bold text-[#141413] group-hover:text-[#769FCD] transition-colors">
                  <span className="font-sans">Explore Openings</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
