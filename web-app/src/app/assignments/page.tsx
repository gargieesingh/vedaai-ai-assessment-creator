"use client";

import AppShell from "@/components/layout/AppShell";
import AssignmentList from "@/components/assignment/AssignmentList";

export default function AssignmentsPage() {
  return (
    <AppShell headerTitle="Assignment" showBack={false}>
      <AssignmentList />
    </AppShell>
  );
}
