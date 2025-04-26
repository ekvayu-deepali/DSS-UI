"use client";

import React, { useMemo } from "react";
import { Grid, Box, CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";
import {
  faUsers,
  faFileAlt,
  faChartLine,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";

import {
  PageHeader,
  Spacing,
  SpacingEnum,
  ProcessingDashboard,
} from "@/components/common";
import QuickDetails from "@/components/pages/dashboard/quickDetail";

// Dynamically import chart components with SSR disabled
const Top5Journerys = dynamic(
  () => import("@/components/pages/dashboard/charts/top5Journey/top5Journey"),
  { ssr: false, loading: () => <ChartLoader height={400} /> }
);

const TotalMessage = dynamic(
  () => import("@/components/pages/dashboard/charts/totalMessage/totalMessage"),
  { ssr: false, loading: () => <ChartLoader height={300} /> }
);

const JourneyOverview = dynamic(
  () => import("@/components/pages/dashboard/charts/journeyOverview/journeyOverview"),
  { ssr: false, loading: () => <ChartLoader height={435} /> }
);

// Loading component for charts
const ChartLoader = ({ height }: { height: number }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: height,
      bgcolor: 'background.paper',
      borderRadius: 1,
      boxShadow: 1
    }}
  >
    <CircularProgress />
  </Box>
);

export default function Dashboard() {
  // Dashboard metrics data
  const dashboardMetrics = useMemo(
    () => [
      {
        title: "Total Users",
        count: 12458,
        percentage: 12.5,
        icon: faUsers,
        backgroundColor: "#1976d2", // Blue
      },
      {
        title: "Documents",
        count: 3254,
        percentage: 8.7,
        icon: faFileAlt,
        backgroundColor: "#4caf50", // Green
      },
      {
        title: "Interactions",
        count: 45678,
        percentage: -3.2,
        icon: faExchangeAlt,
        backgroundColor: "#f44336", // Red
      },
      {
        title: "Growth Rate",
        count: 23,
        percentage: 15.8,
        icon: faChartLine,
        backgroundColor: "#ff9800", // Orange
      },
    ],
    []
  );

  // Sample processing queue data
  const processingQueue = useMemo(
    () => [
      {
        id: "1",
        name: "Annual Report 2023.pdf",
        status: "completed" as const,
        time: "2 hours ago",
      },
      {
        id: "2",
        name: "Financial Statement Q2.docx",
        status: "processing" as const,
        time: "15 minutes ago",
      },
      {
        id: "3",
        name: "Project Proposal.pdf",
        status: "failed" as const,
        time: "1 day ago",
      },
      {
        id: "4",
        name: "Meeting Minutes.docx",
        status: "completed" as const,
        time: "3 days ago",
      },
    ],
    []
  );

  // Sample recent searches data
  const recentSearches = useMemo(
    () => [
      {
        id: "1",
        query: "financial report 2023",
        time: "1 hour ago",
      },
      {
        id: "2",
        query: "project timeline",
        time: "3 hours ago",
      },
      {
        id: "3",
        query: "budget allocation",
        time: "2 days ago",
      },
    ],
    []
  );

  // Handler for processing item click
  const handleProcessingItemClick = (id: string) => {
    console.log(`Processing item clicked: ${id}`);
    // In a real application, you might navigate to a details page or open a modal
  };

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back, Administrator"
        actions={""}
      />
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

      <Spacing spacing={4} variant={SpacingEnum.VERTICAL} />

      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* Top 5 Journeys Chart - Takes 2/3 width on large screens */}
        <Grid item xs={12} lg={8}>
          <Top5Journerys />
        </Grid>

        {/* Journey Overview Chart - Takes 1/3 width on large screens */}
        <Grid item xs={12} lg={4}>
          <JourneyOverview />
        </Grid>

        {/* Total Messages Chart - Takes full width */}
        <Grid item xs={12}>
          <TotalMessage />
        </Grid>
      </Grid>

      <Spacing spacing={4} variant={SpacingEnum.VERTICAL} />

      {/* Processing Dashboard */}
      <ProcessingDashboard
        processingQueue={processingQueue}
        recentSearches={recentSearches}
        onProcessingItemClick={handleProcessingItemClick}
      />
    </>
  );
}
