"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import {
  ShieldCheck,
  Building2,
  MapPin,
  Globe,
  CheckCircle2,
  ArrowRight,
  LayoutDashboard,
  Camera,
  Upload,
  Trash2,
  X,
  Sparkles,
} from "lucide-react";
import { Organization } from "@/types";
import { getOrganization, updateOrganization } from "@/lib/api/employers";
import { LoadingState } from "@/components/ui/States";
import { useAuth } from "@/lib/auth/AuthContext";

export default function EmployerOrganizationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSetup = searchParams.get("setup") === "true";
  const { refreshAuth } = useAuth();

  const [org, setOrg] = useState<Organization | null>(null);
  const [logo, setLogo] = useState("");
  const [tagline, setTagline] = useState("");
  const [about, setAbout] = useState("");
  const [headquarters, setHeadquarters] = useState("");
  const [website, setWebsite] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoFeedback, setLogoFeedback] = useState<string | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    refreshAuth();
    async function load() {
      setIsLoading(true);
      const data = await getOrganization("org_razorwave");
      if (data) {
        setOrg(data);
        setLogo(data.logo || "");
        setTagline(data.tagline || "");
        setAbout(data.about || "");
        setHeadquarters(data.headquarters || "");
        setWebsite(data.website || "");
      }
      setIsLoading(false);
    }
    load();
  }, [refreshAuth]);

  // Handle Logo Upload / Change via File Picker
  const handleLogoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoError(null);

    // Validate type
    if (!file.type.startsWith("image/")) {
      setLogoError("Please upload an image file (PNG, JPG, WebP, or SVG).");
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setLogoError("Image size must be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setLogo(dataUrl);

      if (org) {
        try {
          const updated = await updateOrganization(org.id, { logo: dataUrl });
          setOrg(updated);
          setLogoFeedback("Company profile picture updated successfully!");
          setTimeout(() => setLogoFeedback(null), 3000);
        } catch {
          setLogoError("Failed to save logo. Please try again.");
        }
      }
    };
    reader.onerror = () => {
      setLogoError("Error reading the image file.");
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  // Handle Logo Removal / Delete
  const handleDeleteLogo = async () => {
    if (!org) return;
    setLogoError(null);
    try {
      setLogo("");
      const updated = await updateOrganization(org.id, { logo: "" });
      setOrg(updated);
      setLogoFeedback("Company profile picture removed.");
      setTimeout(() => setLogoFeedback(null), 3000);
    } catch {
      setLogoError("Failed to remove logo.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!org) return;
    setIsSubmitting(true);
    try {
      const updated = await updateOrganization(org.id, {
        logo,
        tagline,
        about,
        headquarters,
        website,
      });
      setOrg(updated);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveAndContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!org) return;
    setIsSubmitting(true);
    try {
      const updated = await updateOrganization(org.id, {
        logo,
        tagline,
        about,
        headquarters,
        website,
      });
      setOrg(updated);
      refreshAuth();
      router.push("/employer/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !org) {
    return <LoadingState message="Loading organization profile..." />;
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-16 font-sans">
      {/* Onboarding Welcome Banner for new employers */}
      {isSetup && (
        <div className="p-4 sm:p-5 rounded-2xl bg-primary-soft/50 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-sm font-bold text-text-primary">
                Account Created • Step 2 of 2: Organization Profile
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed">
                Confirm your company details below. When you click <strong>Save &amp; Continue to Dashboard</strong>, you will go straight to your Recruiter Dashboard.
              </p>
            </div>
          </div>

          <Link href="/employer/dashboard" className="shrink-0 self-end sm:self-center">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Skip to Dashboard
            </Button>
          </Link>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary font-display">
            Organization Profile
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Manage your company profile displayed to verified job seekers on TAG.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/employer/dashboard">
            <Button variant="outline" size="sm" leftIcon={<LayoutDashboard className="w-3.5 h-3.5" />}>
              Go to Dashboard
            </Button>
          </Link>
          <Link href={`/companies/${org.slug}`} target="_blank">
            <Button variant="secondary" size="sm">
              View Public Page
            </Button>
          </Link>
        </div>
      </div>

      {isSaved && (
        <div className="p-3.5 rounded-xl bg-success text-white text-xs font-semibold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>Organization profile updated successfully.</span>
        </div>
      )}

      {/* Header card with interactive profile picture management */}
      <Card className="p-6 bg-surface border-border flex flex-col sm:flex-row items-start gap-6">
        {/* Company Profile Picture / Logo Area */}
        <div className="flex flex-col items-center sm:items-start gap-2.5 shrink-0">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-dashed border-[#B9D7EA] hover:border-[#769FCD] overflow-hidden bg-white shadow-2xs group cursor-pointer transition-all flex items-center justify-center"
            title="Click to upload or change company profile picture"
          >
            {logo ? (
              <img
                src={logo}
                alt={org.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-200"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#1A2838] to-[#769FCD] text-white flex flex-col items-center justify-center font-bold text-2xl font-display">
                {org.name.slice(0, 1).toUpperCase()}
                <span className="text-[9px] font-mono font-medium opacity-80 mt-0.5">No Logo</span>
              </div>
            )}

            {/* Hover Camera Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-1 text-center">
              <Camera className="w-5 h-5 mb-1 text-white" />
              <span className="text-[10px] font-bold tracking-tight leading-tight">
                {logo ? "Change Photo" : "Add Photo"}
              </span>
            </div>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
            onChange={handleLogoFileChange}
            className="hidden"
          />

          {/* Action Buttons: Add/Edit & Delete */}
          <div className="flex items-center gap-1.5 w-full justify-center sm:justify-start">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-surface border border-border text-text-primary hover:bg-[#FAF7F2] hover:border-[#769FCD] transition-all cursor-pointer shadow-2xs"
            >
              <Upload className="w-3 h-3 text-[#769FCD]" />
              <span>{logo ? "Change" : "Upload"}</span>
            </button>

            {logo && (
              <button
                type="button"
                onClick={handleDeleteLogo}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300 transition-all cursor-pointer shadow-2xs"
                title="Delete company profile picture"
              >
                <Trash2 className="w-3 h-3" />
                <span>Remove</span>
              </button>
            )}
          </div>
        </div>

        {/* Organization Name, Status & Entity Details */}
        <div className="flex-1 flex flex-col justify-between self-stretch">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight font-display">
                {org.name}
              </h2>
              <span className="text-xs font-semibold text-success bg-success-soft px-2.5 py-0.5 rounded-full border border-success/20 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Entity
              </span>
            </div>
            <span className="text-xs text-text-muted mt-1 block">
              {org.industry} • {org.companySize}
            </span>
            <span className="text-xs text-text-secondary mt-1 block">
              {org.verification?.registeredEntityName || `${org.name} Pvt Ltd`}
            </span>
          </div>

          {/* Logo Status Feedback Banner */}
          {logoFeedback && (
            <div className="mt-3 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{logoFeedback}</span>
            </div>
          )}
          {logoError && (
            <div className="mt-3 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
              <X className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <span>{logoError}</span>
            </div>
          )}

          <div className="mt-3 pt-3 border-t border-border/60 flex flex-wrap items-center gap-4 text-xs text-text-muted">
            <span className="flex items-center gap-1 text-[11px]">
              <MapPin className="w-3 h-3 text-text-subtle" /> {headquarters || org.headquarters || "India"}
            </span>
            <span className="flex items-center gap-1 text-[11px]">
              <Globe className="w-3 h-3 text-text-subtle" /> {website || org.website || "Corporate Website"}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-text-subtle">
              <Sparkles className="w-3 h-3 text-[#769FCD]" /> Recommended square ratio (e.g. 400x400)
            </span>
          </div>
        </div>
      </Card>

      <form onSubmit={handleSaveAndContinue} className="flex flex-col gap-6">
        <Card className="p-6 bg-surface border-border flex flex-col gap-4">
          <h3 className="text-base font-bold text-text-primary">Public Information</h3>

          <Input
            label="Company Tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            required
          />

          <Textarea
            label="About the Organization"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={4}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Headquarters"
              value={headquarters}
              onChange={(e) => setHeadquarters(e.target.value)}
              required
            />
            <Input
              label="Official Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
            />
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <Link href="/employer/dashboard">
            <Button variant="ghost" size="md">
              Cancel
            </Button>
          </Link>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Button
              type="button"
              size="md"
              variant="outline"
              onClick={handleSave}
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Save Changes
            </Button>

            <Button
              type="submit"
              size="md"
              variant="primary"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Save &amp; Continue to Dashboard
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
