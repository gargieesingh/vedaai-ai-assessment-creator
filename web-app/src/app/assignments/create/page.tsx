"use client";

import AppShell from "@/components/layout/AppShell";
import CreateAssignmentForm from "@/components/assignment/CreateAssignmentForm";

export default function CreateAssignmentPage() {
  return (
    <AppShell headerTitle="Assignment" showBack>
      <CreateAssignmentForm />
    </AppShell>
  );
}
