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
  default: '#0B0F19',
  paper: neutral[900],
};

const divider = '#2D3748';

const primary = {
  main: '#7582EB',
  light: '#909BEF',
  dark: '#515BA4',
  contrastText: neutral[900],
};

const secondary = {
  main: '#10B981',
  light: '#3FC79A',
  dark: '#0B815A',
  contrastText: neutral[900],
};

const success = {
  main: '#14B8A6',
  light: '#43C6B7',
  dark: '#0E8074',
  contrastText: neutral[900],
};

const info = {
  main: '#2196F3',
  light: '#64B6F7',
  dark: '#0B79D0',
  contrastText: neutral[900],
};

const warning = {
  main: '#FFB020',
  light: '#FFBF4C',
  dark: '#B27B16',
  contrastText: neutral[900],
};

const error = {
  main: '#D14343',
  light: '#DA6868',
  dark: '#922E2E',
  contrastText: neutral[900],
};

const text = {
  primary: '#EDF2F7',
  secondary: '#A0AEC0',
  disabled: 'rgba(255, 255, 255, 0.48)',
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
  primary: '#584cff',
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
  background: '#111827',
  textMain: '#A0AEC0',
  textSecondary: '#EDF2F7',
  line: '#5048E5',
};

export const darkThemeOptions: ThemeOptions = {
  navigationBar,
  loader,
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
            backgroundColor: neutral[800],
            '& .MuiChip-deleteIcon': {
              color: neutral[500],
            },
          },
          '&.MuiChip-outlinedDefault': {
            borderColor: neutral[700],
            '& .MuiChip-deleteIcon': {
              color: neutral[700],
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
          color: neutral[700],
        },
        track: {
          backgroundColor: neutral[500],
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
            backgroundColor: neutral[800],
            color: neutral[300],
          },
        },
      },
    },
  },
  palette: {
    border,
    active,
    clickableCard,
    dashboardCard,
    action: {
      active: neutral[400],
      hover: 'rgba(255, 255, 255, 0.04)',
      selected: 'rgba(255, 255, 255, 0.08)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      disabled: 'rgba(255, 255, 255, 0.26)',
    },
    background,
    divider,
    error,
    info,
    mode: 'dark',
    neutral,
    primary,
    secondary,
    success,
    text,
    warning,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.24)',
    '0px 1px 2px rgba(0, 0, 0, 0.24)',
    '0px 1px 4px rgba(0, 0, 0, 0.24)',
    '0px 1px 5px rgba(0, 0, 0, 0.24)',
    '0px 1px 6px rgba(0, 0, 0, 0.24)',
    '0px 2px 6px rgba(0, 0, 0, 0.24)',
    '0px 3px 6px rgba(0, 0, 0, 0.24)',
    '0px 4px 6px rgba(0, 0, 0, 0.24)',
    '0px 5px 12px rgba(0, 0, 0, 0.24)',
    '0px 5px 14px rgba(0, 0, 0, 0.24)',
    '0px 5px 15px rgba(0, 0, 0, 0.24)',
    '0px 6px 15px rgba(0, 0, 0, 0.24)',
    '0px 7px 15px rgba(0, 0, 0, 0.24)',
    '0px 8px 15px rgba(0, 0, 0, 0.24)',
    '0px 9px 15px rgba(0, 0, 0, 0.24)',
    '0px 10px 15px rgba(0, 0, 0, 0.24)',
    '0px 12px 22px -8px rgba(0, 0, 0, 0.24)',
    '0px 13px 22px -8px rgba(0, 0, 0, 0.24)',
    '0px 14px 24px -8px rgba(0, 0, 0, 0.24)',
    '0px 20px 25px rgba(0, 0, 0, 0.24)',
    '0px 25px 50px rgba(0, 0, 0, 0.24)',
    '0px 25px 50px rgba(0, 0, 0, 0.24)',
    '0px 25px 50px rgba(0, 0, 0, 0.24)',
    '0px 25px 50px rgba(0, 0, 0, 0.24)',
  ],
};
