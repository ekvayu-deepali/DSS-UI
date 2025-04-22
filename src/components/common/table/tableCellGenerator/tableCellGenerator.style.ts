import { Box, styled } from '@mui/material';

import { Icon } from '../../icon/icon';

export const TableImage = styled(Box)({
  height: '35px',
  width: '35px',
  position: 'relative',
  img: {
    borderRadius: '100px',
  },
});

export const CalenderIcon = styled(Icon)(({ theme }) => ({
  marginRight: theme.spacing(1),
  pointerEvents: 'none',
  color: 'default',
}));

export const TableTextBox = styled(Box)({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});

export const DateCellWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'start',
});
