import { ThemeOptions } from '@mui/material';

// Extend the palette to include custom properties
declare module '@mui/material/styles' {
  interface Palette {
    border: {
      main: string;
      light: string;
    };
    active: string;
    clickableCard: {
      main: string;
      disabled: string;
    };
    dashboardCard: {
      background: string;
      textMain: string;
      textSecondary: string;
      line: string;
    };
    neutral: {
      [key: number]: string;
    };
  }

  interface PaletteOptions {
    border?: {
      main: string;
      light: string;
    };
    active?: string;
    clickableCard?: {
      main: string;
      disabled: string;
    };
    dashboardCard?: {
      background: string;
      textMain: string;
      textSecondary: string;
      line: string;
    };
    neutral?: {
      [key: number]: string;
    };
  }

  interface ThemeOptions {
    navigationBar?: {
      text: string;
      width: number;
      background: string;
      hover: {
        background: string;
      };
      active: {
        color: string;
        background: string;
      };
      scrollbar: {
        shadow: string;
        thumb: {
          color: string;
          outline: string;
        };
      };
    };
    loader?: {
      primary: string;
      secondary: string;
    };
  }
}

// Colors
const neutral = {
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827',
};

const background = {
  default: '#F9FAFC',
  paper: '#FFFFFF',
};

const divider = '#E6E8F0';

const primary = {
  main: '#1976d2',
  light: '#42a5f5',
  dark: '#1565c0',
  contrastText: '#FFFFFF',
};

const secondary = {
  main: '#10B981',
  light: '#3FC79A',
  dark: '#0B815A',
  contrastText: '#FFFFFF',
};

const success = {
  main: '#14B8A6',
  light: '#43C6B7',
  dark: '#0E8074',
  contrastText: '#FFFFFF',
};

const info = {
  main: '#2196F3',
  light: '#64B6F7',
  dark: '#0B79D0',
  contrastText: '#FFFFFF',
};

const warning = {
  main: '#FFB020',
  light: '#FFBF4C',
  dark: '#B27B16',
  contrastText: '#FFFFFF',
};

const error = {
  main: '#D14343',
  light: '#DA6868',
  dark: '#922E2E',
  contrastText: '#FFFFFF',
};

const text = {
  primary: '#121828',
  secondary: '#65748B',
  disabled: 'rgba(55, 65, 81, 0.48)',
};

const navigationBar = {
  text: 'rgb(209, 213, 219)',
  width: 280,
  background: '#111827',
  hover: {
    background: 'rgba(255, 255, 255, 0.08)',
  },
  active: {
    color: 'rgb(16, 185, 129)',
    background: 'rgba(255, 255, 255, 0.08)',
  },
  scrollbar: {
    shadow: 'rgba(0,0,0,0.00)',
    thumb: {
      color: 'rgba(0,0,0,.1)',
      outline: '#708090',
    },
  },
};

const loader = {
  primary: '#1976d2',
  secondary: '#f3f3f3',
};

const border = {
  main: '#cdc9c9',
  light: '#cdc9c9',
};

const active = '#dfefff';

const clickableCard = {
  main: '#ffffff',
  disabled: '#e5e5e5',
};

const dashboardCard = {
  background: '#ffffff',
  textMain: '#65748B',
  textSecondary: '#121828',
  line: '#1976d2',
};

export const lightThemeOptions: ThemeOptions = {
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[500],
          color: '#FFFFFF',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-filledDefault': {
            backgroundColor: neutral[200],
            '& .MuiChip-deleteIcon': {
              color: neutral[400],
            },
          },
          '&.MuiChip-outlinedDefault': {
            '& .MuiChip-deleteIcon': {
              color: neutral[300],
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            opacity: 1,
            color: text.secondary,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: divider,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: 'solid',
          borderWidth: 1,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: 'solid',
          borderWidth: 1,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: neutral[500],
        },
        track: {
          backgroundColor: neutral[400],
          opacity: 1,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${divider}`,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '.MuiTableCell-root': {
            color: neutral[700],
            backgroundColor: neutral[100],
          },
        },
      },
    },
  },
  navigationBar,
  loader,
  palette: {
    border,
    active,
    clickableCard,
    dashboardCard,
    action: {
      active: neutral[500],
      focus: 'rgba(55, 65, 81, 0.12)',
      hover: 'rgba(55, 65, 81, 0.04)',
      selected: 'rgba(55, 65, 81, 0.08)',
      disabledBackground: 'rgba(55, 65, 81, 0.12)',
      disabled: 'rgba(55, 65, 81, 0.26)',
    },
    background,
    divider,
    error,
    info,
    mode: 'light',
    neutral,
    primary,
    secondary,
    success,
    text,
    warning,
  },
  shadows: [
    'none',
    '0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)',
    '0px 1px 2px rgba(100, 116, 139, 0.12)',
    '0px 1px 4px rgba(100, 116, 139, 0.12)',
    '0px 1px 5px rgba(100, 116, 139, 0.12)',
    '0px 1px 6px rgba(100, 116, 139, 0.12)',
    '0px 2px 6px rgba(100, 116, 139, 0.12)',
    '0px 3px 6px rgba(100, 116, 139, 0.12)',
    '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
    '0px 5px 12px rgba(100, 116, 139, 0.12)',
    '0px 5px 14px rgba(100, 116, 139, 0.12)',
    '0px 5px 15px rgba(100, 116, 139, 0.12)',
    '0px 6px 15px rgba(100, 116, 139, 0.12)',
    '0px 7px 15px rgba(100, 116, 139, 0.12)',
    '0px 8px 15px rgba(100, 116, 139, 0.12)',
    '0px 9px 15px rgba(100, 116, 139, 0.12)',
    '0px 10px 15px rgba(100, 116, 139, 0.12)',
    '0px 12px 22px -8px rgba(100, 116, 139, 0.25)',
    '0px 13px 22px -8px rgba(100, 116, 139, 0.25)',
    '0px 14px 24px -8px rgba(100, 116, 139, 0.25)',
    '0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
  ],
};
