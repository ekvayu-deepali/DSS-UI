import {
  Box,
  styled,
  TableContainer as MuiTableContainer,
} from '@mui/material';

export const TableWrapper = styled(Box)(({ theme }) => ({
  overflow: 'auto',
  thead: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    th: {
      color: 'inherit',
      [theme.breakpoints.down('md')]: {
        whiteSpace: 'nowrap',
      },
    },
  },
  tbody: {
    td: {
      [theme.breakpoints.down('md')]: {
        whiteSpace: 'nowrap',
      },
      a: {
        color: theme.palette.primary.dark,
        textDecoration: 'none',
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
  },
}));

export const TableContainer = styled(MuiTableContainer, {
  shouldForwardProp: (props) => props !== 'newHeight',
})<{ newHeight: number }>(({ newHeight, theme }) => ({
  overflow: 'auto',
  width: '100%',
  maxHeight: newHeight ? `calc(100vh - ${newHeight}px)` : 'calc(100vh - 245px)',
  backgroundColor: theme.palette.background.paper,
}));
