"use client";

import { styled } from '@mui/material';

export const LayoutContainer = styled('div')({
  display: 'flex',
  minHeight: '100vh',
});

export const MainContent = styled('main')(({ theme }) => ({
  flexGrow: 1,
  marginLeft: '240px',
  marginTop: '64px',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  transition: 'margin-left 0.3s ease',
  '&.sidebar-icon-only': {
    marginLeft: '64px',
  },
}));