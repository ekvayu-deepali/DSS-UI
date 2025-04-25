"use client";

import { styled } from "@mui/material";
import { Typography, Box } from "@mui/material";

export const HeaderContainer = styled("header")(({ theme }) => ({
  position: "fixed",
  top: 0,
  right: 0,
  left: 0,
  height: "64px",
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  zIndex: theme.zIndex.appBar,
  width: "100%",
  overflow: "hidden",
}));

export const HeaderContent = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100%",
  padding: theme.spacing(0, 2),
}));

export const HeaderActions = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const AppTitle = styled(Typography)(({ theme }) => ({
  //color: theme.palette.primary.main,
  fontWeight: 700,
  fontSize: "1.25rem",
  letterSpacing: "0.5px",
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

// User profile related styled components
export const UserInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const UserName = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const UserRole = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.75rem",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
