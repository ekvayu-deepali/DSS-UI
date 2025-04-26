import { styled } from "@mui/material/styles";
import {
  Box,
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardHeader as MuiCardHeader,
  CardActions,
  Typography,
  Link as MuiLink,
} from "@mui/material";

// Main container
export const DashboardContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(4),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "2fr 1fr",
  },
}));

// Card components
export const Card = styled(MuiCard)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const CardHeader = styled(MuiCardHeader)(({ theme }) => ({
  padding: theme.spacing(3),
}));

export const CardContent = styled(MuiCardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  paddingTop: 0,
  flexGrow: 1,
}));

export const CardFooter = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderTop: `1px solid ${theme.palette.divider}`,
  justifyContent: "flex-start",
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const CardDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
}));

// Processing queue item
export const QueueItemContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "isCompleted" && prop !== "isProcessing",
})<{ isCompleted?: boolean; isProcessing?: boolean }>(
  ({ theme, isCompleted, isProcessing }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
    transition: theme.transitions.create(["background-color"]),
    "&:hover": {
      backgroundColor: theme.palette.action.selected,
    },
    marginBottom: theme.spacing(2),
    "&:last-child": {
      marginBottom: 0,
    },
  })
);

export const QueueItemContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
}));

export const IconContainer = styled(Box)(({ theme }) => ({
  height: 40,
  width: 40,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const ItemDetails = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

export const ItemName = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: 500,
}));

export const StatusContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.75),
  marginTop: 2,
}));

export const StatusText = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  color: theme.palette.text.secondary,
}));

export const ItemActions = styled(Box)(({ theme }) => ({
  textAlign: "right",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
}));

export const TimeText = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  color: theme.palette.text.secondary,
}));

export const ActionButton = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(0.5),
  transition: theme.transitions.create(["background-color"]),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

// Recent searches
export const SearchItemContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.action.hover,
  transition: theme.transitions.create(['background-color']),
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
  marginBottom: theme.spacing(2),
  '&:last-child': {
    marginBottom: 0,
  },
}));

export const SearchQueryContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
}));

export const SearchQuery = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 500,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const SearchTime = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
}));

// Footer link
export const FooterLink = styled(MuiLink)(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.primary.main,
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  "&:hover": {
    textDecoration: "underline",
  },
  "& svg": {
    marginLeft: theme.spacing(0.5),
  },
}));
