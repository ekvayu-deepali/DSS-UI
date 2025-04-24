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
}));

export default function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <DashboardItem elevation={3}>
            <Typography variant="h5" color="primary" gutterBottom>
              Approver
            </Typography>
            <Typography variant="body1">
              Manage document approval process
            </Typography>
          </DashboardItem>
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardItem elevation={3}>
            <Typography variant="h5" color="primary" gutterBottom>
              Executor
            </Typography>
            <Typography variant="body1">
              Manage execution of approved documents
            </Typography>
          </DashboardItem>
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardItem elevation={3}>
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
}
