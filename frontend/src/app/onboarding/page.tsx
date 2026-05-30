"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Onboarding removed — redirect straight to assignments
export default function OnboardingPage() {
  const router = useRouter();
  useEffect(() => { router.replace("/assignments"); }, [router]);
  return null;
}
