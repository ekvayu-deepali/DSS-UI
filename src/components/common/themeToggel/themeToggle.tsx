import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@/context/ThemeContext';
import { ThemeToggleEnum } from './enum';

export const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <Tooltip title={`Switch to ${mode === ThemeToggleEnum.LIGHT ? 'dark' : 'light'} mode`}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
        }}
      >
        {mode === ThemeToggleEnum.LIGHT ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
