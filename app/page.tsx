import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
import { NaukriHero } from "@/components/landing/NaukriHero";
import { ProductMetrics } from "@/components/landing/ProductMetrics";
import { NaukriJobCategories } from "@/components/landing/NaukriJobCategories";
import { NaukriJobGrid } from "@/components/landing/NaukriJobGrid";
import { ClientAuthRedirect } from "@/components/auth/ClientAuthRedirect";

// Below-the-fold deferred chunks to optimize initial bundle size, FCP and LCP
const ProductFeatureShowcase = dynamic(
  () => import("@/components/landing/ProductFeatureShowcase").then((m) => m.ProductFeatureShowcase)
);
const ProductBentoGrid = dynamic(
  () => import("@/components/landing/ProductBentoGrid").then((m) => m.ProductBentoGrid)
);
const LandingActivityMarquee = dynamic(
  () => import("@/components/landing/LandingActivityMarquee").then((m) => m.LandingActivityMarquee)
);
const NaukriFeaturedCompanies = dynamic(
  () => import("@/components/landing/NaukriFeaturedCompanies").then((m) => m.NaukriFeaturedCompanies)
);
const LandingTestimonials = dynamic(
  () => import("@/components/landing/LandingTestimonials").then((m) => m.LandingTestimonials)
);
const LandingCtaBanner = dynamic(
  () => import("@/components/landing/LandingCtaBanner").then((m) => m.LandingCtaBanner)
);
const LandingStickyBar = dynamic(
  () => import("@/components/landing/LandingStickyBar").then((m) => m.LandingStickyBar)
);

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

      {/* Transparent / Glassmorphism Top Navigation */}
      <PublicNavbar transparent />

      <main className="flex-1 -mt-20">
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
