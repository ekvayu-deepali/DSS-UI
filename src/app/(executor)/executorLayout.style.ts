"use client";

import { styled } from '@mui/material';

export const LayoutContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

export const MainContent = styled('main')(({ theme }) => ({
  flexGrow: 1,
  marginLeft: '240px',
  marginTop: '64px',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  transition: 'margin-left 0.3s ease',
  overflow: 'hidden',
  '&.sidebar-icon-only': {
    marginLeft: '64px',
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    width: '100%',
    '&.sidebar-icon-only': {
      marginLeft: 0,
    },
  },
  '& .content-wrapper': {
    height: '100%',
    overflow: 'auto',
    '& .table-container': {
      overflow: 'auto',
      maxWidth: '100%',
    },
  },
}));