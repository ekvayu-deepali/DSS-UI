import { styled } from "@mui/material/styles";
import { Paper, InputBase, IconButton, Box } from "@mui/material";

export const SearchContainer = styled("div")({
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
});

export const SearchPaper = styled(Paper)({
    display: "flex",
    alignItems: "center",
    width: "300px",
    padding: "2px 4px",
    borderRadius: "4px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
});

export const SearchInputBase = styled(InputBase)({
    flex: 1,
    marginLeft: "8px",
    fontSize: "0.875rem",
});

export const SearchIconButton = styled(IconButton)(({ theme }) => ({
    padding: "8px",
    color: theme.palette.text.secondary,
    "&:hover": {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.action.hover,
    },
}));

export const FilterIconButton = styled(IconButton)(({ theme }) => ({
    padding: "8px",
    color: theme.palette.text.secondary,
    "&:hover": {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.action.hover,
    },
}));

export const FilterPopoverBox = styled(Box)({
    padding: "16px",
    minWidth: "200px",
    maxHeight: "300px",
    overflowY: "auto",
}); 