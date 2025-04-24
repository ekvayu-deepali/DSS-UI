'use client';

import { Box, styled, Typography } from '@mui/material';

export const BaseBreadcrumbCard = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const BreadcrumbText = styled(Typography, {
  shouldForwardProp: (props) => props !== 'clickable',
})<{ clickable?: boolean }>(({ theme, clickable = false }) => ({
  cursor: clickable ? 'pointer' : 'default',
  color: clickable ? theme.palette.primary.main : theme.palette.text.primary,
}));
