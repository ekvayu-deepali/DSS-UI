import { styled } from '@mui/material/styles';
import { FormControl, MenuItem, Box } from '@mui/material';

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: `${theme.palette.background.paper}80`,
    backdropFilter: 'blur(8px)',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiSelect-select': {
    minWidth: '200px',
  }
}));

export const StyledMenuItem = styled(MenuItem)<{ color?: string }>(({ theme, color }) => ({
  color: color,
  '&.Mui-selected': {
    backgroundColor: `${color}15`,
    '&:hover': {
      backgroundColor: `${color}25`,
    },
  },
}));

export const CustomInputContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: '100%'
}));
