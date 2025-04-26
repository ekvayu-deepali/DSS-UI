import { styled, Box, Avatar, Card, alpha } from "@mui/material";

export const QuickDetailsCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  backgroundColor: theme.palette.dashboardCard.background,
}));

export const CardContent = styled(Box)(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  flexGrow: 1,
  justifyContent: "space-between",
  padding: theme.spacing(2, 3),
}));

export interface IAvatarIcon {
  background: string;
}

export const AvatarIcon = styled(Avatar, {
  shouldForwardProp: (props) =>
    props !== "isNegative" && props !== "background",
})<IAvatarIcon>(({ background }) => {
  const bgColor = alpha(background, 0.2);
  return {
    backgroundColor: bgColor,
    color: background,
    height: 36,
    width: 36,
  };
});
