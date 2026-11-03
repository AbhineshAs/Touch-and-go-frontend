import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
import { NaukriHero } from "@/components/landing/NaukriHero";
import { ProductMetrics } from "@/components/landing/ProductMetrics";
import { ProductFeatureShowcase } from "@/components/landing/ProductFeatureShowcase";
import { ProductBentoGrid } from "@/components/landing/ProductBentoGrid";
import { LandingActivityMarquee } from "@/components/landing/LandingActivityMarquee";
import { NaukriJobCategories } from "@/components/landing/NaukriJobCategories";
import { NaukriFeaturedCompanies } from "@/components/landing/NaukriFeaturedCompanies";
import { NaukriJobGrid } from "@/components/landing/NaukriJobGrid";
import { LandingTestimonials } from "@/components/landing/LandingTestimonials";
import { LandingCtaBanner } from "@/components/landing/LandingCtaBanner";
import { LandingStickyBar } from "@/components/landing/LandingStickyBar";
import { ClientAuthRedirect } from "@/components/auth/ClientAuthRedirect";

export const metadata = {
  title: "TAG — Touch And Go | AI-Assisted Tech Recruitment Platform",
  description:
    "Touch And Go – India's premier AI-assisted tech recruitment marketplace connecting top talent with pre-vetted employers through explainable match scoring, salary transparency, and instant 1-touch applications.",
};

export default async function RootPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("tag_auth_token")?.value;
  const role = cookieStore.get("tag_active_role")?.value || "candidate";

  // If already joined (logged in / registered), route directly to workspace/portal
  if (token) {
    if (role === "employer") {
      redirect("/employer/dashboard");
    } else if (role === "admin") {
      redirect("/admin/dashboard");
    } else {
      redirect("/candidate/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F8FB] text-[#1A2838] flex flex-col font-sans selection:bg-[#769FCD] selection:text-white">
      {/* Client-side auth redirect for localStorage sessions */}
      <ClientAuthRedirect />

      {/* Glassmorphism Top Navigation */}
      <PublicNavbar />

      <main className="flex-1">
        {/* 1. Interactive 3D WebGL Hero Search Section */}
        <NaukriHero />

        {/* 2. Product Statistics Counters & Live Hiring Ticker */}
        <ProductMetrics />

        {/* 3. Interactive Product Demo Showcase & Live Match Engine Simulator */}
        <ProductFeatureShowcase />

        {/* 4. Bento Grid Product Advantages */}
        <ProductBentoGrid />

        {/* 5. Verified Employers & Sponsor Marquee */}
        <LandingActivityMarquee />

        {/* 6. Popular Tech Career Tracks Grid */}
        <NaukriJobCategories />

        {/* 7. Featured Hiring Companies Showcase */}
        <NaukriFeaturedCompanies />

        {/* 8. Daily Recommended Verified Job Listings */}
        <NaukriJobGrid />

        {/* 9. Verified Candidate Testimonials */}
        <LandingTestimonials />

        {/* 10. High-Converting Call to Action Banner */}
        <LandingCtaBanner />
      </main>

      {/* Floating Sticky Conversion Dock */}
      <LandingStickyBar />

      {/* Footer */}
      <Footer />
    </div>
  );
}
