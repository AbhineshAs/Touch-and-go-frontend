"use client";

import React from "react";
import { Zap, ShieldCheck, CheckCircle2, Sparkles, Laptop, Headphones } from "lucide-react";

interface AuthVisualStageProps {
  mode?: "login" | "signup" | "forgot_password";
  role?: "candidate" | "employer";
  compact?: boolean;
  hideFooter?: boolean;
}

export function AuthVisualStage({
  mode = "login",
  role = "candidate",
  compact = false,
  hideFooter = false,
}: AuthVisualStageProps) {
  return (
    <div
      className={
        compact
          ? "relative w-full flex flex-col items-center justify-center p-2 select-none overflow-hidden"
          : "relative w-full h-full flex flex-col items-center justify-center p-6 sm:p-10 select-none overflow-hidden"
      }
    >
      {/* Warm Arched Backdrop Canvas */}
      <div
        className={
          compact
            ? "relative w-full max-w-[260px] aspect-[4/5] flex items-end justify-center"
            : "relative w-full max-w-[340px] sm:max-w-[400px] aspect-[4/5] flex items-end justify-center"
        }
      >
        {/* Soft Background Arch */}
        <div className="absolute inset-x-4 top-0 bottom-0 rounded-t-[140px] sm:rounded-t-[160px] bg-gradient-to-b from-[#FCE5D8] via-[#F7D3BF] to-[#F1C2A8] border border-[#ECD0BF] shadow-[inset_0_2px_12px_rgba(255,255,255,0.6)] overflow-hidden">
          {/* Subtle Ambient Radial Light */}
          <div className="absolute top-8 inset-x-0 h-40 bg-radial from-white/40 to-transparent pointer-events-none" />
          
          {/* Decorative geometric contour lines */}
          <div className="absolute -bottom-10 inset-x-0 h-32 bg-white/20 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Floating Accent Badge: Top Left */}
        <div className="absolute top-8 left-0 z-20 animate-bounce duration-1000">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E2DDD3] shadow-[0_8px_20px_rgba(20,20,19,0.08)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono font-bold text-[#141413]">
              {role === "candidate" ? "1-Touch Apply" : "Verified Talent"}
            </span>
          </div>
        </div>

        {/* Floating Accent Badge: Top Right */}
        <div className="absolute top-16 right-0 z-20">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E2DDD3] shadow-[0_8px_20px_rgba(20,20,19,0.08)]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#769FCD]" />
            <span className="text-[11px] font-mono font-bold text-[#141413]">
              {role === "candidate" ? "98% Vector Fit" : "Zero Recruiter Spam"}
            </span>
          </div>
        </div>

        {/* Central 3D Stylized Tech Character Illustration */}
        <div className="relative z-10 w-full flex flex-col items-center justify-end pb-4">
          <svg
            viewBox="0 0 320 320"
            className="w-64 sm:w-76 h-auto drop-shadow-[0_20px_30px_rgba(20,20,19,0.15)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ambient Shadow on Desk */}
            <ellipse cx="160" cy="295" rx="100" ry="12" fill="#D3A790" fillOpacity="0.5" />
            <ellipse cx="160" cy="295" rx="60" ry="8" fill="#B98973" fillOpacity="0.4" />

            {/* Desk Surface */}
            <rect x="30" y="292" width="260" height="8" rx="4" fill="#F8EDE5" stroke="#E2DDD3" strokeWidth="1.5" />

            {/* Character Body / White T-Shirt */}
            <path
              d="M110 240 Q110 200 135 190 Q160 185 185 190 Q210 200 210 240 L218 290 Q218 292 215 292 L105 292 Q102 292 102 290 Z"
              fill="#FFFFFF"
              stroke="#E8E2D8"
              strokeWidth="2"
            />
            {/* Shirt Shading & Contours */}
            <path
              d="M135 190 Q160 200 185 190 Q175 220 160 230 Q145 220 135 190 Z"
              fill="#F4EFEA"
            />
            <path
              d="M110 240 L125 292 L105 292 Z"
              fill="#EFE9E2"
            />
            <path
              d="M210 240 L195 292 L215 292 Z"
              fill="#E5DDD5"
            />

            {/* Neck */}
            <path
              d="M148 165 L148 190 Q160 195 172 190 L172 165 Z"
              fill="#E0A78B"
            />
            {/* Neck Shadow */}
            <path
              d="M148 165 Q160 175 172 165 Q172 178 160 182 Q148 178 148 165 Z"
              fill="#CC947B"
            />

            {/* Head / Face */}
            <ellipse cx="160" cy="140" rx="32" ry="36" fill="#F3BA9F" />
            
            {/* Cheeks / Warm Blushing */}
            <circle cx="142" cy="148" r="6" fill="#ECA287" fillOpacity="0.5" />
            <circle cx="178" cy="148" r="6" fill="#ECA287" fillOpacity="0.5" />

            {/* Eyes (Focused on screen) */}
            <ellipse cx="145" cy="138" rx="3.5" ry="4" fill="#201C1A" />
            <ellipse cx="175" cy="138" rx="3.5" ry="4" fill="#201C1A" />
            <circle cx="146.5" cy="136.5" r="1.5" fill="#FFFFFF" />
            <circle cx="176.5" cy="136.5" r="1.5" fill="#FFFFFF" />

            {/* Eyebrows */}
            <path d="M140 129 Q145 127 150 129" stroke="#2B211E" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M170 129 Q175 127 180 129" stroke="#2B211E" strokeWidth="2.5" strokeLinecap="round" />

            {/* Nose & Smile */}
            <path d="M160 142 L160 148 L163 149" stroke="#DB9A7E" strokeWidth="2" strokeLinecap="round" />
            <path d="M154 157 Q160 162 166 157" stroke="#9E5F48" strokeWidth="2" strokeLinecap="round" />

            {/* Modern Hair (Sculpted, styled 3D look) */}
            <path
              d="M128 135 C125 110 138 92 160 92 C182 92 195 110 192 135 C190 120 180 102 160 102 C140 102 130 120 128 135 Z"
              fill="#241B18"
            />
            <path
              d="M130 128 C132 105 146 95 162 95 C176 95 190 104 190 124 C185 114 175 108 160 108 C144 108 136 116 130 128 Z"
              fill="#382924"
            />
            {/* Front hair fringe */}
            <path
              d="M134 115 Q145 125 158 118 Q168 126 182 116 C176 106 168 100 156 100 C144 100 138 106 134 115 Z"
              fill="#241B18"
            />

            {/* White Over-Ear Headphones */}
            {/* Headphone Band */}
            <path
              d="M126 138 C124 100 135 84 160 84 C185 84 196 100 194 138"
              stroke="#FFFFFF"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M126 138 C124 100 135 84 160 84 C185 84 196 100 194 138"
              stroke="#D6DDD3"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Left Ear Cushion */}
            <rect x="122" y="128" width="9" height="24" rx="4.5" fill="#FFFFFF" stroke="#E2DDD3" strokeWidth="1.5" />
            <rect x="124" y="132" width="5" height="16" rx="2.5" fill="#EAE5DE" />
            {/* Right Ear Cushion */}
            <rect x="189" y="128" width="9" height="24" rx="4.5" fill="#FFFFFF" stroke="#E2DDD3" strokeWidth="1.5" />
            <rect x="191" y="132" width="5" height="16" rx="2.5" fill="#EAE5DE" />

            {/* Laptop Base & Keyboard Glow */}
            {/* Screen Back & Frame */}
            <path
              d="M120 235 L105 290 L215 290 L200 235 Q160 230 120 235 Z"
              fill="#E2E8F0"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />
            {/* Screen Inner Display Face */}
            <path
              d="M124 238 L110 286 L210 286 L196 238 Z"
              fill="#FFFFFF"
            />
            {/* Screen Code Lines Ambient Glow */}
            <path d="M135 248 L170 248" stroke="#769FCD" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M135 256 L185 256" stroke="#B9D7EA" strokeWidth="2" strokeLinecap="round" />
            <path d="M142 264 L165 264" stroke="#D6E6F2" strokeWidth="2" strokeLinecap="round" />
            <path d="M135 272 L180 272" stroke="#769FCD" strokeWidth="2" strokeLinecap="round" />
            {/* Apple / Brand Subtle Mark on Laptop Back */}
            <circle cx="160" cy="256" r="4.5" fill="#94A3B8" fillOpacity="0.3" />

            {/* Character Hands on Keyboard */}
            {/* Left Arm & Hand */}
            <path
              d="M110 240 Q105 270 120 285 Q130 290 140 288"
              stroke="#FFFFFF"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <circle cx="138" cy="287" r="7" fill="#F3BA9F" />
            {/* Right Arm & Hand */}
            <path
              d="M210 240 Q215 270 200 285 Q190 290 180 288"
              stroke="#FFFFFF"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <circle cx="182" cy="287" r="7" fill="#F3BA9F" />
          </svg>
        </div>

        {/* Ambient Laptop Base Reflection on Foreground */}
        <div className="absolute bottom-0 inset-x-8 h-2 bg-gradient-to-r from-transparent via-[#E8BFA8]/40 to-transparent blur-xs pointer-events-none" />
      </div>

      {/* Narrative Footer Micro-Copy */}
      {!hideFooter && !compact && (
        <div className="text-center mt-6 z-10 max-w-xs">
          <h3 className="font-display font-black text-sm text-[#141413] tracking-tight">
            {mode === "login" ? "Welcome back to your career edge" : "Join 14,000+ top tech professionals"}
          </h3>
          <p className="text-xs text-[#5A5852] font-sans mt-1 leading-relaxed">
            Pre-vetted engineering opportunities, verified salaries, and transparent hiring across India.
          </p>
        </div>
      )}
    </div>
  );
}
