import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatSalaryRange(min?: number, max?: number, period: "year" | "month" = "year"): string {
  if (!min && !max) return "Competitive Compensation";
  const p = period === "year" ? "yr" : "mo";

  if (period === "year" && min && max && min >= 100000 && max >= 100000) {
    const minL = min / 100000;
    const maxL = max / 100000;
    const minStr = Number.isInteger(minL) ? `${minL}` : minL.toFixed(1);
    const maxStr = Number.isInteger(maxL) ? `${maxL}` : maxL.toFixed(1);
    return `₹${minStr} – ₹${maxStr} LPA`;
  }
  if (period === "year" && min && min >= 100000) {
    const minL = min / 100000;
    const minStr = Number.isInteger(minL) ? `${minL}` : minL.toFixed(1);
    return `From ₹${minStr} LPA`;
  }
  if (min && max) {
    return `${formatCurrencyINR(min)} – ${formatCurrencyINR(max)} / ${p}`;
  }
  if (min) return `From ${formatCurrencyINR(min)} / ${p}`;
  return `Up to ${formatCurrencyINR(max!)} / ${p}`;
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  } catch {
    return dateString;
  }
}
