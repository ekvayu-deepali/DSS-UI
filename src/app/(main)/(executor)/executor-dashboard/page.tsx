"use client";

import React, { useMemo } from "react";

import { PageHeader } from "@/components";

export default function Dashboard() {
  const header = useMemo(
    () => (
      <div>
        <PageHeader title="Dashboard" actions={""} />
      </div>
    ),
    []
  );

  return <>{header}</>;
}
