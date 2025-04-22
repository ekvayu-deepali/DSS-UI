import { styled, TablePagination } from '@mui/material';

export const TablePaginationWrapper = styled(TablePagination)(({ theme }) => ({
  maxWidth: '100%',
  backgroundColor: theme.palette.background.paper,
  width: '100vw',
  overflow: 'none',
  borderTop: `1px solid ${theme.palette.divider}`,
  '.MuiToolbar-root': { overflow: 'auto' },
}));
