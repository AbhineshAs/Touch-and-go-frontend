"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Building2,
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  CheckCircle2,
  RotateCcw,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth/AuthContext";
import { useCandidate } from "@/lib/candidate/context/CandidateContext";
import { TagLogo } from "@/components/ui/TagLogo";
import { LoadingState } from "@/components/ui/States";
import { AuthVisualStage } from "@/components/auth/AuthVisualStage";

type AuthMode = "signup" | "login" | "forgot_password";
type AuthRole = "candidate" | "employer";

const COUNTRY_CODES = [
  { code: "+91", label: "India (+91)", flag: "🇮🇳" },
  { code: "+1", label: "USA / Canada (+1)", flag: "🇺🇸" },
  { code: "+44", label: "UK (+44)", flag: "🇬🇧" },
  { code: "+65", label: "Singapore (+65)", flag: "🇸🇬" },
  { code: "+971", label: "UAE (+971)", flag: "🇦🇪" },
  { code: "+49", label: "Germany (+49)", flag: "🇩🇪" },
  { code: "+61", label: "Australia (+61)", flag: "🇦🇺" },
];

const candidateSignUpSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, "Please enter your name")
      .max(100, "Name is too long"),
    email: z.string().trim().email("Please enter a valid email address"),
    countryCode: z.string().min(1, "Please select a country code"),
    phone: z
      .string()
      .trim()
      .min(7, "Phone number must be at least 7 digits")
      .max(15, "Phone number must be at most 15 digits")
      .regex(/^[\d\s-]+$/, "Please enter a valid numeric phone number"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[0-9]/, "Must include at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreeToTerms: z
      .boolean()
      .refine((val) => val === true, "You must agree to the Terms of Service and Privacy Policy"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type CandidateSignUpFormValues = z.infer<typeof candidateSignUpSchema>;

const employerSignUpSchema = z
  .object({
    fullName: z.string().trim().min(2, "Full name must be at least 2 characters"),
    email: z.string().trim().email("Please enter a valid work email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[0-9]/, "Must include at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreeToTerms: z
      .boolean()
      .refine((val) => val === true, "You must agree to the Terms of Service"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type EmployerSignUpFormValues = z.infer<typeof employerSignUpSchema>;

const candidateLoginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(1, "Please enter your password"),
});

type CandidateLoginFormValues = z.infer<typeof candidateLoginSchema>;

const employerLoginSchema = z.object({
  email: z.string().trim().email("Please enter a valid work email address"),
  password: z.string().min(1, "Please enter your password"),
});

type EmployerLoginFormValues = z.infer<typeof employerLoginSchema>;

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="w-4 h-4 fill-[#141413]" viewBox="0 0 170 170">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.7-7.91-12.04-14.49-6.3-9.61-11.22-20.73-14.75-33.36-3.53-12.63-5.29-24.3-5.29-35.01 0-14.7 3.73-26.68 11.19-35.95 7.46-9.27 16.92-14.05 28.38-14.34 5.34 0 11.37 1.48 18.09 4.45 6.72 2.97 10.87 4.51 12.45 4.62 1.39-.11 5.76-1.74 13.11-4.89 7.35-3.15 13.43-4.48 18.25-3.99 13.56 1.09 23.95 6.23 31.17 15.42-11.75 7.18-17.51 17.15-17.29 29.9.22 10.11 4.13 18.57 11.75 25.38 7.61 6.81 16.8 10.66 27.56 11.53-2.39 7.4-5.22 14.58-8.49 21.54zM119.22 33.15c0-7.72 2.72-15.01 8.16-21.87 5.44-6.85 12.18-10.99 20.22-12.4 1.09 7.94-1.3 15.35-7.18 22.24-5.87 6.88-12.94 11.08-21.2 12.03z" />
    </svg>
  );
}

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const rawRole = searchParams.get("role");
  const initialMode: AuthMode = searchParams.get("mode") === "login" ? "login" : "signup";
  const initialRole: AuthRole = rawRole === "employer" ? "employer" : "candidate";

  const { user, isAuthenticated, isLoading, login, signup } = useAuth();
  const { setIdentity, confirmProfile, loginCandidateByEmail } = useCandidate();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (user.role === "candidate") {
        router.replace(redirect || "/candidate/dashboard");
      } else if (user.role === "employer") {
        router.replace(redirect || "/employer/dashboard");
      } else if (user.role === "admin") {
        router.replace(redirect || "/admin/dashboard");
      }
    }
  }, [isLoading, isAuthenticated, user, router, redirect]);

  const [activeTab, setActiveTab] = useState<AuthMode>(initialMode);
  const [selectedRole, setSelectedRole] = useState<AuthRole>(initialRole);
  const [authError, setAuthError] = useState<string | null>(null);

  const [showCandidatePassword, setShowCandidatePassword] = useState(false);
  const [showCandidateConfirmPassword, setShowCandidateConfirmPassword] = useState(false);
  const [showCandidateLoginPassword, setShowCandidateLoginPassword] = useState(false);
  const [showEmployerPassword, setShowEmployerPassword] = useState(false);
  const [showEmployerConfirmPassword, setShowEmployerConfirmPassword] = useState(false);

  // Forgot Password state
  type ForgotPasswordStep = "email" | "otp" | "reset_password" | "success";
  const [forgotStep, setForgotStep] = useState<ForgotPasswordStep>("email");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [forgotNewPassword, setForgotNewPassword] = useState("");
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState("");
  const [showForgotNewPassword, setShowForgotNewPassword] = useState(false);
  const [showForgotConfirmPassword, setShowForgotConfirmPassword] = useState(false);
  const [forgotOtpError, setForgotOtpError] = useState<string | null>(null);
  const [forgotPasswordError, setForgotPasswordError] = useState<string | null>(null);
  const [forgotResendCooldown, setForgotResendCooldown] = useState(30);
  const [isSendingForgotOtp, setIsSendingForgotOtp] = useState(false);
  const [isVerifyingForgotOtp, setIsVerifyingForgotOtp] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const forgotOtpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (forgotResendCooldown <= 0) return;
    const timer = setInterval(() => {
      setForgotResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [forgotResendCooldown]);

  const handleForgotOtpChange = (index: number, val: string) => {
    setForgotOtpError(null);
    const clean = val.replace(/\D/g, "");
    const next = [...forgotOtp];
    next[index] = clean.slice(-1);
    setForgotOtp(next);
    if (clean && index < 5) {
      forgotOtpRefs.current[index + 1]?.focus();
    }
  };

  const handleForgotOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !forgotOtp[index] && index > 0) {
      forgotOtpRefs.current[index - 1]?.focus();
    }
  };

  const handleForgotOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setForgotOtpError(null);
    const pastedData = e.clipboardData.getData("text").trim().replace(/\D/g, "").slice(0, 6);
    if (!pastedData) return;
    const next = [...forgotOtp];
    for (let i = 0; i < pastedData.length; i++) {
      next[i] = pastedData[i];
    }
    setForgotOtp(next);
    const nextIdx = Math.min(pastedData.length, 5);
    forgotOtpRefs.current[nextIdx]?.focus();
  };

  const handleSendForgotOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = forgotEmail.trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAuthError("Please enter a valid email address.");
      return;
    }
    setIsSendingForgotOtp(true);
    setAuthError(null);
    await new Promise((r) => setTimeout(r, 450));
    setIsSendingForgotOtp(false);
    setForgotResendCooldown(30);
    setForgotStep("otp");
  };

  const handleVerifyForgotOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = forgotOtp.join("");
    if (code.length < 6) {
      setForgotOtpError("Please enter all 6 digits of the confirmation code.");
      return;
    }
    setIsVerifyingForgotOtp(true);
    setForgotOtpError(null);
    await new Promise((r) => setTimeout(r, 400));
    setIsVerifyingForgotOtp(false);

    if (!/^\d{6}$/.test(code)) {
      setForgotOtpError("Invalid verification code. Please check the code sent to your email.");
      return;
    }

    setForgotStep("reset_password");
  };

  const handleResendForgotOtp = () => {
    if (forgotResendCooldown > 0) return;
    setForgotOtp(["", "", "", "", "", ""]);
    setForgotOtpError(null);
    setForgotResendCooldown(30);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotPasswordError(null);

    if (forgotNewPassword.length < 8) {
      setForgotPasswordError("Password must be at least 8 characters long.");
      return;
    }
    if (!/[A-Z]/.test(forgotNewPassword)) {
      setForgotPasswordError("Password must include at least one uppercase letter.");
      return;
    }
    if (!/[0-9]/.test(forgotNewPassword)) {
      setForgotPasswordError("Password must include at least one number.");
      return;
    }
    if (forgotNewPassword !== forgotConfirmPassword) {
      setForgotPasswordError("Passwords do not match.");
      return;
    }

    setIsResettingPassword(true);
    await new Promise((r) => setTimeout(r, 500));
    setIsResettingPassword(false);
    setForgotStep("success");
  };

  useEffect(() => {
    const queryMode = searchParams.get("mode");
    if (queryMode === "login" || queryMode === "signup" || queryMode === "forgot_password") {
      setActiveTab(queryMode);
    }
  }, [searchParams]);

  const candidateSignUpForm = useForm<CandidateSignUpFormValues>({
    resolver: zodResolver(candidateSignUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      countryCode: "+91",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const employerSignUpForm = useForm<EmployerSignUpFormValues>({
    resolver: zodResolver(employerSignUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const candidateLoginForm = useForm<CandidateLoginFormValues>({
    resolver: zodResolver(candidateLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const employerLoginForm = useForm<EmployerLoginFormValues>({
    resolver: zodResolver(employerLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleRoleChange = (targetRole: AuthRole) => {
    if (targetRole === selectedRole) return;
    setAuthError(null);
    setSelectedRole(targetRole);
  };

  const switchMode = (mode: AuthMode) => {
    setActiveTab(mode);
    setAuthError(null);
  };

  const onCandidateSignUpSubmit = async (data: CandidateSignUpFormValues) => {
    try {
      setAuthError(null);
      setIdentity({
        fullName: data.fullName,
        email: data.email,
        countryCode: data.countryCode,
        phone: data.phone,
        password: data.password,
        agreeToTerms: data.agreeToTerms,
      });

      await signup({
        name: data.fullName,
        email: data.email,
        role: "candidate",
      });

      confirmProfile();

      router.push(redirect || "/candidate/dashboard");
    } catch (err: any) {
      setAuthError(err.message || "Failed to create candidate account.");
    }
  };

  const onEmployerSignUpSubmit = async (data: EmployerSignUpFormValues) => {
    try {
      setAuthError(null);
      await signup({
        name: data.fullName,
        email: data.email,
        role: "employer",
      });
      router.push(redirect || "/employer/dashboard");
    } catch (err: any) {
      setAuthError(err.message || "Failed to register company account.");
    }
  };

  const onCandidateLoginSubmit = async (data: CandidateLoginFormValues) => {
    try {
      setAuthError(null);
      if (loginCandidateByEmail) {
        loginCandidateByEmail(data.email);
      }
      await login(data.email, "candidate");

      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/candidate/dashboard");
      }
    } catch (err: any) {
      setAuthError(err.message || "Failed to sign in. Please verify your credentials.");
    }
  };

  const onEmployerLoginSubmit = async (data: EmployerLoginFormValues) => {
    try {
      setAuthError(null);
      await login(data.email, "employer");
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/employer/dashboard");
      }
    } catch (err: any) {
      setAuthError(err.message || "Failed to sign in. Please verify your credentials.");
    }
  };

  const handleQuickDemoLogin = async (role: AuthRole) => {
    try {
      setAuthError(null);
      const demoEmail = role === "candidate" ? "candidate@touchandgo.ai" : "recruiter@touchandgo.ai";
      if (role === "candidate" && loginCandidateByEmail) {
        loginCandidateByEmail(demoEmail);
      }
      await login(demoEmail, role);
      if (redirect) {
        router.push(redirect);
      } else {
        router.push(role === "candidate" ? "/candidate/dashboard" : "/employer/dashboard");
      }
    } catch (err: any) {
      setAuthError("Failed to sign in with demo credentials.");
    }
  };

  if (isLoading || (isAuthenticated && user)) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6">
        <LoadingState message="Redirecting to your workspace..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-[#FAF7F2] px-4 py-8 sm:py-12 text-[#141413] font-sans relative overflow-x-hidden">
      {/* Subtle architectural dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="w-full max-w-5xl my-auto relative z-10">
        {/* Split Auth Card Container */}
        <div className="bg-white border border-[#E2DDD3] rounded-3xl sm:rounded-[36px] shadow-[0_24px_64px_rgba(20,20,19,0.06)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          
          {/* Mobile Arch Hero Stage (shown only on mobile/tablet) */}
          <div className="lg:hidden w-full bg-[#FAF7F2] border-b border-[#E8E2D8] pt-6 pb-2 px-4 flex items-center justify-center">
            <div className="w-full max-w-[280px]">
              <AuthVisualStage mode={activeTab} role={selectedRole} compact hideFooter />
            </div>
          </div>

          {/* Left / Form Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              {/* Header: TagLogo + Role Pill Selector */}
              <div className="flex items-center justify-between pb-6 border-b border-[#F4EFEA]">
                <TagLogo height={36} href="/" />

                {activeTab !== "forgot_password" && (
                  <div className="inline-flex items-center p-1 bg-[#FAF7F2] border border-[#E2DDD3] rounded-full text-xs font-bold font-sans">
                    <button
                      type="button"
                      onClick={() => handleRoleChange("candidate")}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer",
                        selectedRole === "candidate"
                          ? "bg-white text-[#141413] shadow-xs font-bold"
                          : "text-[#74726A] hover:text-[#141413]"
                      )}
                    >
                      <User className="w-3.5 h-3.5 text-[#141413]" />
                      <span>Job Seeker</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRoleChange("employer")}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer",
                        selectedRole === "employer"
                          ? "bg-white text-[#141413] shadow-xs font-bold"
                          : "text-[#74726A] hover:text-[#141413]"
                      )}
                    >
                      <Building2 className="w-3.5 h-3.5 text-[#141413]" />
                      <span>Company</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Main Headline */}
              <div className="pt-6 pb-5">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#141413] font-display">
                  {activeTab === "login"
                    ? "Welcome Back!!"
                    : activeTab === "signup"
                      ? selectedRole === "candidate"
                        ? "Create Candidate Account"
                        : "Register Company Account"
                      : forgotStep === "otp"
                        ? "Verify your email"
                        : forgotStep === "reset_password"
                          ? "Create new password"
                          : forgotStep === "success"
                            ? "Password reset complete"
                            : "Reset your password"}
                </h1>
                <p className="text-xs sm:text-sm text-[#74726A] font-sans mt-1">
                  {activeTab === "login"
                    ? selectedRole === "candidate"
                      ? "Sign in to access your AI candidate dashboard and 1-touch matched roles."
                      : "Sign in to manage company hiring pipelines and verified tech talent."
                    : activeTab === "signup"
                      ? selectedRole === "candidate"
                        ? "Join Touch & Go to explore pre-vetted CTCs with instant vector matching."
                        : "Access verified engineering talent with zero recruiter spam."
                      : forgotStep === "otp"
                        ? `Enter the 6-digit verification code sent to ${forgotEmail}`
                        : forgotStep === "reset_password"
                          ? "Enter your new password below"
                          : forgotStep === "success"
                            ? "You can now log in with your updated password"
                            : "Enter your registered email to receive a password reset code"}
                </p>
              </div>

              {/* Error banner */}
              {authError && (
                <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                  {authError}
                </div>
              )}

              {/* MODE 1: LOGIN */}
              {activeTab === "login" && (
                <div className="flex flex-col gap-4">
                  {selectedRole === "candidate" ? (
                    <form onSubmit={candidateLoginForm.handleSubmit(onCandidateLoginSubmit)} className="flex flex-col gap-3.5">
                      {/* Email Pill Input */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#141413]">Email</label>
                        <div className="flex items-center h-12 rounded-full border border-[#E2DDD3] bg-white px-4 hover:border-[#CBD5E1] focus-within:border-[#F6C8B4] focus-within:ring-2 focus-within:ring-[#F6C8B4]/30 transition-all">
                          <Mail className="w-4 h-4 text-[#9A9890] shrink-0 mr-2.5" />
                          <input
                            type="email"
                            placeholder="email@gmail.com"
                            {...candidateLoginForm.register("email")}
                            className="flex-1 h-full text-xs sm:text-sm font-medium text-[#141413] placeholder:text-[#9A9890] outline-none bg-transparent"
                          />
                        </div>
                        {candidateLoginForm.formState.errors.email && (
                          <p className="text-[11px] text-red-600 font-medium ml-3">
                            {candidateLoginForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* Password Pill Input */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#141413]">Password</label>
                        <div className="flex items-center h-12 rounded-full border border-[#E2DDD3] bg-white px-4 hover:border-[#CBD5E1] focus-within:border-[#F6C8B4] focus-within:ring-2 focus-within:ring-[#F6C8B4]/30 transition-all">
                          <Lock className="w-4 h-4 text-[#9A9890] shrink-0 mr-2.5" />
                          <input
                            type={showCandidateLoginPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...candidateLoginForm.register("password")}
                            className="flex-1 h-full text-xs sm:text-sm font-medium text-[#141413] placeholder:text-[#9A9890] outline-none bg-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCandidateLoginPassword(!showCandidateLoginPassword)}
                            className="p-1 text-[#9A9890] hover:text-[#141413] transition-colors cursor-pointer"
                            tabIndex={-1}
                          >
                            {showCandidateLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {candidateLoginForm.formState.errors.password && (
                          <p className="text-[11px] text-red-600 font-medium ml-3">
                            {candidateLoginForm.formState.errors.password.message}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setAuthError(null);
                            setForgotStep("email");
                            const currentEmail = candidateLoginForm.getValues("email");
                            if (currentEmail) setForgotEmail(currentEmail);
                            setActiveTab("forgot_password");
                          }}
                          className="self-end text-xs font-medium text-[#74726A] hover:text-[#141413] transition-colors cursor-pointer mt-0.5"
                        >
                          Forgot Password?
                        </button>
                      </div>

                      {/* Peach Primary CTA */}
                      <button
                        type="submit"
                        disabled={candidateLoginForm.formState.isSubmitting}
                        className="w-full h-12 rounded-full bg-[#F6C8B4] hover:bg-[#EEB69E] active:bg-[#E8A58A] text-[#141413] font-bold text-sm sm:text-base shadow-[0_4px_16px_rgba(246,200,180,0.45)] hover:shadow-[0_6px_20px_rgba(246,200,180,0.65)] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                      >
                        <span>{candidateLoginForm.formState.isSubmitting ? "Signing In..." : "Login"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={employerLoginForm.handleSubmit(onEmployerLoginSubmit)} className="flex flex-col gap-3.5">
                      {/* Company Email Pill Input */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#141413]">Company Work Email</label>
                        <div className="flex items-center h-12 rounded-full border border-[#E2DDD3] bg-white px-4 hover:border-[#CBD5E1] focus-within:border-[#F6C8B4] focus-within:ring-2 focus-within:ring-[#F6C8B4]/30 transition-all">
                          <Mail className="w-4 h-4 text-[#9A9890] shrink-0 mr-2.5" />
                          <input
                            type="email"
                            placeholder="name@company.com"
                            {...employerLoginForm.register("email")}
                            className="flex-1 h-full text-xs sm:text-sm font-medium text-[#141413] placeholder:text-[#9A9890] outline-none bg-transparent"
                          />
                        </div>
                        {employerLoginForm.formState.errors.email && (
                          <p className="text-[11px] text-red-600 font-medium ml-3">
                            {employerLoginForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* Password Pill Input */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#141413]">Password</label>
                        <div className="flex items-center h-12 rounded-full border border-[#E2DDD3] bg-white px-4 hover:border-[#CBD5E1] focus-within:border-[#F6C8B4] focus-within:ring-2 focus-within:ring-[#F6C8B4]/30 transition-all">
                          <Lock className="w-4 h-4 text-[#9A9890] shrink-0 mr-2.5" />
                          <input
                            type={showEmployerPassword ? "text" : "password"}
                            placeholder="Enter company password"
                            {...employerLoginForm.register("password")}
                            className="flex-1 h-full text-xs sm:text-sm font-medium text-[#141413] placeholder:text-[#9A9890] outline-none bg-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => setShowEmployerPassword(!showEmployerPassword)}
                            className="p-1 text-[#9A9890] hover:text-[#141413] transition-colors cursor-pointer"
                            tabIndex={-1}
                          >
                            {showEmployerPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {employerLoginForm.formState.errors.password && (
                          <p className="text-[11px] text-red-600 font-medium ml-3">
                            {employerLoginForm.formState.errors.password.message}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setAuthError(null);
                            setForgotStep("email");
                            const currentEmail = employerLoginForm.getValues("email");
                            if (currentEmail) setForgotEmail(currentEmail);
                            setActiveTab("forgot_password");
                          }}
                          className="self-end text-xs font-medium text-[#74726A] hover:text-[#141413] transition-colors cursor-pointer mt-0.5"
                        >
                          Forgot Password?
                        </button>
                      </div>

                      {/* Peach Primary CTA */}
                      <button
                        type="submit"
                        disabled={employerLoginForm.formState.isSubmitting}
                        className="w-full h-12 rounded-full bg-[#F6C8B4] hover:bg-[#EEB69E] active:bg-[#E8A58A] text-[#141413] font-bold text-sm sm:text-base shadow-[0_4px_16px_rgba(246,200,180,0.45)] hover:shadow-[0_6px_20px_rgba(246,200,180,0.65)] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                      >
                        <span>{employerLoginForm.formState.isSubmitting ? "Signing In..." : "Company Login"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  )}

                  {/* Subtle "- or -" Divider */}
                  <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#E8E2D8]" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-white px-3 text-[#9A9890] font-sans font-medium">- or -</span>
                    </div>
                  </div>

                  {/* Social Logins */}
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin(selectedRole)}
                      className="w-11 h-11 rounded-full border border-[#E2DDD3] bg-white hover:bg-[#FAF7F2] hover:border-[#D0CBC0] shadow-2xs flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                      title="Sign in with Google"
                    >
                      <GoogleIcon />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin(selectedRole)}
                      className="w-11 h-11 rounded-full border border-[#E2DDD3] bg-white hover:bg-[#FAF7F2] hover:border-[#D0CBC0] shadow-2xs flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                      title="Sign in with Apple"
                    >
                      <AppleIcon />
                    </button>
                  </div>
                </div>
              )}

              {/* MODE 2: SIGN UP */}
              {activeTab === "signup" && (
                <div className="flex flex-col gap-4">
                  {selectedRole === "candidate" ? (
                    <form onSubmit={candidateSignUpForm.handleSubmit(onCandidateSignUpSubmit)} className="flex flex-col gap-3.5">
                      {/* Full Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#141413]">Full Name</label>
                        <div className="flex items-center h-12 rounded-full border border-[#E2DDD3] bg-white px-4 hover:border-[#CBD5E1] focus-within:border-[#F6C8B4] focus-within:ring-2 focus-within:ring-[#F6C8B4]/30 transition-all">
                          <User className="w-4 h-4 text-[#9A9890] shrink-0 mr-2.5" />
                          <input
                            placeholder="e.g. Ananya Sharma"
                            {...candidateSignUpForm.register("fullName")}
                            className="flex-1 h-full text-xs sm:text-sm font-medium text-[#141413] placeholder:text-[#9A9890] outline-none bg-transparent"
                          />
                        </div>
                        {candidateSignUpForm.formState.errors.fullName && (
                          <p className="text-[11px] text-red-600 font-medium ml-3">
                            {candidateSignUpForm.formState.errors.fullName.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#141413]">Email Address</label>
                        <div className="flex items-center h-12 rounded-full border border-[#E2DDD3] bg-white px-4 hover:border-[#CBD5E1] focus-within:border-[#F6C8B4] focus-within:ring-2 focus-within:ring-[#F6C8B4]/30 transition-all">
                          <Mail className="w-4 h-4 text-[#9A9890] shrink-0 mr-2.5" />
                          <input
                            type="email"
                            placeholder="you@example.com"
                            {...candidateSignUpForm.register("email")}
                            className="flex-1 h-full text-xs sm:text-sm font-medium text-[#141413] placeholder:text-[#9A9890] outline-none bg-transparent"
                          />
                        </div>
                        {candidateSignUpForm.formState.errors.email && (
                          <p className="text-[11px] text-red-600 font-medium ml-3">
                            {candidateSignUpForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* Phone Number with Country Code */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#141413]">Phone Number</label>
                        <div className="flex items-center h-12 rounded-full border border-[#E2DDD3] bg-white overflow-hidden hover:border-[#CBD5E1] focus-within:border-[#F6C8B4] focus-within:ring-2 focus-within:ring-[#F6C8B4]/30 transition-all">
                          <div className="h-full pl-3 pr-2 flex items-center bg-[#FAF7F2] border-r border-[#E2DDD3]">
                            <select
                              {...candidateSignUpForm.register("countryCode")}
                              className="h-full bg-transparent text-xs font-mono font-bold text-[#141413] outline-none cursor-pointer"
                            >
                              {COUNTRY_CODES.map((c) => (
                                <option key={c.code} value={c.code}>
                                  {c.flag} {c.code}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex-1 flex items-center h-full px-3">
                            <Phone className="w-3.5 h-3.5 text-[#9A9890] shrink-0 mr-2" />
                            <input
                              type="tel"
                              placeholder="98765 43210"
                              {...candidateSignUpForm.register("phone")}
                              className="w-full h-full text-xs sm:text-sm font-medium text-[#141413] placeholder:text-[#9A9890] outline-none bg-transparent"
                            />
                          </div>
                        </div>
                        {candidateSignUpForm.formState.errors.phone && (
                          <p className="text-[11px] text-red-600 font-medium ml-3">
                            {candidateSignUpForm.formState.errors.phone.message}
                          </p>
                        )}
                      </div>

                      {/* Password & Confirm Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-[#141413]">Password</label>
                          <div className="flex items-center h-12 rounded-full border border-[#E2DDD3] bg-white px-3.5 hover:border-[#CBD5E1] focus-within:border-[#F6C8B4] focus-within:ring-2 focus-within:ring-[#F6C8B4]/30 transition-all">
                            <Lock className="w-3.5 h-3.5 text-[#9A9890] shrink-0 mr-2" />
                            <input
                              type={showCandidatePassword ? "text" : "password"}
                              placeholder="••••••••"
                              {...candidateSignUpForm.register("password")}
                              className="flex-1 h-full text-xs sm:text-sm font-medium text-[#141413] placeholder:text-[#9A9890] outline-none bg-transparent"
                            />
                            <button
                              type="button"
                              onClick={() => setShowCandidatePassword(!showCandidatePassword)}
                              className="p-1 text-[#9A9890] hover:text-[#141413] cursor-pointer"
                              tabIndex={-1}
                            >
                              {showCandidatePassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                          {candidateSignUpForm.formState.errors.password && (
                            <p className="text-[11px] text-red-600 font-medium ml-3">
                              {candidateSignUpForm.formState.errors.password.message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-[#141413]">Confirm Password</label>
                          <div className="flex items-center h-12 rounded-full border border-[#E2DDD3] bg-white px-3.5 hover:border-[#CBD5E1] focus-within:border-[#F6C8B4] focus-within:ring-2 focus-within:ring-[#F6C8B4]/30 transition-all">
                            <Lock className="w-3.5 h-3.5 text-[#9A9890] shrink-0 mr-2" />
                            <input
                              type={showCandidateConfirmPassword ? "text" : "password"}
                              placeholder="••••••••"
                              {...candidateSignUpForm.register("confirmPassword")}
                              className="flex-1 h-full text-xs sm:text-sm font-medium text-[#141413] placeholder:text-[#9A9890] outline-none bg-transparent"
                            />
                            <button
                              type="button"
                              onClick={() => setShowCandidateConfirmPassword(!showCandidateConfirmPassword)}
                              className="p-1 text-[#9A9890] hover:text-[#141413] cursor-pointer"
                              tabIndex={-1}
                            >
                              {showCandidateConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                          {candidateSignUpForm.formState.errors.confirmPassword && (
                            <p className="text-[11px] text-red-600 font-medium ml-3">
                              {candidateSignUpForm.formState.errors.confirmPassword.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Terms Checkbox */}
                      <div className="pt-1 flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          id="candidateTerms"
                          {...candidateSignUpForm.register("agreeToTerms")}
                          className="mt-0.5 rounded accent-[#141413] cursor-pointer"
                        />
                        <label htmlFor="candidateTerms" className="text-xs text-[#5A5852] leading-relaxed cursor-pointer select-none">
                          I agree to the{" "}
                          <Link href="/trust" target="_blank" className="text-[#141413] font-bold underline underline-offset-2">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/trust" target="_blank" className="text-[#141413] font-bold underline underline-offset-2">
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                      {candidateSignUpForm.formState.errors.agreeToTerms && (
                        <p className="text-[11px] text-red-600 font-medium ml-3">
                          {candidateSignUpForm.formState.errors.agreeToTerms.message}
                        </p>
                      )}

                      {/* Peach Primary CTA */}
                      <button
                        type="submit"
                        disabled={candidateSignUpForm.formState.isSubmitting}
                        className="w-full h-12 rounded-full bg-[#F6C8B4] hover:bg-[#EEB69E] active:bg-[#E8A58A] text-[#141413] font-bold text-sm sm:text-base shadow-[0_4px_16px_rgba(246,200,180,0.45)] hover:shadow-[0_6px_20px_rgba(246,200,180,0.65)] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                      >
                        <span>Agree &amp; Join</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={employerSignUpForm.handleSubmit(onEmployerSignUpSubmit)} className="flex flex-col gap-3.5">
                      {/* Full Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#141413]">Recruiter / Contact Name</label>
                        <div className="flex items-center h-12 rounded-full border border-[#E2DDD3] bg-white px-4 hover:border-[#CBD5E1] focus-within:border-[#F6C8B4] focus-within:ring-2 focus-within:ring-[#F6C8B4]/30 transition-all">
                          <User className="w-4 h-4 text-[#9A9890] shrink-0 mr-2.5" />
                          <input
                            placeholder="e.g. Vikramaditya Nair"
                            {...employerSignUpForm.register("fullName")}
                            className="flex-1 h-full text-xs sm:text-sm font-medium text-[#141413] placeholder:text-[#9A9890] outline-none bg-transparent"
                          />
                        </div>
                        {employerSignUpForm.formState.errors.fullName && (
                          <p className="text-[11px] text-red-600 font-medium ml-3">
                            {employerSignUpForm.formState.errors.fullName.message}
                          </p>
                        )}
                      </div>

                      {/* Work Email */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#141413]">Company Work Email</label>
                        <div className="flex items-center h-12 rounded-full border border-[#E2DDD3] bg-white px-4 hover:border-[#CBD5E1] focus-within:border-[#F6C8B4] focus-within:ring-2 focus-within:ring-[#F6C8B4]/30 transition-all">
                          <Mail className="w-4 h-4 text-[#9A9890] shrink-0 mr-2.5" />
                          <input
                            type="email"
                            placeholder="name@company.com"
                            {...employerSignUpForm.register("email")}
                            className="flex-1 h-full text-xs sm:text-sm font-medium text-[#141413] placeholder:text-[#9A9890] outline-none bg-transparent"
                          />
                        </div>
                        {employerSignUpForm.formState.errors.email && (
                          <p className="text-[11px] text-red-600 font-medium ml-3">
                            {employerSignUpForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* Password & Confirm Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-[#141413]">Password</label>
                          <div className="flex items-center h-12 rounded-full border border-[#E2DDD3] bg-white px-3.5 hover:border-[#CBD5E1] focus-within:border-[#F6C8B4] focus-within:ring-2 focus-within:ring-[#F6C8B4]/30 transition-all">
                            <Lock className="w-3.5 h-3.5 text-[#9A9890] shrink-0 mr-2" />
                            <input
                              type={showEmployerPassword ? "text" : "password"}
                              placeholder="••••••••"
                              {...employerSignUpForm.register("password")}
                              className="flex-1 h-full text-xs sm:text-sm font-medium text-[#141413] placeholder:text-[#9A9890] outline-none bg-transparent"
                            />
                            <button
                              type="button"
                              onClick={() => setShowEmployerPassword(!showEmployerPassword)}
                              className="p-1 text-[#9A9890] hover:text-[#141413] cursor-pointer"
                              tabIndex={-1}
                            >
                              {showEmployerPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                          {employerSignUpForm.formState.errors.password && (
                            <p className="text-[11px] text-red-600 font-medium ml-3">
                              {employerSignUpForm.formState.errors.password.message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-[#141413]">Confirm Password</label>
                          <div className="flex items-center h-12 rounded-full border border-[#E2DDD3] bg-white px-3.5 hover:border-[#CBD5E1] focus-within:border-[#F6C8B4] focus-within:ring-2 focus-within:ring-[#F6C8B4]/30 transition-all">
                            <Lock className="w-3.5 h-3.5 text-[#9A9890] shrink-0 mr-2" />
                            <input
                              type={showEmployerConfirmPassword ? "text" : "password"}
                              placeholder="••••••••"
                              {...employerSignUpForm.register("confirmPassword")}
                              className="flex-1 h-full text-xs sm:text-sm font-medium text-[#141413] placeholder:text-[#9A9890] outline-none bg-transparent"
                            />
                            <button
                              type="button"
                              onClick={() => setShowEmployerConfirmPassword(!showEmployerConfirmPassword)}
                              className="p-1 text-[#9A9890] hover:text-[#141413] cursor-pointer"
                              tabIndex={-1}
                            >
                              {showEmployerConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                          {employerSignUpForm.formState.errors.confirmPassword && (
                            <p className="text-[11px] text-red-600 font-medium ml-3">
                              {employerSignUpForm.formState.errors.confirmPassword.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Terms Checkbox */}
                      <div className="pt-1 flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          id="employerTerms"
                          {...employerSignUpForm.register("agreeToTerms")}
                          className="mt-0.5 rounded accent-[#141413] cursor-pointer"
                        />
                        <label htmlFor="employerTerms" className="text-xs text-[#5A5852] leading-relaxed cursor-pointer select-none">
                          I agree to the{" "}
                          <Link href="/trust" target="_blank" className="text-[#141413] font-bold underline underline-offset-2">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/trust" target="_blank" className="text-[#141413] font-bold underline underline-offset-2">
                            Responsible Hiring Charter
                          </Link>
                        </label>
                      </div>
                      {employerSignUpForm.formState.errors.agreeToTerms && (
                        <p className="text-[11px] text-red-600 font-medium ml-3">
                          {employerSignUpForm.formState.errors.agreeToTerms.message}
                        </p>
                      )}

                      {/* Peach Primary CTA */}
                      <button
                        type="submit"
                        disabled={employerSignUpForm.formState.isSubmitting}
                        className="w-full h-12 rounded-full bg-[#F6C8B4] hover:bg-[#EEB69E] active:bg-[#E8A58A] text-[#141413] font-bold text-sm sm:text-base shadow-[0_4px_16px_rgba(246,200,180,0.45)] hover:shadow-[0_6px_20px_rgba(246,200,180,0.65)] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                      >
                        <span>Create Company Account</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  )}

                  {/* Subtle "- or -" Divider */}
                  <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#E8E2D8]" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-white px-3 text-[#9A9890] font-sans font-medium">- or -</span>
                    </div>
                  </div>

                  {/* Social Logins */}
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin(selectedRole)}
                      className="w-11 h-11 rounded-full border border-[#E2DDD3] bg-white hover:bg-[#FAF7F2] hover:border-[#D0CBC0] shadow-2xs flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                      title="Sign up with Google"
                    >
                      <GoogleIcon />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin(selectedRole)}
                      className="w-11 h-11 rounded-full border border-[#E2DDD3] bg-white hover:bg-[#FAF7F2] hover:border-[#D0CBC0] shadow-2xs flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                      title="Sign up with Apple"
                    >
                      <AppleIcon />
                    </button>
                  </div>
                </div>
              )}

              {/* MODE 3: FORGOT PASSWORD */}
              {activeTab === "forgot_password" && (
                <div className="flex flex-col gap-4">
                  {/* Top Navigation */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("login");
                        setForgotStep("email");
                        setAuthError(null);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#74726A] hover:text-[#141413] transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Login</span>
                    </button>
                    {forgotStep !== "success" && (
                      <span className="text-[11px] font-mono font-bold text-[#74726A]">
                        Step {forgotStep === "email" ? "1" : forgotStep === "otp" ? "2" : "3"} of 3
                      </span>
                    )}
                  </div>

                  {/* STEP 1: ENTER EMAIL */}
                  {forgotStep === "email" && (
                    <form onSubmit={handleSendForgotOtp} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#141413]">Email Address</label>
                        <div className="flex items-center h-12 rounded-full border border-[#E2DDD3] bg-white px-4 hover:border-[#CBD5E1] focus-within:border-[#F6C8B4] focus-within:ring-2 focus-within:ring-[#F6C8B4]/30 transition-all">
                          <Mail className="w-4 h-4 text-[#9A9890] shrink-0 mr-2.5" />
                          <input
                            type="email"
                            placeholder="name@example.com"
                            value={forgotEmail}
                            onChange={(e) => {
                              setForgotEmail(e.target.value);
                              setAuthError(null);
                            }}
                            required
                            autoFocus
                            className="flex-1 h-full text-xs sm:text-sm font-medium text-[#141413] placeholder:text-[#9A9890] outline-none bg-transparent"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSendingForgotOtp}
                        className="w-full h-12 rounded-full bg-[#F6C8B4] hover:bg-[#EEB69E] active:bg-[#E8A58A] text-[#141413] font-bold text-sm sm:text-base shadow-[0_4px_16px_rgba(246,200,180,0.45)] hover:shadow-[0_6px_20px_rgba(246,200,180,0.65)] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                      >
                        <span>{isSendingForgotOtp ? "Sending Code..." : "Send Verification Code"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  )}

                  {/* STEP 2: ENTER OTP */}
                  {forgotStep === "otp" && (
                    <form onSubmit={handleVerifyForgotOtp} className="flex flex-col gap-4">
                      <div className="flex justify-between gap-1.5 sm:gap-2">
                        {forgotOtp.map((digit, idx) => (
                          <input
                            key={idx}
                            ref={(el) => {
                              forgotOtpRefs.current[idx] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleForgotOtpChange(idx, e.target.value)}
                            onKeyDown={(e) => handleForgotOtpKeyDown(idx, e)}
                            onPaste={idx === 0 ? handleForgotOtpPaste : undefined}
                            aria-label={`Digit ${idx + 1}`}
                            className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold rounded-2xl border border-[#E2DDD3] bg-white text-[#141413] focus:border-[#F6C8B4] focus:outline-none focus:ring-2 focus:ring-[#F6C8B4]/30 transition-all font-mono"
                          />
                        ))}
                      </div>

                      {forgotOtpError && (
                        <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                          {forgotOtpError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isVerifyingForgotOtp}
                        className="w-full h-12 rounded-full bg-[#F6C8B4] hover:bg-[#EEB69E] active:bg-[#E8A58A] text-[#141413] font-bold text-sm sm:text-base shadow-[0_4px_16px_rgba(246,200,180,0.45)] hover:shadow-[0_6px_20px_rgba(246,200,180,0.65)] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                      >
                        <span>{isVerifyingForgotOtp ? "Verifying..." : "Verify Code"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <div className="flex items-center justify-between text-xs pt-3 border-t border-[#E8E2D8]">
                        <button
                          type="button"
                          onClick={() => setForgotStep("email")}
                          className="text-[#74726A] hover:text-[#141413] transition-colors cursor-pointer text-xs font-medium"
                        >
                          Change Email
                        </button>
                        {forgotResendCooldown > 0 ? (
                          <span className="text-[#74726A] text-xs font-mono">Resend in {forgotResendCooldown}s</span>
                        ) : (
                          <button
                            type="button"
                            onClick={handleResendForgotOtp}
                            className="font-bold text-[#141413] hover:text-[#E08A6B] cursor-pointer flex items-center gap-1 text-xs"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Resend Code</span>
                          </button>
                        )}
                      </div>
                    </form>
                  )}

                  {/* STEP 3: CREATE NEW PASSWORD */}
                  {forgotStep === "reset_password" && (
                    <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                      {/* New Password */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#141413]">New Password</label>
                        <div className="flex items-center h-12 rounded-full border border-[#E2DDD3] bg-white px-4 hover:border-[#CBD5E1] focus-within:border-[#F6C8B4] focus-within:ring-2 focus-within:ring-[#F6C8B4]/30 transition-all">
                          <Lock className="w-4 h-4 text-[#9A9890] shrink-0 mr-2.5" />
                          <input
                            type={showForgotNewPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={forgotNewPassword}
                            onChange={(e) => {
                              setForgotNewPassword(e.target.value);
                              setForgotPasswordError(null);
                            }}
                            required
                            className="flex-1 h-full text-xs sm:text-sm font-medium text-[#141413] placeholder:text-[#9A9890] outline-none bg-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => setShowForgotNewPassword(!showForgotNewPassword)}
                            className="p-1 text-[#9A9890] hover:text-[#141413] cursor-pointer"
                            tabIndex={-1}
                          >
                            {showForgotNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm New Password */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#141413]">Confirm New Password</label>
                        <div className="flex items-center h-12 rounded-full border border-[#E2DDD3] bg-white px-4 hover:border-[#CBD5E1] focus-within:border-[#F6C8B4] focus-within:ring-2 focus-within:ring-[#F6C8B4]/30 transition-all">
                          <Lock className="w-4 h-4 text-[#9A9890] shrink-0 mr-2.5" />
                          <input
                            type={showForgotConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={forgotConfirmPassword}
                            onChange={(e) => {
                              setForgotConfirmPassword(e.target.value);
                              setForgotPasswordError(null);
                            }}
                            required
                            className="flex-1 h-full text-xs sm:text-sm font-medium text-[#141413] placeholder:text-[#9A9890] outline-none bg-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => setShowForgotConfirmPassword(!showForgotConfirmPassword)}
                            className="p-1 text-[#9A9890] hover:text-[#141413] cursor-pointer"
                            tabIndex={-1}
                          >
                            {showForgotConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {forgotPasswordError && (
                        <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                          {forgotPasswordError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isResettingPassword}
                        className="w-full h-12 rounded-full bg-[#F6C8B4] hover:bg-[#EEB69E] active:bg-[#E8A58A] text-[#141413] font-bold text-sm sm:text-base shadow-[0_4px_16px_rgba(246,200,180,0.45)] hover:shadow-[0_6px_20px_rgba(246,200,180,0.65)] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                      >
                        <span>{isResettingPassword ? "Saving..." : "Save New Password"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  )}

                  {/* STEP 4: SUCCESS */}
                  {forgotStep === "success" && (
                    <div className="py-4 text-center flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-xs">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-base font-bold text-[#141413] font-display">Password Reset Complete</h3>
                        <p className="text-xs text-[#5A5852] leading-relaxed max-w-xs">
                          Your password has been successfully updated. You can now log in to your account.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (selectedRole === "candidate") {
                            candidateLoginForm.setValue("email", forgotEmail);
                          } else {
                            employerLoginForm.setValue("email", forgotEmail);
                          }
                          setActiveTab("login");
                          setForgotStep("email");
                        }}
                        className="w-full h-12 rounded-full bg-[#F6C8B4] hover:bg-[#EEB69E] active:bg-[#E8A58A] text-[#141413] font-bold text-sm sm:text-base shadow-[0_4px_16px_rgba(246,200,180,0.45)] transition-all cursor-pointer flex items-center justify-center gap-2 mt-3"
                      >
                        <span>Sign In to Account</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Mode Switcher */}
            {activeTab !== "forgot_password" && (
              <div className="pt-6 mt-6 border-t border-[#F4EFEA] text-center text-xs text-[#74726A] font-sans">
                {activeTab === "login" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode("signup")}
                      className="font-bold text-[#E08A6B] hover:text-[#C77457] transition-colors cursor-pointer underline underline-offset-2 ml-1"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => switchMode("login")}
                      className="font-bold text-[#E08A6B] hover:text-[#C77457] transition-colors cursor-pointer underline underline-offset-2 ml-1"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Visual Stage Desktop (Hidden on mobile) */}
          <div className="hidden lg:flex lg:col-span-5 bg-[#FAF7F2] border-l border-[#E8E2D8] items-center justify-center relative p-8">
            <AuthVisualStage mode={activeTab} role={selectedRole} />
          </div>

        </div>

        {/* Page Footer / Sponsors (Outside Card) */}
        <footer className="text-center pt-6 pb-2 space-y-1.5">
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#74726A]">
            Official Platform Sponsors
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-mono font-medium text-[#74726A]">
            <a
              href="https://www.whitetracktech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#141413] transition-colors"
            >
              WhiteTrack Technologies
            </a>
            <span className="text-[#D0CBC0]">•</span>
            <a
              href="https://www.whiteaurax.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#141413] transition-colors"
            >
              WhiteAurax
            </a>
            <span className="text-[#D0CBC0]">•</span>
            <a
              href="https://zynorixglobal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#141413] transition-colors"
            >
              Zynorix Global
            </a>
            <span className="text-[#D0CBC0]">•</span>
            <a
              href="https://www.whitetracktech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#141413] transition-colors"
            >
              Techcy Routes
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <React.Suspense
      fallback={<LoadingState message="Loading authentication..." className="min-h-screen bg-[#FAF7F2]" />}
    >
      <AuthContent />
    </React.Suspense>
  );
}
