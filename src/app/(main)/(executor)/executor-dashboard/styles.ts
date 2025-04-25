"use client";

import { Box, styled } from "@mui/material";

export const DashboardContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  width: '100%',
  maxWidth: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
}));

export const StatsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
  width: '100%',
}));

export const StatsGrid = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  gap: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(4),
  },
}));

export const StatCardWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  flexGrow: 1,
  [theme.breakpoints.up('sm')]: {
    width: 'calc(50% - ' + theme.spacing(2) + ')',
  },
  [theme.breakpoints.up('md')]: {
    width: 'calc(50% - ' + theme.spacing(2) + ')',
  },
  [theme.breakpoints.up('lg')]: {
    width: 'calc(25% - ' + theme.spacing(3) + ')',
  },
}));
