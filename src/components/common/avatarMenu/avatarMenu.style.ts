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

export const UserPrefix = styled(Avatar)(({ theme }) => ({
  width: "24px",
  height: "24px",
}));

