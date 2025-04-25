import { Box, Button, Chip, styled } from "@mui/material";

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

export const AddNewChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.primary.main}`,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiChip-label': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
  },
}));

export const AddChipDialog = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

export const FileUploadContainer = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  cursor: 'pointer',
  transition: 'border-color 0.2s ease-in-out',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));

export const FilePreviewContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const FilePreviewItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const DateAndFileSection = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

