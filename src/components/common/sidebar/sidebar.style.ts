import { styled } from "@mui/material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

export const SidebarContainer = styled("aside")(({ theme }) => ({
  width: "240px",
  height: "calc(100vh - 64px)",
  position: "fixed",
  top: "64px",
  left: 0,
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  overflowY: "auto",
  overflowX: "hidden",
  transition: "none",
  zIndex: theme.zIndex.drawer,
  "&.icon-only": {
    width: "64px",
  },
}));

export const SidebarContent = styled("div")(({ theme }) => ({
  padding: theme.spacing(2, 0),
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  transition: "none",
  position: "relative",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&.selected": {
    backgroundColor: theme.palette.primary.main + "20", // 20% opacity
    color: theme.palette.primary.main,
    fontWeight: 600,
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: "4px",
      backgroundColor: theme.palette.primary.main,
    },
  },
  ".icon-only &": {
    padding: theme.spacing(1.5, 0),
    justifyContent: "center",
    "&.selected::before": {
      width: "3px",
    },
  },
}));

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: "40px",
  color: theme.palette.text.disabled,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

// Hide expand/collapse arrows in icon-only mode
export const ExpandIconStyle = styled("span")(() => ({
  ".icon-only &": {
    display: "none",
  },
}));

export const StyledListItemText = styled(ListItemText)(() => ({
  ".icon-only &": {
    display: "none",
  },
}));

export const NestedList = styled(List)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  ".icon-only &": {
    display: "none",
  },
}));
