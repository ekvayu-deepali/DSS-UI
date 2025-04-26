import { Avatar, Box, ListItemAvatar, styled, Typography } from "@mui/material";

export const ActionWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignContent: "center",
  alignItems: "center",
  svg: {
    width: theme.spacing(1.625),
    height: "13px",
  },
}));

export const NamePointer = styled(Box)({
  cursor: "pointer",
});
export const ListAvatar = styled(ListItemAvatar)(({ theme }) => ({
  minWidth: theme.spacing(5),
}));

export const UserPrefix = styled(Avatar)(() => ({
  width: "24px",
  height: "24px",
  fontSize: "0.75rem", // Smaller font size for the avatar letter
  fontWeight: 500,
}));

