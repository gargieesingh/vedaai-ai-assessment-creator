"use client";

import AppShell from "@/shared/components/layout/AppShell";
import OutputPage from "@/features/assignments/components/output/OutputPage";

export default function AssignmentOutputPage() {
  return (
    <AppShell headerTitle="Create New" showBack>
      <OutputPage />
    </AppShell>
  );
}
