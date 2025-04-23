"use client";

import React from 'react';
import { styled } from '@mui/material';

const StyledTableContainer = styled('div')(({ theme }) => ({
  width: '100%',
  overflow: 'auto',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  '&::-webkit-scrollbar': {
    height: '8px',
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.mode === 'light' 
      ? 'rgba(0, 0, 0, 0.2)' 
      : 'rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
  },
}));

interface TableContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const TableContainer: React.FC<TableContainerProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <StyledTableContainer className={`table-container ${className}`}>
      {children}
    </StyledTableContainer>
  );
};

export default TableContainer;
