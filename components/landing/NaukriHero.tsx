"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  ChevronDown,
  ArrowRight,
  ChevronRight,
  Video,
  Pause,
  Play,
} from "lucide-react";

export function NaukriHero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [workMode, setWorkMode] = useState("all");
  const [isPaused, setIsPaused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (locationQuery.trim()) params.set("location", locationQuery.trim());
    if (workMode !== "all") params.set("mode", workMode);
    router.push(`/jobs?${params.toString()}`);
  };

  const handleTagClick = (tag: string) => {
    router.push(`/jobs?q=${encodeURIComponent(tag)}`);
  };

  const companies = [
    {
      name: "Slack",
      jobs: "12 Jobs",
      logo: (
        <svg className="w-6 h-6" viewBox="0 0 128 128" fill="none">
          <path d="M26.7 80.3a13.3 13.3 0 1 1-13.4-13.3H26.7v13.3zm6.7 0a13.3 13.3 0 1 1 26.6 0v33.4a13.3 13.3 0 1 1-26.6 0V80.3z" fill="#E01E5A"/>
          <path d="M47.7 26.7a13.3 13.3 0 1 1-13.3-13.4v13.4h13.3zm0 6.7a13.3 13.3 0 1 1 0 26.6H14.3a13.3 13.3 0 1 1 0-26.6h33.4z" fill="#36C5F0"/>
          <path d="M101.3 47.7a13.3 13.3 0 1 1 13.4 13.3h-13.4V47.7zm-6.7 0a13.3 13.3 0 1 1-26.6 0V14.3a13.3 13.3 0 1 1 26.6 0v33.4z" fill="#2EB67D"/>
          <path d="M80.3 101.3a13.3 13.3 0 1 1 13.3 13.4v-13.4H80.3zm0-6.7a13.3 13.3 0 1 1 0-26.6h33.4a13.3 13.3 0 1 1 0 26.6H80.3z" fill="#ECB22E"/>
        </svg>
      ),
    },
    {
      name: "Google",
      jobs: "30 Jobs",
      logo: (
        <svg className="w-6 h-6" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
      ),
    },
    {
      name: "Apple",
      jobs: "22 Jobs",
      logo: (
        <svg className="w-6 h-6" viewBox="0 0 170 170" fill="#141413">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.66-7.8-11.91-14.28-6.3-9.5-11.36-20.2-15.18-32.08-3.82-11.89-5.73-23.36-5.73-34.42 0-14.26 3.65-26.31 10.95-36.14 7.3-9.84 16.63-14.86 28.01-15.07 4.91 0 10.23 1.25 15.96 3.75 5.73 2.5 9.77 3.82 12.13 3.96 1.83-.14 6.07-1.51 12.74-4.13 6.67-2.61 12.35-3.8 17.06-3.55 13.06.66 23.31 5.37 30.74 14.15-11.45 6.98-17.07 16.59-16.85 28.84.22 9.69 3.87 17.74 10.95 24.15 7.08 6.42 15.42 10.07 25.02 10.96-2.18 6.42-4.91 12.56-8.18 18.42zM119.22 33.15c0-7.39 2.65-14.28 7.95-20.67 5.3-6.39 11.91-10.47 19.83-12.24.44 1.76.66 3.42.66 4.97 0 7.39-2.73 14.44-8.18 21.15-5.45 6.72-12.15 10.84-20.1 12.37-.11-1.77-.16-3.63-.16-5.58z"/>
        </svg>
      ),
    },
    {
      name: "Microsoft",
      jobs: "39 Jobs",
      logo: (
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path fill="#F25022" d="M1 1h10v10H1z"/>
          <path fill="#7FBA00" d="M13 1h10v10H13z"/>
          <path fill="#00A4EF" d="M1 13h10v10H1z"/>
          <path fill="#FFB900" d="M13 13h10v10H13z"/>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      jobs: "100 Jobs",
      logo: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#0A66C2">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
    },
    {
      name: "Intercom",
      jobs: "39 Jobs",
      logo: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#1F8CEB">
          <path d="M19.64 2.36A12 12 0 0 0 4.36 19.64 12 12 0 0 0 19.64 2.36zM7.5 7.5a1 1 0 0 1 2 0v5a1 1 0 0 1-2 0v-5zm3 0a1 1 0 0 1 2 0v9a1 1 0 0 1-2 0v-9zm3 0a1 1 0 0 1 2 0v9a1 1 0 0 1-2 0v-9zm3 0a1 1 0 0 1 2 0v5a1 1 0 0 1-2 0v-5z"/>
        </svg>
      ),
    },
    {
      name: "Behance",
      jobs: "12 Jobs",
      logo: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#0057FF">
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.171 3-3.955 0-6.555-2.659-6.555-6.793 0-4.004 2.593-6.729 6.514-6.729 3.971 0 6.275 2.766 6.096 6.772h-9.61c.148 2.083 1.554 3.473 3.619 3.473 1.704 0 2.871-.854 3.327-2.021l1.78.298zm-5.263-5.748c-.085-1.589-1.127-2.684-2.757-2.684-1.547 0-2.637 1.082-2.868 2.684h5.625zm-12.463-7.252h-6v15h6.634c3.483 0 5.366-1.594 5.366-4.225 0-1.859-1.077-3.08-2.628-3.606 1.189-.544 1.986-1.674 1.986-3.218 0-2.457-1.849-3.951-5.358-3.951zm-3 5.5v-3h2.646c1.603 0 2.354.582 2.354 1.5s-.751 1.5-2.354 1.5h-2.646zm0 6.5v-3.5h3.083c1.784 0 2.617.653 2.617 1.75 0 1.096-.833 1.75-2.617 1.75h-3.083z"/>
        </svg>
      ),
    },
    {
      name: "Dribbble",
      jobs: "30 Jobs",
      logo: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#EA4C89">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm10.165 10.638c-.354-.029-2.784-.216-5.467.893 1.111 3.036 1.571 5.568 1.679 6.223 2.366-1.83 3.788-4.721 3.788-7.116zm-5.405 8.351c-.139-.8-.636-3.542-1.84-6.671-.045.014-.091.028-.137.043-4.996 1.705-6.812 5.127-6.953 5.404 1.75 1.341 3.934 2.145 6.307 2.145 1.64 0 3.18-.399 4.623-.921zm-10.231-1.393c.338-.635 2.458-4.148 7.375-5.696.115-.036.23-.07.347-.103-.312-.705-.654-1.424-1.03-2.148-4.549 1.343-8.91 1.336-9.351 1.335-.008.21-.013.421-.013.633 0 2.302.774 4.425 2.072 5.979zm-2.383-7.854c.489.004 4.095.006 8.349-1.189-1.282-2.3-2.671-4.225-2.885-4.516-3.212 1.055-5.464 4.079-5.464 7.616 0 .668.082 1.317.234 1.939zm8.514-6.32c.231.313 1.637 2.239 2.898 4.492 3.125-1.173 4.364-2.87 4.475-3.032-2.029-1.867-4.708-3.013-7.373-3.013-.001 0-.001 0 0 0 0 0 0 0 0 0zm6.183 4.298c-.18.25-1.579 2.083-4.854 3.398.283.567.548 1.137.794 1.705 2.923-1.096 5.864-.812 6.223-.775-.123-1.745-.85-3.327-2.163-4.328z"/>
        </svg>
      ),
    },
  ];

  // Quadruple items to ensure a mathematically flawless, seamless 60fps marquee loop on any screen width
  const marqueeCompanies = [
    ...companies,
    ...companies,
    ...companies,
    ...companies,
  ];

  return (
    <section
      id="hero-section"
      className="relative w-full overflow-hidden bg-[#FAF7F2] border-b border-[#E8E2D8] pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20 text-[#141413]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top 2-Column Split: Left Copy & Search, Right Character Illustration */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 lg:mb-20">
          {/* Left Column: Heading, Search Form, Keywords, Mini Testimonial */}
          <div className="lg:col-span-7 flex flex-col gap-7 sm:gap-8">
            {/* Main Editorial Headline with Pill Highlighter in #769FCD */}
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] xl:text-[66px] font-black text-[#141413] font-serif tracking-tight leading-[1.1] max-w-2xl">
              Launch a new{" "}
              <span className="relative inline-block px-3.5 py-1 my-1 rounded-2xl bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA]/60 shadow-[2px_2px_0px_#769FCD]">
                chapter in your
              </span>{" "}
              <span className="relative inline-block px-3.5 py-1 my-1 rounded-2xl bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA]/60 shadow-[2px_2px_0px_#769FCD]">
                career with us
              </span>
            </h1>

            {/* Segmented Search Form */}
            <form
              onSubmit={handleSearch}
              className="bg-white rounded-2xl border border-[#E2DDD3] shadow-[0_4px_24px_rgba(26,40,56,0.06)] p-2 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-2xl"
            >
              {/* Field 1: Job Title or Keyword */}
              <div className="flex-1 flex items-center gap-2.5 px-3 py-2">
                <Search className="w-4 h-4 text-[#769FCD] shrink-0" />
                <input
                  type="text"
                  placeholder="Job Title or keyword"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-[#141413] placeholder:text-[#899EAF] focus:outline-none font-sans"
                />
              </div>

              {/* Field 2: Location */}
              <div className="sm:border-l sm:border-[#E8E2D8] flex-1 flex items-center gap-2.5 px-3 py-2">
                <MapPin className="w-4 h-4 text-[#769FCD] shrink-0" />
                <input
                  type="text"
                  placeholder="Location"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-[#141413] placeholder:text-[#899EAF] focus:outline-none font-sans"
                />
              </div>

              {/* Field 3: Work Mode */}
              <div className="sm:border-l sm:border-[#E8E2D8] px-3 py-2 flex items-center">
                <select
                  value={workMode}
                  onChange={(e) => setWorkMode(e.target.value)}
                  className="bg-transparent text-xs font-bold text-[#141413] focus:outline-none cursor-pointer pr-1"
                >
                  <option value="all">Remotely ▾</option>
                  <option value="remote">Remote Only</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">On-site Hub</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[#141413] hover:bg-[#769FCD] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-[2px_2px_0px_#769FCD] transition-all cursor-pointer shrink-0 active:scale-95 flex items-center justify-center font-sans"
              >
                <span>Search job</span>
              </button>
            </form>

            {/* Popular Keywords Row */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-[#74726A] font-sans">Popular Keyword :</span>
              {["UI/UX Design", "Marketing", "Development", "React 19", "AI Architect"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className="px-3.5 py-1 rounded-full bg-white/90 hover:bg-white text-[#454540] hover:text-[#769FCD] border border-[#E2DDD3] hover:border-[#769FCD] transition-all text-xs font-medium font-sans cursor-pointer shadow-2xs"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Mini Testimonial Quote Card */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/70 border border-[#E8E2D8] max-w-lg shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#8A7156] text-white flex items-center justify-center font-serif text-lg font-bold shrink-0 shadow-xs">
                ❝
              </div>
              <div className="text-xs text-[#5A5852] leading-relaxed">
                <p className="font-medium text-[#454540]">
                  A resume platform that makes you stand out. Here you&apos;ll find all you need for
                  making your career successful. The best job portal website.
                </p>
                <div className="mt-1.5 font-bold text-[#141413] font-sans">
                  Adam Smith
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Character Vector Illustration matching Reference Image */}
          <div className="lg:col-span-5 flex items-center justify-center relative select-none">
            <div className="relative w-full max-w-[460px] aspect-[460/480] flex items-center justify-center">
              {/* Arched Background Shape */}
              <div className="absolute inset-x-8 sm:inset-x-12 top-6 bottom-4 rounded-t-full bg-[#E5DDD0] pointer-events-none" />

              {/* Floating Heart-Eyes Badge (Top Left) */}
              <div className="absolute top-2 left-6 sm:left-10 w-11 h-11 rounded-full bg-[#FFD233] border-2 border-[#141413] shadow-[2px_2px_0px_#141413] flex items-center justify-center text-lg z-20 animate-bounce duration-1000">
                😍
              </div>

              {/* Floating Scalloped Video Badge (Top Right) */}
              <div className="absolute top-10 right-4 sm:right-6 w-14 h-14 rounded-full bg-[#D4A359] border-2 border-[#141413] shadow-[3px_3px_0px_#141413] flex items-center justify-center text-white z-20 hover:scale-105 transition-transform cursor-pointer">
                <Video className="w-6 h-6 fill-white" />
              </div>

              {/* Developer Sitting Cross-Legged Vector SVG */}
              <svg
                viewBox="0 0 460 480"
                className="w-full h-full relative z-10 drop-shadow-xs"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Floor Shadow Ellipse */}
                <ellipse cx="230" cy="450" rx="190" ry="22" fill="#D6C7B2" opacity="0.9" />

                {/* Dark Trousers / Crossed Legs */}
                {/* Left Leg */}
                <path
                  d="M130 380 C110 400 130 435 200 440 C240 442 270 410 270 380 Z"
                  fill="#141413"
                />
                {/* Right Leg */}
                <path
                  d="M330 380 C360 400 340 435 260 440 C210 442 190 410 190 380 Z"
                  fill="#141413"
                />
                {/* Main Torso Lower Base */}
                <path
                  d="M165 340 C165 420 295 420 295 340 Z"
                  fill="#141413"
                />

                {/* Shoes: Left Sneaker */}
                <path
                  d="M100 440 C90 430 110 415 140 420 C145 435 130 450 110 450 Z"
                  fill="#FFFFFF"
                  stroke="#141413"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                <path d="M105 446 C120 448 135 442 138 436" stroke="#141413" strokeWidth="2.5" />

                {/* Shoes: Right Sneaker */}
                <path
                  d="M360 440 C370 430 350 415 320 420 C315 435 330 450 350 450 Z"
                  fill="#FFFFFF"
                  stroke="#141413"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                <path d="M355 446 C340 448 325 442 322 436" stroke="#141413" strokeWidth="2.5" />

                {/* Sweater Body (Styled in #769FCD primary blue per user instruction) */}
                <path
                  d="M160 210 C145 230 135 320 155 350 C175 355 285 355 305 350 C325 320 315 230 300 210 C270 200 190 200 160 210 Z"
                  fill="#769FCD"
                  stroke="#141413"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />

                {/* Left Arm / Sleeve */}
                <path
                  d="M160 215 C130 260 120 310 170 330 C190 335 195 320 185 300 C155 280 155 240 175 220 Z"
                  fill="#769FCD"
                  stroke="#141413"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />

                {/* Right Arm / Sleeve */}
                <path
                  d="M300 215 C330 260 340 310 290 330 C270 335 265 320 275 300 C305 280 305 240 285 220 Z"
                  fill="#769FCD"
                  stroke="#141413"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />

                {/* Code Symbol Badge on Chest </> */}
                <ellipse cx="230" cy="265" rx="28" ry="28" fill="#141413" />
                {/* Left bracket < */}
                <path
                  d="M222 258 L214 265 L222 272"
                  stroke="#FFFFFF"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Slash / */}
                <path
                  d="M227 274 L233 256"
                  stroke="#FFFFFF"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Right bracket > */}
                <path
                  d="M238 258 L246 265 L238 272"
                  stroke="#FFFFFF"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Hands typing on laptop */}
                <ellipse cx="205" cy="335" rx="12" ry="9" fill="#FFFFFF" stroke="#141413" strokeWidth="3" />
                <ellipse cx="255" cy="335" rx="12" ry="9" fill="#FFFFFF" stroke="#141413" strokeWidth="3" />

                {/* Open Laptop Casing & Screen */}
                {/* Keyboard Base */}
                <path
                  d="M175 345 L285 345 L270 365 L190 365 Z"
                  fill="#E8E2D8"
                  stroke="#141413"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                {/* Screen Display */}
                <path
                  d="M185 342 L245 285 L320 285 L260 342 Z"
                  fill="#FFFFFF"
                  stroke="#141413"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                {/* Screen Inner Display Tone */}
                <path
                  d="M192 338 L248 290 L310 290 L256 338 Z"
                  fill="#FAF7F2"
                />

                {/* Head & Neck */}
                {/* Neck */}
                <path d="M218 190 L218 215 C218 220 242 220 242 215 L242 190 Z" fill="#FFFFFF" stroke="#141413" strokeWidth="3.5" />

                {/* Face Contour */}
                <path
                  d="M205 130 C205 185 255 185 255 130 C255 105 205 105 205 130 Z"
                  fill="#FFFFFF"
                  stroke="#141413"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />

                {/* Facial Features (Clean Line Art) */}
                {/* Eyes */}
                <ellipse cx="218" cy="138" rx="2.5" ry="3.5" fill="#141413" />
                <ellipse cx="240" cy="138" rx="2.5" ry="3.5" fill="#141413" />
                {/* Smile */}
                <path
                  d="M222 152 Q229 160 236 152"
                  stroke="#141413"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Nose */}
                <path d="M228 140 L226 146 L230 146" stroke="#141413" strokeWidth="2.5" strokeLinecap="round" />

                {/* Curly Hair (Puffy White Cloud Contour) */}
                <path
                  d="M195 125 C185 110 190 90 205 85 C210 70 235 65 250 75 C265 65 290 80 285 100 C300 110 295 135 280 145 C285 160 270 175 255 170 C240 180 220 175 210 165 C195 165 185 145 195 125 Z"
                  fill="#FFFFFF"
                  stroke="#141413"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Companies Strip with Infinite Carousel (Emil Kowalski Motion & UI UX Pro Max) */}
        <div className="pt-8 border-t border-[#E8E2D8]/80">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <h3 className="text-base sm:text-lg font-bold text-[#141413] font-sans tracking-tight">
                Jobs by browsing world best companies
              </h3>
              <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-[11px] font-semibold border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                380+ Verified Openings
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Accessible Pause / Resume Toggle */}
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-[#74726A] hover:text-[#141413] bg-white/80 hover:bg-white border border-[#E2DDD3] hover:border-[#769FCD] transition-all cursor-pointer shadow-2xs"
                aria-label={isPaused ? "Resume infinite scroll" : "Pause infinite scroll"}
                title={isPaused ? "Resume carousel" : "Pause carousel"}
              >
                {isPaused ? (
                  <Play className="w-3 h-3 text-[#769FCD] fill-[#769FCD]" />
                ) : (
                  <Pause className="w-3 h-3 text-[#74726A]" />
                )}
                <span className="text-[11px] font-medium">{isPaused ? "Resume" : "Pause"}</span>
              </button>

              <Link
                href="/companies"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#769FCD] hover:text-[#141413] transition-colors"
              >
                <span>Explore all hiring partners</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Infinite Scrolling Company Carousel */}
          <div className="relative w-full overflow-hidden py-2 -my-2 group/carousel">
            {/* Left gradient fade mask */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-10" />

            {/* Right gradient fade mask with quick navigation button */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-10 flex items-center justify-end pr-1 sm:pr-2">
              <Link
                href="/companies"
                className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#141413] hover:bg-[#769FCD] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all group/btn"
                title="Browse all hiring companies"
                aria-label="Browse all hiring companies"
              >
                <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Continuous Infinite Track (Pause on hover & keyboard focus) */}
            <div
              className="animate-company-carousel flex items-center gap-3.5 w-max group-hover/carousel:[animation-play-state:paused] focus-within:[animation-play-state:paused] py-1"
              style={{ animationPlayState: isPaused ? "paused" : undefined }}
            >
              {marqueeCompanies.map((comp, idx) => (
                <Link
                  key={`${comp.name}-${idx}`}
                  href={`/jobs?company=${encodeURIComponent(comp.name)}`}
                  className="bg-white/90 hover:bg-white border border-[#E2DDD3] hover:border-[#769FCD] rounded-2xl p-4 flex flex-col items-center justify-center gap-2.5 min-w-[120px] sm:min-w-[134px] transition-all duration-200 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-6px_rgba(118,159,205,0.22)] cursor-pointer group shrink-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#769FCD] shadow-2xs"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] flex items-center justify-center p-2 group-hover:scale-110 group-hover:bg-white group-hover:border-[#B9D7EA] transition-all duration-200 shadow-2xs">
                    {comp.logo}
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-[#141413] group-hover:text-[#769FCD] transition-colors font-sans">
                      {comp.name}
                    </div>
                    <div className="text-[11px] font-medium text-[#74726A] mt-0.5">
                      {comp.jobs}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
