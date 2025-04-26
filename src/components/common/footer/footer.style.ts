"use client";

import { styled } from "@mui/material";

export const FooterContainer = styled("footer")(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  right: 0,
  left: 0,
  height: "40px",
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  borderTop: `1px solid ${theme.palette.divider}`,
  zIndex: theme.zIndex.appBar,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const FooterContent = styled("p")(({ theme }) => ({
  margin: 0,
  letterSpacing: "0.1em",
  fontSize: "0.875rem",
}));
