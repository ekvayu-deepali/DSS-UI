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
  marginTop: theme.spacing(4),
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  fontSize: "0.875rem",
  fontWeight: 500,
  borderRadius: theme.shape.borderRadius,
  textTransform: "none",
  minWidth: "140px",
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
