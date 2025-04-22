import { FormControl as MuiFormControl, styled } from '@mui/material';

export const FormControl = styled(MuiFormControl)(({ theme }) => ({
  minWidth: '200px',
  [theme.breakpoints.down('md')]: {
    minWidth: '150px',
  },
  '.MuiOutlinedInput-input': {
    padding: theme.spacing(1.25, 1.75),
  },
}));
