"use client";

import React, { useState, useEffect, useRef } from "react";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedStatProps {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  unit?: string;
  duration?: number;
  isVisible: boolean;
}

function AnimatedStat({
  target,
  decimals = 0,
  prefix = "",
  suffix = "",
  unit = "",
  duration = 1600,
  isVisible,
}: AnimatedStatProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setCurrent(target);
      return;
    }

    let startTimestamp: number | null = null;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth cubic ease-out curve for natural deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCurrent(easeOut * target);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCurrent(target);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [isVisible, target, duration]);

  const displayValue =
    decimals > 0
      ? current.toFixed(decimals)
      : Math.floor(current).toLocaleString("en-IN");

  return (
    <div className="flex items-baseline whitespace-nowrap overflow-hidden">
      <span className="text-3xl sm:text-4xl lg:text-[34px] xl:text-[40px] 2xl:text-5xl font-black text-[#141413] tracking-tight font-display">
        {prefix}
        {displayValue}
        {suffix}
      </span>
      {unit && (
        <span className="text-xl sm:text-2xl lg:text-xl xl:text-2xl font-extrabold text-[#141413] ml-1.5 tracking-tight font-display shrink-0 opacity-90">
          {unit}
        </span>
      )}
    </div>
  );
}

export function ProductMetrics() {
  const [activeStreamIndex, setActiveStreamIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const liveMatches = [
    { role: "Senior Full-Stack Engineer", company: "Techcy Routes", ctc: "₹38 LPA" },
    { role: "AI / LLM Architect", company: "WhiteTrack Technologies", ctc: "₹48 LPA" },
    { role: "Staff Cloud Lead", company: "WhiteAurax Labs", ctc: "₹42 LPA" },
    { role: "Distributed Systems Engineer", company: "QuantEdge Systems", ctc: "₹36 LPA" },
    { role: "Lead Product Designer", company: "HyperScale Mobility", ctc: "₹32 LPA" },
  ];

  // Auto-cycle through live match stream items
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStreamIndex((prev) => (prev + 1) % liveMatches.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [liveMatches.length]);

  // Trigger smooth counter animation when section scrolls into viewport
  useEffect(() => {
    if (isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const metrics = [
    {
      target: 50000,
      decimals: 0,
      suffix: "+",
      label: "Tech professionals",
      delay: "delay-[100ms]",
    },
    {
      target: 1200,
      decimals: 0,
      suffix: "+",
      label: "Verified employers",
      delay: "delay-[200ms]",
    },
    {
      target: 96.4,
      decimals: 1,
      suffix: "%",
      label: "Match accuracy",
      delay: "delay-[300ms]",
    },
    {
      target: 34.2,
      decimals: 1,
      prefix: "₹",
      unit: "LPA",
      label: "Average matched CTC",
      delay: "delay-[400ms]",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 bg-[#FAF9F6] border-b border-[#E2DDD3]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E2DDD3] text-[11px] font-mono font-bold text-[#141413] shadow-[1px_1px_0px_#141413] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
            <span>VERIFIED RECRUITMENT METRICS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#141413] tracking-tight font-display">
            Our Impact
          </h2>
          <p className="mt-2.5 text-base sm:text-lg text-[#52504B] font-sans max-w-2xl mx-auto leading-relaxed">
            Trusted by thousands to connect pre-vetted engineers to transparent CTC benchmarks and direct tech leadership.
          </p>
        </div>

        {/* Minimal Divided Stats Card with Tactile 1px Border & Hard Offset Shadow */}
        <div className="bg-white rounded-2xl border border-[#141413] shadow-[3px_3px_0px_#141413] overflow-hidden max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-[#E2DDD3]">
            {metrics.map((m, idx) => (
              <div
                key={idx}
                className={cn(
                  "px-6 py-8 sm:px-7 sm:py-9 lg:px-6 lg:py-8 xl:px-8 xl:py-9 flex flex-col items-start justify-center text-left bg-white transition-all duration-300 hover:bg-[#FAF9F6]",
                  idx % 2 === 1 ? "sm:border-l sm:border-[#E2DDD3] lg:border-l-0" : "",
                  idx >= 2 ? "sm:border-t sm:border-[#E2DDD3] lg:border-t-0" : "",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2",
                  m.delay
                )}
              >
                <AnimatedStat
                  target={m.target}
                  decimals={m.decimals}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  unit={m.unit}
                  duration={1600}
                  isVisible={isVisible}
                />
                <div className="text-xs sm:text-sm text-[#74726A] font-medium mt-2 leading-snug font-sans">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quiet Live Marketplace Activity Stream Ticker */}
        <div className="mt-8 max-w-5xl mx-auto px-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#74726A] font-sans">
          {/* Active Live Stream Item */}
          <div className="flex items-center gap-2 font-medium flex-wrap justify-center sm:justify-start">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
            </span>
            <span className="text-[#141413] uppercase tracking-wider text-[11px] font-mono font-bold shrink-0">
              Live match stream:
            </span>
            <span className="text-[#454540] transition-all duration-300">
              {liveMatches[activeStreamIndex].role} matched with{" "}
              <span className="text-[#141413] font-bold">
                {liveMatches[activeStreamIndex].company}
              </span>{" "}
              •{" "}
              <span className="text-[#15803D] font-mono font-bold">
                {liveMatches[activeStreamIndex].ctc}
              </span>
            </span>
          </div>

          {/* Partner Network Badge */}
          <div className="flex items-center gap-1.5 text-[#74726A] text-[11px] font-mono font-medium shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
            <span>Verified Partner Network · WhiteTrack</span>
          </div>
        </div>
      </div>
    </section>
  );
}
