import { styled } from '@mui/material';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

export const SidebarContainer = styled('aside')(({ theme }) => ({
  width: '240px',
  height: '100vh',
  position: 'fixed',
  top: '64px',
  left: 0,
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  overflowY: 'auto',
  overflowX: 'hidden',
  transition: 'width 0.3s ease',
  zIndex: theme.zIndex.drawer,
  '&.icon-only': {
    width: '64px',
  },
}));

export const SidebarContent = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 0),
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '.icon-only &': {
    padding: theme.spacing(1.5, 0),
    justifyContent: 'center',
  },
}));

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: '40px',
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': {
    fontSize: '1.25rem',
  },
  '.icon-only &': {
    minWidth: '100%',
    margin: 0,
    '& svg': {
      fontSize: '1.5rem',
    },
  },
}));

// Hide expand/collapse arrows in icon-only mode
export const ExpandIconStyle = styled('span')(() => ({
  '.icon-only &': {
    display: 'none',
  },
}));

export const StyledListItemText = styled(ListItemText)(() => ({
  '.icon-only &': {
    display: 'none',
  },
}));

export const NestedList = styled(List)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  '.icon-only &': {
    display: 'none',
  },
}));