"use client";

import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { styles } from "./styles";

interface StatCardProps {
  name: string;
  value: string;
  icon: React.ReactNode;
  change: string;
}

const StatCard: React.FC<StatCardProps> = ({ name, value, icon, change }) => {
  return (
    <Card sx={styles.card}>
      <CardContent sx={styles.cardContent}>
        <Box sx={styles.headerContainer}>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={styles.name}>
              {name}
            </Typography>
            <Typography variant="h4" sx={styles.value}>
              {value}
            </Typography>
          </Box>
          <Box sx={styles.iconContainer}>
            {icon}
          </Box>
        </Box>
        <Box sx={styles.footerContainer}>
          <Typography variant="body2" color="success.main" sx={styles.change}>
            {change}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={styles.period}>
            from last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
