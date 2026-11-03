import React from "react";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck, Lock, FileCheck, Award } from "lucide-react";

export default function TrustPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F8FB] text-[#1A2838] font-sans">
      <PublicNavbar />

      <section className="py-16 lg:py-20 bg-white border-b border-[#B9D7EA] shadow-2xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D6E6F2] border border-[#B9D7EA] text-xs font-bold text-[#1A2838] shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#769FCD]" />
            <span>TRUST, SAFETY &amp; GOVERNANCE CHARTER</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A2838]">
            Our Responsible <span className="text-[#769FCD]">Marketplace Charter</span>
          </h1>
          <p className="text-sm sm:text-base text-[#1A2838]/70 max-w-2xl leading-relaxed mt-1 font-medium">
            How Touch And Go safeguards candidate privacy, eliminates scam job listings, enforces corporate verification, and guarantees transparent recruitment in India.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-6 flex-1">
        {/* Principle 1 */}
        <div className="bg-white border border-[#B9D7EA] rounded-2xl p-6 sm:p-8 shadow-2xs hover:shadow-md hover:border-[#769FCD] transition-all flex flex-col gap-3">
          <div className="flex items-center gap-3 text-[#1A2838] font-extrabold text-base">
            <Award className="w-5 h-5 text-[#769FCD]" />
            <span>1. Transparent Criteria Alignment &amp; Explainable Matching</span>
          </div>
          <p className="text-xs sm:text-sm text-[#1A2838]/75 leading-relaxed font-medium">
            We categorically reject black-box hiring algorithms that produce opaque scores. On TAG, every match percentage reflects real criteria alignment against published job specifications, split into Matched, Missing, and Verified evidence blocks.
          </p>
          <div className="p-3.5 bg-[#D6E6F2]/40 rounded-xl border border-[#B9D7EA] text-xs text-[#1A2838] font-medium">
            <strong className="font-bold text-[#1A2838]">Core Rule:</strong> Unconfirmed data points are never treated as a penalty. They simply represent items pending verification.
          </div>
        </div>

        {/* Principle 2 */}
        <div className="bg-white border border-[#B9D7EA] rounded-2xl p-6 sm:p-8 shadow-2xs hover:shadow-md hover:border-[#769FCD] transition-all flex flex-col gap-3">
          <div className="flex items-center gap-3 text-[#1A2838] font-extrabold text-base">
            <ShieldCheck className="w-5 h-5 text-[#769FCD]" />
            <span>2. Mandatory Corporate Domain &amp; Identity Verification</span>
          </div>
          <p className="text-xs sm:text-sm text-[#1A2838]/75 leading-relaxed font-medium">
            To publish a job or connect with candidates, every employer must submit government registration documentation (Certificate of Incorporation, GSTIN) and verify corporate domain ownership. Unverified accounts cannot message candidates or view unmasked candidate data.
          </p>
        </div>

        {/* Principle 3 */}
        <div className="bg-white border border-[#B9D7EA] rounded-2xl p-6 sm:p-8 shadow-2xs hover:shadow-md hover:border-[#769FCD] transition-all flex flex-col gap-3">
          <div className="flex items-center gap-3 text-[#1A2838] font-extrabold text-base">
            <Lock className="w-5 h-5 text-[#769FCD]" />
            <span>3. Candidate Privacy &amp; Consent by Design</span>
          </div>
          <p className="text-xs sm:text-sm text-[#1A2838]/75 leading-relaxed font-medium">
            Resumes uploaded to TAG are parsed into structured data for candidate review. No information extracted from a resume becomes part of your active profile without your explicit confirmation. Candidates maintain full control over profile visibility.
          </p>
        </div>

        {/* Principle 4 */}
        <div className="bg-white border border-[#B9D7EA] rounded-2xl p-6 sm:p-8 shadow-2xs hover:shadow-md hover:border-[#769FCD] transition-all flex flex-col gap-3">
          <div className="flex items-center gap-3 text-[#1A2838] font-extrabold text-base">
            <FileCheck className="w-5 h-5 text-[#769FCD]" />
            <span>4. Immutable Audit Logs &amp; Anti-Scraping Defenses</span>
          </div>
          <p className="text-xs sm:text-sm text-[#1A2838]/75 leading-relaxed font-medium">
            Every status change, employer verification, and application movement is recorded in an append-only audit log. Aggressive rate-limiting and anti-scraping defenses prevent bots from harvesting developer identities across India.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
