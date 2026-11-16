"use client";

import React from "react";
import { ShieldCheck, Star, ExternalLink } from "lucide-react";

export function NaukriFeaturedCompanies() {
  const sponsors = [
    {
      name: "WhiteTrack Technologies",
      url: "https://www.whitetracktech.com",
      rating: "4.8",
      reviews: "1.4k+ Reviews",
      type: "Official Sponsor",
      desc: "Enterprise Cloud, Microservices & Software Architecture",
      openings: "8 Active Roles",
      location: "Bengaluru & Global",
      tech: ["Cloud Infra", "Full Stack", "DevOps", "Java"],
    },
    {
      name: "WhiteAurax",
      url: "https://www.whiteaurax.com",
      rating: "4.9",
      reviews: "980+ Reviews",
      type: "Official Sponsor",
      desc: "Cutting-Edge AI, LLM Orchestration & Digital Transformation",
      openings: "6 Active Roles",
      location: "Gurgaon & Remote",
      tech: ["Python", "PyTorch", "React 19", "RAG"],
    },
    {
      name: "Zynorix Global",
      url: "https://zynorixglobal.com",
      rating: "4.7",
      reviews: "2.1k+ Reviews",
      type: "Official Sponsor",
      desc: "Global Tech Consulting, Enterprise Integration & Advisory",
      openings: "10 Active Roles",
      location: "Mumbai & Remote",
      tech: ["Go", "Next.js", "AWS", "Kafka"],
    },
    {
      name: "Techcy Routes",
      url: "https://www.whitetracktech.com",
      rating: "4.8",
      reviews: "750+ Reviews",
      type: "Official Sponsor",
      desc: "Talent Mobility, Career Pathways & Engineering Acceleration",
      openings: "5 Active Roles",
      location: "Bengaluru & NCR",
      tech: ["Frontend", "Backend", "Product", "QA"],
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F2] text-[#141413] border-b border-[#E8E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E2DDD3] text-[11px] font-mono font-bold text-[#141413] mb-4 shadow-[1px_1px_0px_#141413]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#769FCD]" />
            <span>TOP HIRING EMPLOYERS IN INDIA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#141413] leading-tight font-display mb-4">
            Featured companies{" "}
            <span className="relative inline-block px-3.5 py-0.5 rounded-2xl bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA]/60 shadow-[2px_2px_0px_#769FCD]">
              actively hiring today
            </span>
          </h2>
          <p className="text-[#5A5852] font-sans font-normal text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Apply directly to openings at verified sponsors and top enterprise leaders.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sponsors.map((c, idx) => (
            <a
              key={idx}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between group border border-[#E2DDD3] hover:border-[#769FCD] shadow-[0_4px_24px_rgba(26,40,56,0.06)] hover:shadow-[0_8px_30px_rgba(118,159,205,0.15)] transition-all hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#141413] text-white font-black text-base flex items-center justify-center shadow-xs border border-[#141413]">
                    {c.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold text-[#141413] bg-[#FAF7F2] border border-[#E8E2D8] flex items-center gap-1.5 shadow-2xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#769FCD]" />
                    <span>{c.type}</span>
                  </span>
                </div>

                <h3 className="font-black text-lg text-[#141413] group-hover:text-[#769FCD] transition-colors mb-1 font-display">
                  {c.name}
                </h3>

                <div className="flex items-center gap-2 text-xs mb-3 font-mono">
                  <div className="flex items-center gap-1 text-[#769FCD] font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#769FCD] text-[#769FCD]" />
                    <span>{c.rating}</span>
                  </div>
                  <span className="text-[#E2DDD3]">•</span>
                  <span className="text-[#5A5852] text-[11px] font-sans font-medium">{c.reviews}</span>
                </div>

                <p className="text-xs text-[#5A5852] mb-4 line-clamp-2 leading-relaxed font-sans">
                  {c.desc}
                </p>

                <div className="text-xs font-mono font-bold text-[#769FCD] mb-4">
                  {c.openings}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {c.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-[#FAF7F2] border border-[#E8E2D8] text-[#5A5852] font-medium group-hover:text-[#141413] transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E2D8] mt-6 flex items-center justify-between text-xs font-bold text-[#141413] group-hover:text-[#769FCD] transition-colors">
                <span className="font-sans">View Company Jobs</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
