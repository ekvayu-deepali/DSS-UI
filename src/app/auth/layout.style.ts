import { styled, keyframes } from "@mui/material/styles";
import { Box, Card, Typography } from "@mui/material";

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const AuthContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: theme.spacing(2),
}));

export const AuthCard = styled(Card)(({ theme }) => ({
  maxWidth: "450px",
  width: "100%",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  animation: `${fadeInScale} 0.3s ease-out`,
}));

export const AuthTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  textAlign: "center",
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));
