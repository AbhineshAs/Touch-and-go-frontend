"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "soft";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "group inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out select-none disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 cursor-pointer active:scale-[0.98]";

    const variants = {
      primary:
        "bg-[#1A2838] hover:bg-[#769FCD] active:bg-[#141F2C] text-white border border-[#1A2838] shadow-[0_1px_2px_rgba(26,40,56,0.1),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_4px_16px_-2px_rgba(118,159,205,0.35)] rounded-xl",
      secondary:
        "bg-white text-[#1A2838] border border-[#B9D7EA] hover:bg-[#D6E6F2]/40 hover:border-[#769FCD] hover:text-[#1A2838] shadow-[0_1px_2px_rgba(26,40,56,0.04)] rounded-xl",
      outline:
        "bg-transparent text-[#1A2838] border border-[#B9D7EA] hover:bg-[#D6E6F2] hover:border-[#769FCD] rounded-xl",
      ghost:
        "bg-transparent text-[#2C3E50] hover:bg-[#D6E6F2]/40 hover:text-[#1A2838] active:bg-[#B9D7EA]/40 rounded-xl",
      danger:
        "bg-gradient-to-b from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)] border border-red-700 rounded-xl",
      soft:
        "bg-[#D6E6F2] text-[#1A2838] hover:bg-[#B9D7EA] border border-[#B9D7EA] rounded-xl",
    };

    const sizes = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5 h-8.5 rounded-lg",
      md: "text-sm px-4.5 py-2.25 gap-2 h-10.5 rounded-xl",
      lg: "text-base px-6 py-3 gap-2.5 h-12 rounded-xl",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
        ) : (
          leftIcon && (
            <span className="shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5">
              {leftIcon}
            </span>
          )
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "soft";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  "aria-label": string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = "ghost",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-xl transition-all duration-200 ease-out select-none disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer active:scale-[0.96]";

    const variants = {
      primary:
        "bg-[#1A2838] hover:bg-[#769FCD] active:bg-[#141F2C] text-white shadow-[0_1px_2px_rgba(26,40,56,0.1),inset_0_1px_0_rgba(255,255,255,0.15)]",
      secondary:
        "bg-white text-[#1A2838] border border-[#B9D7EA] hover:bg-[#D6E6F2]/40 hover:border-[#769FCD] shadow-[0_1px_2px_rgba(26,40,56,0.04)]",
      outline:
        "bg-transparent text-[#1A2838] border border-[#B9D7EA] hover:bg-[#D6E6F2]",
      ghost:
        "bg-transparent text-[#2C3E50] hover:bg-[#D6E6F2]/40 hover:text-[#1A2838]",
      danger:
        "bg-danger-soft text-danger hover:bg-danger hover:text-white",
      soft:
        "bg-blue-50 text-blue-700 hover:bg-blue-100",
    };

    const sizes = {
      sm: "w-8.5 h-8.5",
      md: "w-10 h-10",
      lg: "w-11.5 h-11.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-current" /> : children}
      </button>
    );
  }
);
IconButton.displayName = "IconButton";
