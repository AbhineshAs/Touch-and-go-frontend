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
    <section className="bg-white border-y border-[#B9D7EA] py-7 text-[#1A2838] relative overflow-hidden">
      {/* Top Header Label */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#769FCD] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1A2838]" />
          </span>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#1A2838]">
            OFFICIAL SPONSORS &amp; ENTERPRISE PARTNERS
          </span>
        </div>
      </div>

      {/* Infinite Horizontal Scrolling Ticker (Right to Left) */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Gradient Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-left gap-4 py-1 px-4">
          {marqueeSponsors.map((s, idx) => (
            <a
              key={idx}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-72 sm:w-80 shrink-0 flex flex-col justify-between p-4 rounded-2xl bg-[#D6E6F2]/30 border border-[#B9D7EA] hover:border-[#769FCD] hover:bg-[#D6E6F2]/60 transition-all hover:scale-[1.01] group shadow-2xs cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#769FCD]" />
                    <span>{s.badge}</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#1A2838]/40 group-hover:text-[#769FCD] transition-colors" />
                </div>
                <h4 className="font-extrabold text-sm text-[#1A2838] group-hover:text-[#769FCD] transition-colors">
                  {s.name}
                </h4>
                <p className="text-xs text-[#1A2838]/70 font-medium mt-0.5">{s.desc}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#B9D7EA]/60 flex items-center justify-between text-[11px] text-[#1A2838] font-bold group-hover:text-[#769FCD] group-hover:underline">
                <span>Visit Official Site</span>
                <span className="font-mono text-[10px] text-[#1A2838]/60">{s.url.replace("https://", "")}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
