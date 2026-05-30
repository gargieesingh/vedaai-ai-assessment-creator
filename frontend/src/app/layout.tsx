import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Plus_Jakarta_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "VedaAI — Intelligent Assignment Generator",
  description:
    "Create, manage, and grade assignments with AI-powered question paper generation for teachers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${plusJakarta.variable} ${bricolage.variable} h-full antialiased`}>
        <body className="h-full" suppressHydrationWarning>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
