"use client";

import AppShell from "@/components/layout/AppShell";
import OutputPage from "@/components/assignment/output/OutputPage";

export default function AssignmentOutputPage() {
  return (
    <AppShell headerTitle="Create New" showBack>
      <OutputPage />
    </AppShell>
  );
}
