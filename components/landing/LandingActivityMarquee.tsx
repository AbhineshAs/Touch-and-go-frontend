"use client";

import React from "react";
import { ExternalLink, ShieldCheck } from "lucide-react";

export function LandingActivityMarquee() {
  const sponsors = [
    {
      name: "WhiteTrack Technologies",
      url: "https://www.whitetracktech.com",
      badge: "Official Sponsor",
      desc: "Enterprise Cloud & Software Solutions",
    },
    {
      name: "WhiteAurax",
      url: "https://www.whiteaurax.com",
      badge: "Official Sponsor",
      desc: "AI & Digital Transformation",
    },
    {
      name: "Zynorix Global",
      url: "https://zynorixglobal.com",
      badge: "Official Sponsor",
      desc: "Global Technology & Consulting",
    },
    {
      name: "Techcy Routes",
      url: "https://www.whitetracktech.com",
      badge: "Official Sponsor",
      desc: "Next-Gen Talent & Tech Pathways",
    },
  ];

  // Duplicate for seamless infinite loop
  const marqueeSponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

  return (
    <section className="bg-[#FAF7F2] border-b border-[#E8E2D8] py-8 text-[#141413] relative overflow-hidden">
      {/* Top Header Label */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#769FCD] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#141413]" />
          </span>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#141413]">
            OFFICIAL SPONSORS &amp; ENTERPRISE PARTNERS
          </span>
        </div>
      </div>

      {/* Infinite Horizontal Scrolling Ticker (Right to Left) */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Gradient Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-left gap-4 py-2 px-4">
          {marqueeSponsors.map((s, idx) => (
            <a
              key={idx}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-72 sm:w-80 shrink-0 flex flex-col justify-between p-5 rounded-2xl bg-white border border-[#E2DDD3] hover:border-[#769FCD] shadow-[0_4px_24px_rgba(26,40,56,0.06)] hover:shadow-[0_8px_30px_rgba(118,159,205,0.15)] transition-all hover:-translate-y-0.5 group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold text-[#141413] bg-[#FAF7F2] border border-[#E8E2D8] flex items-center gap-1.5 shadow-2xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#769FCD]" />
                    <span>{s.badge}</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#5A5852] group-hover:text-[#769FCD] transition-colors" />
                </div>
                <h4 className="font-black text-base text-[#141413] group-hover:text-[#769FCD] transition-colors font-display">
                  {s.name}
                </h4>
                <p className="text-xs text-[#5A5852] font-medium font-sans mt-0.5 leading-relaxed">{s.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8E2D8] flex items-center justify-between text-xs text-[#141413] font-bold group-hover:text-[#769FCD]">
                <span className="font-sans">Visit Official Site</span>
                <span className="font-mono text-[10px] text-[#74726A]">{s.url.replace("https://", "")}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
