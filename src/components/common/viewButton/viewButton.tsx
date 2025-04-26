import React from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface ViewButtonProps {
  onClick: () => void;
}

export const ViewButton: React.FC<ViewButtonProps> = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      size="small"
      color="primary"
      aria-label="view"
    >
      <VisibilityIcon />
    </IconButton>
  );
};