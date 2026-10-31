"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Compass, X } from "lucide-react";

export function LandingStickyBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400 && !dismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  if (!isVisible || dismissed) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 transition-all">
      <div className="bg-[#1A2838]/95 backdrop-blur-md border border-[#B9D7EA] p-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#769FCD] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-xs text-white">Ready for 1-Touch Job Matching?</h4>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA]">
                1,420+ Live Jobs
              </span>
            </div>
            <p className="text-[11px] text-[#D6E6F2]/80 hidden sm:block font-medium">
              Explore verified engineering &amp; product roles with transparent CTC across India.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link href="/sign-up?role=candidate">
            <button className="px-4 py-2 rounded-xl bg-[#769FCD] hover:bg-white hover:text-[#1A2838] text-white font-extrabold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer">
              <span>Instant Match</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 rounded-lg text-[#D6E6F2]/60 hover:text-white hover:bg-white/10 transition-colors"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
