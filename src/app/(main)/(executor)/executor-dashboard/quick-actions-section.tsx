"use client";

import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const DashboardItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderRadius: theme.shape.borderRadius,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[6],
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
}));

export const QuickActionsSection: React.FC = () => {
  return (
    <Box sx={{ px: 3, width: '100%', mt: 2, mb: 4 }}>
      <SectionTitle variant="h6">
        Quick Actions
      </SectionTitle>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <DashboardItem elevation={1}>
            <Typography variant="h5" color="primary" gutterBottom>
              Approver
            </Typography>
            <Typography variant="body1">
              Manage document approval process
            </Typography>
          </DashboardItem>
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardItem elevation={1}>
            <Typography variant="h5" color="primary" gutterBottom>
              Executor
            </Typography>
            <Typography variant="body1">
              Manage execution of approved documents
            </Typography>
          </DashboardItem>
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardItem elevation={1}>
            <Typography variant="h5" color="primary" gutterBottom>
              Reports
            </Typography>
            <Typography variant="body1">
              View and generate system reports
            </Typography>
          </DashboardItem>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuickActionsSection; 