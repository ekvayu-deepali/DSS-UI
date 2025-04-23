"use client";

import { styled } from '@mui/material';
import { Typography } from '@mui/material';

export const HeaderContainer = styled('header')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  left: 0,
  height: '64px',
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  zIndex: theme.zIndex.appBar,
}));

export const HeaderContent = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
  padding: theme.spacing(0, 2),
}));

export const HeaderActions = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const HeaderTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
}));