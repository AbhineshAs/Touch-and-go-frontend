import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/lib/query/QueryProvider";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { CandidateProvider } from "@/lib/candidate/context/CandidateContext";

const geistSans = { variable: "--font-geist-sans" };
const geistMono = { variable: "--font-geist-mono" };

export const metadata: Metadata = {
  title: "TAG — Touch And Go | AI-Assisted Recruitment Marketplace",
  description:
    "Connecting verified talent with high-growth employers through structured candidate profiles, job discovery, and explainable criteria matching.",
  icons: {
    icon: "/tag-logo.png",
    shortcut: "/tag-logo.png",
    apple: "/tag-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=Space+Grotesk:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-text-primary">
        <QueryProvider>
          <AuthProvider>
            <CandidateProvider>{children}</CandidateProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
