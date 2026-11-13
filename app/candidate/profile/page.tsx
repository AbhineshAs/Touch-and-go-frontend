"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  GraduationCap,
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  Upload,
  Eye,
  CheckCircle2,
  FileText,
  Briefcase,
  Layers,
  FolderGit2,
  ArrowLeft,
  Calendar,
  Camera,
  Image as ImageIcon,
} from "lucide-react";
import { useCandidate } from "@/lib/candidate/context/CandidateContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { updateStoredUser } from "@/lib/api/auth";
import { formatSalaryRange } from "@/lib/utils";
import { CandidateSkill } from "@/lib/candidate/types";

const PRESET_AVATARS = [
  {
    id: "preset_1",
    label: "Modern Professional",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80",
  },
  {
    id: "preset_2",
    label: "Engineering Lead",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80",
  },
  {
    id: "preset_3",
    label: "Product Designer",
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&auto=format&fit=crop&q=80",
  },
  {
    id: "preset_4",
    label: "Full Stack Engineer",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80",
  },
  {
    id: "preset_5",
    label: "Tech Specialist",
    url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&auto=format&fit=crop&q=80",
  },
  {
    id: "preset_6",
    label: "Software Architect",
    url: "https://images.unsplash.com/photo-1534751516642-a1714f32145b?w=240&auto=format&fit=crop&q=80",
  },
];

export default function CandidateProfilePage() {
  const {
    candidateRecord,
    completeness,
    updateCandidateProfile,
    addEducation,
    deleteEducation,
    addExperience,
    deleteExperience,
    addProject,
    deleteProject,
    addSkill,
    deleteSkill,
    updatePreferences,
  } = useCandidate();

  const { user: authUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [photoDraft, setPhotoDraft] = useState("");
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Edit Personal Info Modal
  const [isPersonalModalOpen, setIsPersonalModalOpen] = useState(false);
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");

  // Add Experience Modal
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [expTitle, setExpTitle] = useState("");
  const [expCompany, setExpCompany] = useState("");
  const [expLocation, setExpLocation] = useState("");
  const [expStartDate, setExpStartDate] = useState("");
  const [expEndDate, setExpEndDate] = useState("");
  const [expCurrent, setExpCurrent] = useState(false);
  const [expDescription, setExpDescription] = useState("");
  const [expSkills, setExpSkills] = useState("");

  // Add Education Modal
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [eduDegree, setEduDegree] = useState("");
  const [eduInstitution, setEduInstitution] = useState("");
  const [eduField, setEduField] = useState("");
  const [eduStartYear, setEduStartYear] = useState("");
  const [eduEndYear, setEduEndYear] = useState("");
  const [eduGrade, setEduGrade] = useState("");

  // Add Project Modal
  const [isProjModalOpen, setIsProjModalOpen] = useState(false);
  const [projTitle, setProjTitle] = useState("");
  const [projDescription, setProjDescription] = useState("");
  const [projTech, setProjTech] = useState("");
  const [projUrl, setProjUrl] = useState("");

  // Add Skill Modal
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState<"new" | "learning" | "comfortable" | "confident">("comfortable");

  // Edit Preferences Modal
  const [isPrefsModalOpen, setIsPrefsModalOpen] = useState(false);
  const [prefWorkMode, setPrefWorkMode] = useState<"remote" | "hybrid" | "onsite" | "any">("any");
  const [prefJobType, setPrefJobType] = useState<"full_time" | "internship" | "contract" | "any">("any");
  const [prefAvailability, setPrefAvailability] = useState<"immediate" | "1_month" | "3_months" | "exploring" | "unsure">("immediate");
  const [prefSalaryINR, setPrefSalaryINR] = useState("");

  const showNotice = () => {
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  if (!candidateRecord) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <h2 className="text-xl font-bold text-text-primary">No Active Candidate Record</h2>
        <p className="text-xs text-text-muted">Complete onboarding to create your structured profile.</p>
        <Link href="/onboarding">
          <Button size="md" variant="primary">
            Start Onboarding
          </Button>
        </Link>
      </div>
    );
  }

  const { identity, profile } = candidateRecord;
  const fullName = identity?.fullName || "Candidate";
  const currentAvatarUrl = profile?.avatarUrl || authUser?.avatarUrl || "";

  const handleOpenPhotoModal = () => {
    setPhotoDraft(currentAvatarUrl);
    setIsPhotoModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Please upload an image smaller than 5MB.");
      return;
    }

    setIsUploadingPhoto(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setPhotoDraft(dataUrl);
      }
      setIsUploadingPhoto(false);
    };
    reader.onerror = () => {
      setIsUploadingPhoto(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSavePhoto = (newAvatarUrl?: string) => {
    const finalUrl = newAvatarUrl !== undefined ? newAvatarUrl : photoDraft;

    // Update candidate profile context
    updateCandidateProfile({
      avatarUrl: finalUrl ? finalUrl.trim() : undefined,
    });

    // Update stored user in Auth context so header/sidebar update immediately
    updateStoredUser({
      avatarUrl: finalUrl ? finalUrl.trim() : undefined,
    });

    setIsPhotoModalOpen(false);
    showNotice();
  };

  const handleRemovePhoto = () => {
    handleSavePhoto("");
  };

  const handleOpenPersonalModal = () => {
    setHeadline(profile?.headline || "");
    setSummary(profile?.summary || "");
    setLocation(profile?.location || "India");
    setPhone(profile?.phone || identity?.phone || "");
    setIsPersonalModalOpen(true);
  };

  const handleSavePersonal = (e: React.FormEvent) => {
    e.preventDefault();
    updateCandidateProfile({
      headline,
      summary,
      location,
      phone,
    });
    setIsPersonalModalOpen(false);
    showNotice();
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle || !expCompany) return;
    addExperience({
      title: expTitle,
      company: expCompany,
      location: expLocation || "India",
      startDate: expStartDate || "2024",
      endDate: expCurrent ? undefined : expEndDate || "Present",
      current: expCurrent,
      description: expDescription,
      skillsUsed: expSkills ? expSkills.split(",").map((s) => s.trim()).filter(Boolean) : [],
    });
    setIsExpModalOpen(false);
    setExpTitle("");
    setExpCompany("");
    setExpLocation("");
    setExpStartDate("");
    setExpEndDate("");
    setExpDescription("");
    setExpSkills("");
    showNotice();
  };

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduDegree || !eduInstitution) return;
    addEducation({
      degree: eduDegree,
      institution: eduInstitution,
      fieldOfStudy: eduField || "Computer Science",
      startYear: eduStartYear || "2022",
      endYear: eduEndYear || "2026",
      grade: eduGrade || undefined,
    });
    setIsEduModalOpen(false);
    setEduDegree("");
    setEduInstitution("");
    setEduField("");
    setEduStartYear("");
    setEduEndYear("");
    setEduGrade("");
    showNotice();
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle || !projDescription) return;
    addProject({
      title: projTitle,
      description: projDescription,
      technologies: projTech ? projTech.split(",").map((t) => t.trim()).filter(Boolean) : [],
      url: projUrl || undefined,
    });
    setIsProjModalOpen(false);
    setProjTitle("");
    setProjDescription("");
    setProjTech("");
    setProjUrl("");
    showNotice();
  };

  const handleAddSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    addSkill({
      name: newSkillName.trim(),
      level: newSkillLevel,
    });
    setIsSkillModalOpen(false);
    setNewSkillName("");
    showNotice();
  };

  const handleOpenPrefsModal = () => {
    setPrefWorkMode(profile?.jobPreferences?.desiredWorkModes?.[0] || "any");
    setPrefJobType(profile?.jobPreferences?.employmentTypes?.[0] || "any");
    setPrefAvailability(profile?.jobPreferences?.availability || "immediate");
    setPrefSalaryINR(
      profile?.jobPreferences?.minimumSalaryINR ? String(profile.jobPreferences.minimumSalaryINR) : ""
    );
    setIsPrefsModalOpen(true);
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences({
      desiredWorkModes: [prefWorkMode],
      employmentTypes: [prefJobType],
      availability: prefAvailability,
      minimumSalaryINR: prefSalaryINR ? parseInt(prefSalaryINR, 10) : undefined,
    });
    setIsPrefsModalOpen(false);
    showNotice();
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-16">
      {/* Notice Banner */}
      {isSavedNotice && (
        <div className="fixed top-4 right-4 z-50 p-3.5 rounded-xl bg-success text-white shadow-xl text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile changes saved successfully. (Revision {candidateRecord.profileRevision})</span>
        </div>
      )}

      {/* Header & Personal Info Card */}
      <Card className="p-6 sm:p-8 bg-surface border-border shadow-xs flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="flex items-start gap-5">
            {/* Interactive Profile Avatar with Photo Edit/Upload */}
            <div className="relative group shrink-0">
              <button
                type="button"
                onClick={handleOpenPhotoModal}
                className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden cursor-pointer relative shadow-sm border border-border group-hover:border-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 block text-left bg-surface"
                title="Click to add or change profile picture"
              >
                {currentAvatarUrl ? (
                  <img
                    src={currentAvatarUrl}
                    alt={fullName}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center font-black text-2xl sm:text-3xl">
                    {fullName.charAt(0).toUpperCase()}
                  </div>
                )}

                {/* Hover Camera Overlay */}
                <div className="absolute inset-0 bg-[#141413]/60 backdrop-blur-2xs text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-5 h-5 mb-0.5 text-white" />
                  <span className="text-[10px] font-bold tracking-tight">Edit Photo</span>
                </div>
              </button>

              {/* Floating Camera Button Badge */}
              <button
                type="button"
                onClick={handleOpenPhotoModal}
                className="absolute -bottom-1.5 -right-1.5 p-1.5 rounded-full bg-white text-[#141413] border border-[#E8E2D8] hover:border-primary hover:text-primary shadow-sm hover:scale-110 active:scale-95 transition-all cursor-pointer z-10"
                title="Change Profile Picture"
              >
                <Camera className="w-3.5 h-3.5 text-primary" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-text-primary">
                  {fullName}
                </h1>
                <span className="text-[11px] font-semibold text-primary bg-primary-soft px-2.5 py-0.5 rounded-full border border-primary/20">
                  {completeness.score}% Complete
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-text-secondary">
                {profile?.headline || "Technology Candidate"}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted mt-2">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-text-muted" />
                  {profile?.location || "India"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-text-muted" />
                  {identity?.email || "candidate@tagjobs.in"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-text-muted" />
                  {profile?.phone || identity?.phone || "+91 98765 43210"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              variant="outline"
              leftIcon={<Edit2 className="w-3.5 h-3.5" />}
              onClick={handleOpenPersonalModal}
            >
              Edit Details
            </Button>
            <Link href="/candidate/resume">
              <Button size="sm" variant="primary" leftIcon={<FileText className="w-3.5 h-3.5" />}>
                Resume
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Professional Summary */}
      <Card className="p-6 bg-surface border-border flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-text-primary">Professional Summary</h2>
          <button
            onClick={handleOpenPersonalModal}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Edit2 className="w-3 h-3" />
            <span>Edit</span>
          </button>
        </div>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed whitespace-pre-line">
          {profile?.summary || "No professional summary added yet."}
        </p>
      </Card>

      {/* Experience Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">
            Work Experience ({profile?.experience?.length || 0})
          </h2>
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => setIsExpModalOpen(true)}
          >
            Add Experience
          </Button>
        </div>

        {profile?.experience && profile.experience.length > 0 ? (
          <div className="flex flex-col gap-4">
            {profile.experience.map((exp) => (
              <Card key={exp.id} className="p-6 bg-surface border-border flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0 font-bold">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-base font-bold text-text-primary">{exp.title}</h3>
                      <span className="text-xs font-semibold text-text-secondary">
                        {exp.company} • {exp.location}
                      </span>
                      <span className="text-[11px] text-text-muted mt-0.5">
                        {exp.startDate} – {exp.current ? "Present" : exp.endDate || "Present"}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      deleteExperience(exp.id);
                      showNotice();
                    }}
                    className="p-1.5 text-text-muted hover:text-danger rounded-lg hover:bg-background transition-colors cursor-pointer"
                    title="Delete experience"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {exp.description && (
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed pt-1 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}

                {exp.skillsUsed && exp.skillsUsed.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.skillsUsed.map((sk) => (
                      <span
                        key={sk}
                        className="text-[11px] px-2 py-0.5 rounded bg-background border border-border text-text-secondary"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 bg-surface border-border text-center text-xs text-text-muted">
            No work experience entries listed yet. Click &ldquo;Add Experience&rdquo; to structure prior positions.
          </Card>
        )}
      </div>

      {/* Projects Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">
            Projects ({profile?.projects?.length || 0})
          </h2>
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => setIsProjModalOpen(true)}
          >
            Add Project
          </Button>
        </div>

        {profile?.projects && profile.projects.length > 0 ? (
          <div className="flex flex-col gap-4">
            {profile.projects.map((proj) => (
              <Card key={proj.id} className="p-6 bg-surface border-border flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0 font-bold">
                      <FolderGit2 className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-base font-bold text-text-primary">{proj.title}</h3>
                      {proj.url && (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline"
                        >
                          {proj.url}
                        </a>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      deleteProject(proj.id);
                      showNotice();
                    }}
                    className="p-1.5 text-text-muted hover:text-danger rounded-lg hover:bg-background transition-colors cursor-pointer"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed pt-1">
                  {proj.description}
                </p>

                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2 py-0.5 rounded bg-background border border-border text-text-secondary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 bg-surface border-border text-center text-xs text-text-muted">
            No projects added yet. Adding a project provides tangible evidence of your engineering ability.
          </Card>
        )}
      </div>

      {/* Skills Section */}
      <Card className="p-6 bg-surface border-border flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-text-primary">
            Technical & Domain Skills ({profile?.skills?.length || 0})
          </h2>
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => setIsSkillModalOpen(true)}
          >
            Add Skill
          </Button>
        </div>

        {profile?.skills && profile.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <div
                key={skill.name}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-background border border-border"
              >
                <span>{skill.name}</span>
                <span className="text-[10px] px-1 rounded bg-border-subtle text-text-muted capitalize">
                  {skill.level}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    deleteSkill(skill.name);
                    showNotice();
                  }}
                  className="hover:text-danger text-text-muted ml-0.5 cursor-pointer"
                  aria-label={`Remove ${skill.name}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-text-muted italic">No skills listed yet.</p>
        )}
      </Card>

      {/* Education Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">
            Education ({profile?.education?.length || 0})
          </h2>
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => setIsEduModalOpen(true)}
          >
            Add Education
          </Button>
        </div>

        {profile?.education && profile.education.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.education.map((edu) => (
              <Card key={edu.id} className="p-5 bg-surface border-border flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-soft text-primary flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xs font-bold text-text-primary">{edu.degree}</h3>
                    <span className="text-xs text-text-secondary">{edu.institution}</span>
                    <span className="text-[11px] text-text-muted">
                      {edu.startYear} – {edu.endYear} {edu.grade ? `• ${edu.grade}` : ""}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    deleteEducation(edu.id);
                    showNotice();
                  }}
                  className="p-1.5 text-text-muted hover:text-danger rounded-lg hover:bg-background transition-colors cursor-pointer"
                  title="Delete education"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 bg-surface border-border text-center text-xs text-text-muted">
            No education entries added yet.
          </Card>
        )}
      </div>

      {/* Job Preferences Card */}
      <Card className="p-6 bg-surface border-border flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-text-primary">Job Preferences</h2>
          <Button size="sm" variant="outline" onClick={handleOpenPrefsModal}>
            Edit Preferences
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-lg bg-background border border-border-subtle flex flex-col gap-1">
            <span className="text-text-muted">Work Mode</span>
            <span className="font-semibold text-text-primary capitalize">
              {profile?.jobPreferences?.desiredWorkModes?.join(", ") || "Any"}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-background border border-border-subtle flex flex-col gap-1">
            <span className="text-text-muted">Job Type</span>
            <span className="font-semibold text-text-primary capitalize">
              {profile?.jobPreferences?.employmentTypes?.join(", ") || "Any"}
            </span>
          </div>
          <div className="p-3 rounded-lg bg-background border border-border-subtle flex flex-col gap-1">
            <span className="text-text-muted">Availability</span>
            <span className="font-semibold text-text-primary capitalize">
              {profile?.jobPreferences?.availability?.replace(/_/g, " ") || "Immediate"}
            </span>
          </div>
        </div>
      </Card>

      {/* MODAL: EDIT PERSONAL INFO */}
      <Modal
        isOpen={isPersonalModalOpen}
        onClose={() => setIsPersonalModalOpen(false)}
        title="Edit Personal Information"
        description="Update your contact, location, and professional headline."
        size="md"
      >
        <form onSubmit={handleSavePersonal} className="flex flex-col gap-4">
          {/* Profile Photo Quick Section */}
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8]">
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#E8E2D8] bg-white shadow-2xs">
              {currentAvatarUrl ? (
                <img src={currentAvatarUrl} alt={fullName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center font-bold text-base">
                  {fullName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <span className="text-xs font-bold text-[#141413]">Profile Photo</span>
              <span className="text-[11px] text-[#74726A]">
                {currentAvatarUrl ? "Custom profile picture set" : "Initials placeholder active"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsPersonalModalOpen(false);
                handleOpenPhotoModal();
              }}
              className="px-3 py-1.5 rounded-xl border border-[#E8E2D8] hover:border-primary text-xs font-bold text-[#141413] hover:text-primary bg-white transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5 text-primary" />
              <span>Change</span>
            </button>
          </div>

          <Input
            label="Professional Headline"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            required
          />
          <Textarea
            label="Professional Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={4}
            required
          />
          <Input
            label="Current Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <Input
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <Button type="button" variant="secondary" size="sm" onClick={() => setIsPersonalModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL: UPDATE PROFILE PICTURE */}
      <Modal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        title="Update Profile Picture"
        description="Upload a photo from your computer, choose a professional preset, or link an image."
        size="md"
      >
        <div className="flex flex-col gap-5">
          {/* Current / Draft Preview */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8]">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-[#E8E2D8] bg-white shadow-xs">
              {photoDraft ? (
                <img src={photoDraft} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center font-black text-xl">
                  {fullName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-xs font-bold text-[#141413]">
                {photoDraft ? "Photo Selected" : "Default Initials"}
              </span>
              <span className="text-[11px] text-[#74726A]">
                Square image recommended. Supports PNG, JPG, GIF, WebP up to 5MB.
              </span>
            </div>
          </div>

          {/* Action 1: Upload from Computer */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#141413]">Upload from Device</span>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              disabled={isUploadingPhoto}
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-[#E8E2D8] hover:border-primary bg-[#FAF7F2]/50 hover:bg-white text-xs font-bold text-[#141413] flex items-center justify-center gap-2 transition-all cursor-pointer group disabled:opacity-50"
            >
              <Upload className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <span>{isUploadingPhoto ? "Processing Image..." : "Choose Image File from Computer"}</span>
            </button>
          </div>

          {/* Action 2: Choose from Curated Presets */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#141413]">Or Choose a Professional Avatar</span>
              <span className="text-[10px] font-mono text-[#74726A]">Instant High-Res</span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {PRESET_AVATARS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setPhotoDraft(preset.url)}
                  className={`group relative rounded-xl overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                    photoDraft === preset.url
                      ? "border-primary ring-2 ring-primary/30 scale-105 shadow-xs"
                      : "border-transparent hover:border-[#B9D7EA]"
                  }`}
                  title={preset.label}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                  {photoDraft === preset.url && (
                    <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white drop-shadow" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Action 3: Image URL input */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-[#141413]">Or Paste Image URL</span>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={photoDraft}
                onChange={(e) => setPhotoDraft(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#E8E2D8] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:border-primary"
              />
              {photoDraft && (
                <button
                  type="button"
                  onClick={() => setPhotoDraft("")}
                  className="px-2.5 py-1.5 rounded-xl border border-[#E8E2D8] text-xs text-[#74726A] hover:text-red-600 transition-colors cursor-pointer"
                  title="Clear Input"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            {currentAvatarUrl ? (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Photo</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setIsPhotoModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => handleSavePhoto()}
              >
                Save Photo
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* MODAL: ADD EXPERIENCE */}
      <Modal
        isOpen={isExpModalOpen}
        onClose={() => setIsExpModalOpen(false)}
        title="Add Experience"
        size="md"
      >
        <form onSubmit={handleAddExperience} className="flex flex-col gap-4">
          <Input
            label="Job Title"
            placeholder="e.g. Frontend Engineer"
            value={expTitle}
            onChange={(e) => setExpTitle(e.target.value)}
            required
          />
          <Input
            label="Company Name"
            placeholder="e.g. Acme Technologies"
            value={expCompany}
            onChange={(e) => setExpCompany(e.target.value)}
            required
          />
          <Input
            label="Location"
            placeholder="e.g. Bengaluru, Karnataka (Remote / Hybrid)"
            value={expLocation}
            onChange={(e) => setExpLocation(e.target.value)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Start Date"
              placeholder="e.g. Jan 2023"
              value={expStartDate}
              onChange={(e) => setExpStartDate(e.target.value)}
            />
            <Input
              label="End Date"
              placeholder="e.g. Present"
              disabled={expCurrent}
              value={expCurrent ? "Present" : expEndDate}
              onChange={(e) => setExpEndDate(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="expCurrent"
              checked={expCurrent}
              onChange={(e) => setExpCurrent(e.target.checked)}
              className="w-4 h-4 rounded text-primary"
            />
            <label htmlFor="expCurrent" className="text-xs font-medium text-text-primary">
              I currently work here
            </label>
          </div>
          <Textarea
            label="Responsibilities & Outcomes"
            placeholder="Describe what you built and the impact achieved."
            value={expDescription}
            onChange={(e) => setExpDescription(e.target.value)}
            rows={3}
          />
          <Input
            label="Key Technologies Used (comma separated)"
            placeholder="e.g. React, TypeScript, Next.js"
            value={expSkills}
            onChange={(e) => setExpSkills(e.target.value)}
          />
          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <Button type="button" variant="secondary" size="sm" onClick={() => setIsExpModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Add Position
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL: ADD EDUCATION */}
      <Modal
        isOpen={isEduModalOpen}
        onClose={() => setIsEduModalOpen(false)}
        title="Add Education"
        size="md"
      >
        <form onSubmit={handleAddEducation} className="flex flex-col gap-4">
          <Input
            label="Degree / Qualification"
            placeholder="e.g. Bachelor of Technology (B.Tech)"
            value={eduDegree}
            onChange={(e) => setEduDegree(e.target.value)}
            required
          />
          <Input
            label="Institution / University"
            placeholder="e.g. National Institute of Technology"
            value={eduInstitution}
            onChange={(e) => setEduInstitution(e.target.value)}
            required
          />
          <Input
            label="Field of Study"
            placeholder="e.g. Computer Science and Engineering"
            value={eduField}
            onChange={(e) => setEduField(e.target.value)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Start Year"
              placeholder="e.g. 2022"
              value={eduStartYear}
              onChange={(e) => setEduStartYear(e.target.value)}
            />
            <Input
              label="End Year / Expected"
              placeholder="e.g. 2026"
              value={eduEndYear}
              onChange={(e) => setEduEndYear(e.target.value)}
            />
          </div>
          <Input
            label="Grade / CGPA (Optional)"
            placeholder="e.g. 8.5 CGPA or First Class"
            value={eduGrade}
            onChange={(e) => setEduGrade(e.target.value)}
          />
          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <Button type="button" variant="secondary" size="sm" onClick={() => setIsEduModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Add Education
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL: ADD PROJECT */}
      <Modal
        isOpen={isProjModalOpen}
        onClose={() => setIsProjModalOpen(false)}
        title="Add Project"
        size="md"
      >
        <form onSubmit={handleAddProject} className="flex flex-col gap-4">
          <Input
            label="Project Title"
            placeholder="e.g. Real-Time Chat Platform"
            value={projTitle}
            onChange={(e) => setProjTitle(e.target.value)}
            required
          />
          <Textarea
            label="Project Description"
            placeholder="Explain the purpose of the project, your contribution, and architecture."
            value={projDescription}
            onChange={(e) => setProjDescription(e.target.value)}
            rows={3}
            required
          />
          <Input
            label="Technologies (comma separated)"
            placeholder="e.g. React, WebSockets, Tailwind CSS"
            value={projTech}
            onChange={(e) => setProjTech(e.target.value)}
          />
          <Input
            label="Project URL / GitHub Link (Optional)"
            placeholder="https://github.com/username/project"
            value={projUrl}
            onChange={(e) => setProjUrl(e.target.value)}
          />
          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <Button type="button" variant="secondary" size="sm" onClick={() => setIsProjModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Add Project
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL: ADD SKILL */}
      <Modal
        isOpen={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
        title="Add Technical Skill"
        size="sm"
      >
        <form onSubmit={handleAddSkillSubmit} className="flex flex-col gap-4">
          <Input
            label="Skill Name"
            placeholder="e.g. Docker, GraphQL, Kubernetes"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            required
          />
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-text-primary">Familiarity Level</label>
            <select
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(e.target.value as any)}
              className="h-10 px-3 rounded-xl border border-border bg-surface text-xs text-text-primary"
            >
              <option value="learning">Learning</option>
              <option value="comfortable">Comfortable</option>
              <option value="confident">Confident</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <Button type="button" variant="secondary" size="sm" onClick={() => setIsSkillModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Add Skill
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL: EDIT PREFERENCES */}
      <Modal
        isOpen={isPrefsModalOpen}
        onClose={() => setIsPrefsModalOpen(false)}
        title="Edit Work & Job Preferences"
        size="md"
      >
        <form onSubmit={handleSavePreferences} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-text-primary">Preferred Work Mode</label>
            <select
              value={prefWorkMode}
              onChange={(e) => setPrefWorkMode(e.target.value as any)}
              className="h-10 px-3 rounded-xl border border-border bg-surface text-xs text-text-primary"
            >
              <option value="any">Any work mode</option>
              <option value="remote">Remote only</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-site</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-text-primary">Employment Type</label>
            <select
              value={prefJobType}
              onChange={(e) => setPrefJobType(e.target.value as any)}
              className="h-10 px-3 rounded-xl border border-border bg-surface text-xs text-text-primary"
            >
              <option value="any">Any job type</option>
              <option value="full_time">Full-time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-text-primary">Availability Timeline</label>
            <select
              value={prefAvailability}
              onChange={(e) => setPrefAvailability(e.target.value as any)}
              className="h-10 px-3 rounded-xl border border-border bg-surface text-xs text-text-primary"
            >
              <option value="immediate">Immediate</option>
              <option value="1_month">Within 1 Month</option>
              <option value="3_months">Within 3 Months</option>
              <option value="exploring">Exploring / Casually Open</option>
            </select>
          </div>

          <Input
            label="Minimum Target Salary (INR / year) - Optional"
            placeholder="e.g. 1200000"
            type="number"
            value={prefSalaryINR}
            onChange={(e) => setPrefSalaryINR(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <Button type="button" variant="secondary" size="sm" onClick={() => setIsPrefsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Preferences
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
