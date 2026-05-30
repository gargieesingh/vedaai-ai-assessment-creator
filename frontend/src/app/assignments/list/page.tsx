"use client";

import AppShell from "@/shared/components/layout/AppShell";
import AssignmentList from "@/features/assignments/components/AssignmentList";

export default function AssignmentListPage() {
  return (
    <AppShell headerTitle="Assignment" disableBack={true}>
      <AssignmentList />
    </AppShell>
  );
}
