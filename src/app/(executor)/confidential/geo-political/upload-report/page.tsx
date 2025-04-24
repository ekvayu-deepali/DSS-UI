"use client";

import React from "react";

import { PageHeader } from "@/components/common";

import { useUploadReportController } from "./upload-report.controller";

export default function UploadReport() {
  const { getters } = useUploadReportController();
  const { breadcrumbs } = getters;

  return (
    <>
      <PageHeader
        title="Upload Report"
        breadcrumbs={breadcrumbs}
        actions={""}
      />
    </>
  );
}
