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
    <section className="py-16 lg:py-24 bg-[#F4F8FB] text-[#1A2838] border-b border-[#B9D7EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D6E6F2] border border-[#B9D7EA] text-xs font-bold text-[#1A2838] mb-3 shadow-xs">
              <Layers className="w-3.5 h-3.5 text-[#769FCD]" />
              <span>EXPLORE HOT JOB CATEGORIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1A2838]">
              Popular tech career <span className="text-[#769FCD]">tracks in India</span>
            </h2>
          </div>
          <Link href="/jobs" className="text-xs font-bold text-[#1A2838] hover:text-[#769FCD] hover:underline flex items-center gap-1 transition-colors">
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
                className="bg-white border border-[#B9D7EA] rounded-2xl p-6 hover:border-[#769FCD] hover:shadow-lg transition-all flex flex-col justify-between group shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#D6E6F2] border border-[#B9D7EA] text-[#1A2838] flex items-center justify-center shadow-2xs">
                      <Icon className="w-5 h-5 text-[#769FCD]" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#1A2838] bg-[#D6E6F2] px-2.5 py-1 rounded-md border border-[#B9D7EA]">
                      {cat.avgCTC}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-[#1A2838] group-hover:text-[#769FCD] transition-colors mb-1">
                    {cat.title}
                  </h3>
                  <div className="text-xs font-mono font-bold text-[#769FCD] mb-4">{cat.roles}</div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cat.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded text-[10px] bg-[#D6E6F2]/40 border border-[#B9D7EA]/60 text-[#1A2838] font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#B9D7EA]/30 flex items-center justify-between text-xs font-bold text-[#1A2838] group-hover:text-[#769FCD]">
                  <span>Explore Openings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
