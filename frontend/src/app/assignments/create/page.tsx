"use client";

import AppShell from "@/shared/components/layout/AppShell";
import CreateAssignmentForm from "@/features/assignments/components/CreateAssignmentForm";

export default function CreateAssignmentPage() {
  return (
    <AppShell headerTitle="Assignment" showBack showTitleIcon={false}>
      <CreateAssignmentForm />
    </AppShell>
  );
}
