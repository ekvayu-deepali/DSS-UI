"use client";

import React from "react";

import { CardComponent } from "@/components/common/card";
import { PageHeader } from "@/components/common";

import { useUploadReportController } from "./upload-report.controller";
import { Box } from "@mui/material";

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
      <CardComponent title="Upload Report Form">
        <Box>helo</Box>
      </CardComponent>
    </>
  );
}
