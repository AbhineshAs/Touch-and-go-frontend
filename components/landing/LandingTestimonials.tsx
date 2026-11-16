"use client";

import React from "react";
import { Star, Award } from "lucide-react";

export function LandingTestimonials() {
  const testimonials = [
    {
      quote:
        "TAG eliminated recruiter spam completely. I created my profile, ran a Touch & Go match, and landed a Lead React role at WhiteTrack Technologies with a 45% hike in 4 days.",
      author: "Aditya S.",
      title: "Senior Full-Stack Engineer, Bengaluru",
      hike: "+45% CTC Hike",
      rating: 5,
    },
    {
      quote:
        "As an engineering director, sifting through 500 irrelevant resumes was a nightmare. TAG's shortlisting gave us 5 pre-vetted candidates with 95%+ criteria overlap.",
      author: "Meera Nair",
      title: "VP of Engineering, WhiteAurax",
      hike: "3 Senior Hires in 1 Wk",
      rating: 5,
    },
    {
      quote:
        "The salary transparency and instant interview scheduling at Zynorix Global are game changers. You know exactly what CTC to expect before walking into an interview.",
      author: "Rohan Kapoor",
      title: "Staff Cloud Architect, Gurgaon",
      hike: "₹42 LPA Offer",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F2] text-[#141413] border-b border-[#E8E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E2DDD3] text-[11px] font-mono font-bold text-[#141413] mb-4 shadow-[1px_1px_0px_#141413]">
            <Award className="w-3.5 h-3.5 text-[#769FCD]" />
            <span>COMMUNITY TESTIMONIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#141413] leading-tight font-display mb-4">
            Loved by candidates &amp;{" "}
            <span className="relative inline-block px-3.5 py-0.5 rounded-2xl bg-[#D6E6F2] text-[#1A2838] border border-[#B9D7EA]/60 shadow-[2px_2px_0px_#769FCD]">
              hiring managers
            </span>
          </h2>
          <p className="text-[#5A5852] font-sans font-normal text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            See how Touch And Go is transforming tech recruitment across India.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between group border border-[#E2DDD3] hover:border-[#769FCD] shadow-[0_4px_24px_rgba(26,40,56,0.06)] hover:shadow-[0_8px_30px_rgba(118,159,205,0.15)] transition-all hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-[#769FCD]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#769FCD] text-[#769FCD]" />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#141413] bg-[#FAF7F2] px-3 py-1 rounded-xl border border-[#E8E2D8] shadow-2xs">
                    {t.hike}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#141413]/90 leading-relaxed italic mb-6 font-sans">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E2D8]">
                <div className="font-black text-sm text-[#141413] font-display">{t.author}</div>
                <div className="text-xs text-[#5A5852] font-medium font-sans mt-0.5">{t.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
