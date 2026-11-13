"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { playTactileChime } from "@/lib/sound/chime";

export function LandingCtaBanner() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#141413] text-[#FAF9F6] relative overflow-hidden border-t border-[#262624]">
      {/* Subtle architectural grain / grid lines (no blurry glow orbs) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Subtle Live Badge (No "Revolution" fluff) */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono font-bold text-[#A8A49C] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#769FCD]" />
          <span>DIRECT TECH RECRUITMENT • INDIA</span>
        </div>

        {/* Big Typographic Block: One confident, benefit-led headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-[-0.035em] text-[#FAF9F6] font-display leading-[1.05] max-w-4xl mx-auto">
          Your next tech role is one tap away.
        </h2>

        {/* Subtext: Plain, honest, confident */}
        <p className="text-base sm:text-xl text-[#A8A49C] font-sans font-normal mt-6 mb-10 max-w-2xl mx-auto leading-relaxed">
          Skip recruiter phone screens and resume black holes. Connect directly with hiring
          leads at India&apos;s fastest-growing tech teams with transparent CTC upfront.
        </p>

        {/* Single Primary Action (No secondary button box) */}
        <div className="flex flex-col items-center justify-center gap-4">
          <Link href="/sign-up?role=candidate" onClick={() => playTactileChime()}>
            <Button
              variant="touch"
              size="lg"
              className="bg-[#769FCD] hover:bg-[#5E8BBF] active:bg-[#4A7AA8] text-white px-8 sm:px-10 py-4 sm:py-4.5 text-base sm:text-lg font-black shadow-[3px_3px_0px_#FAF9F6] hover:shadow-[4px_4px_0px_#FAF9F6] active:shadow-none border-2 border-white/90"
            >
              <span>Get Matched in 1 Touch</span>
              <ArrowRight className="w-5 h-5 ml-2.5" />
            </Button>
          </Link>

          {/* Quiet text link for employers underneath */}
          <Link
            href="/sign-up?role=employer"
            className="text-xs sm:text-sm text-[#A8A49C] hover:text-white transition-colors underline underline-offset-4 font-mono font-medium pt-1"
          >
            Hiring engineers or designers? Post a role in 2 minutes &rarr;
          </Link>
        </div>

        {/* Quiet Trust Markers (No colorful pills or cards) */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-[#74726A]">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-[#769FCD]" />
            <span>1-Touch Direct Apply</span>
          </div>
          <span className="hidden sm:inline text-white/20">•</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
            <span>100% Anonymous Until You Approve</span>
          </div>
          <span className="hidden sm:inline text-white/20">•</span>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#769FCD]" />
            <span>4-Hour Median First Response</span>
          </div>
        </div>
      </div>
    </section>
  );
}
