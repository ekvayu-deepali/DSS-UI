'use client';

import React from 'react';
import ConfidentialForm from '@/components/ConfidentialForm';
import { Box, Typography, Container } from '@mui/material';

export default function ConfidentialFormPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Confidential Information Submission
        </Typography>
        <ConfidentialForm />
      </Box>
    </Container>
  );
} 