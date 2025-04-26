import { styled, Box, Avatar, Card, alpha } from "@mui/material";

// Define the interface for the AvatarIcon props
export interface IAvatarIcon {
  background: string;
  isHovered?: boolean;
}

// Create a styled component for the Card
export const QuickDetailsCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  backgroundColor: theme.palette.dashboardCard.background,
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.1)",
  },
}));

// Create a styled component for the Card Content
export const CardContent = styled(Box)(({ theme }) => ({
  alignItems: "flex-start",
  display: "flex",
  flexGrow: 1,
  justifyContent: "space-between",
  padding: theme.spacing(2, 3),
}));

// Create a styled component for the Avatar Icon
export const AvatarIcon = styled(Avatar, {
  shouldForwardProp: (props) =>
    props !== "isNegative" && props !== "background" && props !== "isHovered",
})<IAvatarIcon>(({ background, isHovered = false }) => {
  const bgColor = alpha(background, isHovered ? 0.3 : 0.2);
  return {
    backgroundColor: bgColor,
    color: background,
    height: 48,
    width: 48,
    transform: isHovered ? "scale(1.1)" : "scale(1)",
    transition: "all 0.3s ease-in-out",
  };
});
