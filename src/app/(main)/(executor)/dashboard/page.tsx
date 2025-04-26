"use client";

import React, { useMemo } from "react";
import { Grid } from "@mui/material";
import {
  faUsers,
  faFileAlt,
  faChartLine,
  faExchangeAlt
} from "@fortawesome/free-solid-svg-icons";

import { PageHeader, Spacing, SpacingEnum } from "@/components/common";
import QuickDetails from "@/components/pages/dashboard/quickDetail";

export default function Dashboard() {
  // Dashboard metrics data
  const dashboardMetrics = useMemo(() => [
    {
      title: "Total Users",
      count: 12458,
      percentage: 12.5,
      icon: faUsers,
      backgroundColor: "#1976d2" // Blue
    },
    {
      title: "Documents",
      count: 3254,
      percentage: 8.7,
      icon: faFileAlt,
      backgroundColor: "#4caf50" // Green
    },
    {
      title: "Interactions",
      count: 45678,
      percentage: -3.2,
      icon: faExchangeAlt,
      backgroundColor: "#f44336" // Red
    },
    {
      title: "Growth Rate",
      count: 23,
      percentage: 15.8,
      icon: faChartLine,
      backgroundColor: "#ff9800" // Orange
    }
  ], []);

  return (
    <>
      <PageHeader title="Dashboard" actions={""} />
      <Spacing spacing={1.5} variant={SpacingEnum.BOTTOM} />

      <Grid container spacing={3}>
        {dashboardMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <QuickDetails
              title={metric.title}
              count={metric.count}
              percentage={metric.percentage}
              icon={metric.icon}
              backgroundColor={metric.backgroundColor}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
