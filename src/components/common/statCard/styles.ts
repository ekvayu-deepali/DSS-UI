"use client";

import {
  Box,
  Card,
  CardContent as MuiCardContent,
  Typography,
  styled
} from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  transition: "all 0.3s ease",
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: theme.shape.borderRadius * 2,
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  "&:hover": {
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    transform: "translateY(-4px)",
  },
}));

export const CardContent = styled(MuiCardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  "&:last-child": {
    paddingBottom: theme.spacing(3),
  },
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "100%",
  marginBottom: theme.spacing(1),
}));

export const StatName = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  marginBottom: theme.spacing(0.5),
  fontSize: "0.875rem",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  color: theme.palette.text.secondary,
  opacity: 0.8,
}));

export const StatValue = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.75rem",
  lineHeight: 1.2,
  color: theme.palette.text.primary,
  [theme.breakpoints.up('sm')]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.up('md')]: {
    fontSize: "2.125rem",
  },
}));

export const IconContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color'
})<{ color?: string }>(({ theme, color }) => {
  const isDark = theme.palette.mode === 'dark';

  // Create a shadow color based on the icon color or use default
  const shadowColor = color
    ? `${color}60` // Add 60 hex for 37.5% opacity
    : isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';

  // Create a background color based on the icon color
  const bgColor = color
    ? `${color}15` // Add 15 hex for ~8% opacity
    : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)';

  // Create a border color based on the icon color
  const borderColor = color
    ? `${color}30` // Add 30 hex for ~18% opacity
    : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';

  return {
    height: 60,
    width: 60,
    borderRadius: theme.shape.borderRadius * 2,
    background: `linear-gradient(135deg, ${bgColor} 0%, ${color ? `${color}25` : bgColor} 100%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: `0 8px 20px ${shadowColor}`,
    border: `1px solid ${borderColor}`,
    position: "relative",
    overflow: "hidden",
    transition: theme.transitions.create(['box-shadow', 'transform', 'background'], {
      duration: theme.transitions.duration.standard,
    }),
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `radial-gradient(circle at center, ${color || (isDark ? '#fff' : '#000')}20 0%, transparent 70%)`,
      opacity: 0.6,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      right: '-50%',
      bottom: '-50%',
      background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)',
      transform: 'rotate(25deg)',
      animation: 'shimmer 3s infinite linear',
      zIndex: 1,
    },
    '& > *': { // Target the icon itself
      position: 'relative',
      zIndex: 2,
      filter: `drop-shadow(0 3px 5px ${shadowColor})`,
    },
    '&:hover': {
      boxShadow: `0 15px 30px ${shadowColor}`,
      transform: 'translateY(-5px) scale(1.05)',
      background: `linear-gradient(135deg, ${color ? `${color}20` : bgColor} 0%, ${color ? `${color}30` : bgColor} 100%)`,
    },
    '@keyframes shimmer': {
      '0%': {
        transform: 'translateX(-100%) rotate(25deg)',
      },
      '100%': {
        transform: 'translateX(100%) rotate(25deg)',
      }
    }
  };
});

export const FooterContainer = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';

  return {
    marginTop: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(2.5),
    position: "relative",
    borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}`,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '25%',
      height: 1,
      background: `linear-gradient(to right, ${theme.palette.primary.main}, transparent)`,
    }
  };
});

export const ChangeText = styled(Typography)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';

  return {
    fontWeight: 700,
    fontSize: "0.8rem",
    color: theme.palette.success.main,
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius,
    background: isDark
      ? 'rgba(34, 197, 94, 0.15)'
      : 'rgba(34, 197, 94, 0.1)',
    display: 'inline-flex',
    alignItems: 'center',
    '&::before': {
      content: '""',
      display: 'inline-block',
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: theme.palette.success.main,
      marginRight: theme.spacing(0.75),
    }
  };
});

export const PeriodText = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontSize: "0.75rem",
  fontWeight: 500,
  color: theme.palette.text.secondary,
  opacity: 0.8,
}));
