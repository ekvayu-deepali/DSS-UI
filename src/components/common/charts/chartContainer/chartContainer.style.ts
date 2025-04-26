"use client";

import { Card, styled, Typography } from '@mui/material';

export const ChartCard = styled(Card, {
  shouldForwardProp: (props) => props !== 'height',
})<{ height?: string | number }>(({ theme, height }) => ({
  height,
  [theme.breakpoints.down('sm')]: {
    minHeight: 'auto',
  },
}));

export const ChartTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const ChartDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
}));
