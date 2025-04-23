import { Chip, styled } from '@mui/material';

export const CustomChip = styled(Chip)(({ theme }) => ({
  mx: 0.5,
  my: 0.5,
  height: 'fit-content',
  borderRadius: theme.shape.borderRadius * 2,
  textTransform: 'capitalize',
  fontWeight: theme.typography.fontWeightBold,
  margin: theme.spacing(0.3),
  textAlign: 'center',
  padding: theme.spacing(0.3, 0.5, 0.3),
}));
