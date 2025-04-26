"use client";

import React, { useMemo } from "react";

import { PageHeader } from "@/components";

export default function Dashboard() {
  const header = useMemo(
    () => <PageHeader title="Dashboard" actions={""} />,
    []
  );

  return <>{header}</>;
}
