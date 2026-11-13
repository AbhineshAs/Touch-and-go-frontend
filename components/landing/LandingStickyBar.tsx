"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Zap, X } from "lucide-react";
import { playTactileChime } from "@/lib/sound/chime";

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
    <aside
      aria-label="Sticky recruitment quick action"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="bg-[#141413]/95 backdrop-blur-md border border-[#2A2A28] p-3 sm:p-3.5 rounded-2xl shadow-[0_16px_40px_rgba(20,20,19,0.35)] flex items-center justify-between gap-4 text-[#FAF9F6]">
        {/* Left Side: Live Icon & Copy */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#222220] border border-[#333330] flex items-center justify-center shrink-0 shadow-xs">
            <Zap className="w-4 h-4 text-[#769FCD] fill-current" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-xs sm:text-sm text-[#FAF9F6] font-display tracking-tight truncate">
                Ready for 1-Touch Matching?
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#222220] text-[#769FCD] border border-[#333330] shadow-xs shrink-0 whitespace-nowrap">
                1,420+ Live Jobs
              </span>
            </div>
            <p className="text-[11px] text-[#A8A49C] hidden sm:block font-sans mt-0.5 truncate">
              Direct connection with verified tech leads · Transparent CTC upfront
            </p>
          </div>
        </div>

        {/* Right Side: CTA Button & Dismiss */}
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/sign-up?role=candidate" onClick={() => playTactileChime()}>
            <button className="px-4 py-2 rounded-xl bg-[#769FCD] hover:bg-[#5E8BBF] active:bg-[#4A7AA8] text-white font-extrabold text-xs shadow-[2px_2px_0px_#FFFFFF] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center gap-1.5 transition-all cursor-pointer font-sans whitespace-nowrap">
              <span>Instant Match</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 rounded-lg text-[#74726A] hover:text-[#FAF9F6] hover:bg-white/10 transition-colors cursor-pointer"
            title="Dismiss"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
