import { Box, Button, styled } from "@mui/material";

export const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
}));

export const FormContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}));

export const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  "&:last-child": {
    marginBottom: theme.spacing(4),
  },
}));

export const FormSectionTitle = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  "& h6": {
    marginBottom: theme.spacing(1),
  },
}));

export const FieldDescription = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiTypography-subtitle2": {
    marginBottom: theme.spacing(0.5),
  },
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(2),
  marginTop: theme.spacing(6),
  paddingTop: theme.spacing(4),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  fontSize: "0.875rem",
  fontWeight: 500,
  borderRadius: theme.shape.borderRadius,
  textTransform: "none",
  minWidth: "140px",
}));

export const CancelButton = styled(ActionButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const SubmitButton = styled(ActionButton)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const StyledTextFieldWrapper = styled(Box)(({ theme }) => ({
  "& .MuiFormControl-root": {
    transition: "all 0.2s ease-in-out",
    "& .MuiInputBase-root": {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: `${theme.palette.background.paper}80`,
      backdropFilter: "blur(8px)",
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.text.secondary,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: theme.palette.primary.main,
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },
}));

export const ChipsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

