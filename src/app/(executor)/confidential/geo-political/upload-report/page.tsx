"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Paper, Typography, Input, Stack } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { PageHeader } from "@/components/common";

export default function UploadReport() {
  return (
    <>
      <PageHeader title="Upload Report" actions={""} />
    </>
  );
}
