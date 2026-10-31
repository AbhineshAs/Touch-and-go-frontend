"use client";

import React from "react";
import { Users, Building2, Target, TrendingUp, ShieldCheck, CheckCircle2 } from "lucide-react";

export function ProductMetrics() {
  const metrics = [
    {
      value: "50,000+",
      label: "Tech Professionals",
      subLabel: "Pre-vetted engineering & product talent",
      icon: Users,
      color: "text-[#1A2838]",
      bg: "bg-[#D6E6F2] border-[#B9D7EA]",
    },
    {
      value: "1,200+",
      label: "Verified Employers",
      subLabel: "Top tech startups & MNCs across India",
      icon: Building2,
      color: "text-[#769FCD]",
      bg: "bg-[#D6E6F2] border-[#B9D7EA]",
    },
    {
      value: "96.4%",
      label: "Match Accuracy",
      subLabel: "Explainable multi-vector AI scoring",
      icon: Target,
      color: "text-[#1A2838]",
      bg: "bg-[#B9D7EA] border-[#769FCD]",
    },
    {
      value: "₹34.2 LPA",
      label: "Average Matched CTC",
      subLabel: "Transparent upfront compensation",
      icon: TrendingUp,
      color: "text-[#769FCD]",
      bg: "bg-[#D6E6F2] border-[#B9D7EA]",
    },
  ];

  return (
    <section className="py-16 bg-[#1A2838] text-white relative border-b border-[#769FCD]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-[#141F2C] border border-[#769FCD]/25 p-6 rounded-3xl shadow-xl hover:border-[#769FCD]/60 transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${m.bg} border flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-6 h-6 ${m.color}`} />
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-[#769FCD] group-hover:text-[#B9D7EA] transition-colors" />
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-black tracking-tight font-mono text-white mb-1">
                    {m.value}
                  </div>
                  <div className="text-sm font-extrabold text-[#D6E6F2] mb-1">{m.label}</div>
                  <div className="text-xs text-[#B9D7EA]/80 font-medium">{m.subLabel}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Marketplace Activity Ticker */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 font-bold text-[#D6E6F2]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#769FCD] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#B9D7EA]" />
            </span>
            <span>LIVE MATCH STREAM:</span>
            <span className="text-[#B9D7EA] font-mono">Senior React Lead matched with Techcy Routes • ₹38 LPA</span>
          </div>
          <div className="flex items-center gap-2 text-[#D6E6F2]/70 font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#769FCD]" />
            <span>Verified Partner Network · WhiteTrack Technologies</span>
          </div>
        </div>
      </div>
    </section>
  );
}
