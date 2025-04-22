import { styled } from '@mui/material';

export const DatePickerWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'end',

  '.hoursContent': {
    margin: theme.spacing(0),
    textAlign: 'right',
    paddingRight: theme.spacing(0.5),
    b: {
      color: theme.palette.getContrastText,
      backgroundColor: theme.palette.primary.main,
      fontSize: theme.typography.caption.fontSize,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(0.5, 1.8),
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
}));

export const DateInner = styled('div')(({ theme }) => ({
  position: 'relative',
  [theme.breakpoints.down('lg')]: {
    position: 'inherit',
  },
}));

export const ChooseDate = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  margin: theme.spacing(0.5, 0, 0, 1.2),
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0, 0, 0, 0),
  },
  p: {
    fontSize: theme.typography.body1.fontSize,
    margin: theme.spacing(0, 1.5, 0, 0),
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  input: {
    borderRadius: theme.shape.borderRadius,
    height: '34px',
    padding: theme.spacing(0, 1.5),
    marginLeft: theme.spacing(1),
    fontSize: theme.typography.body2.fontSize,
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily,
    width: 'auto',
    minWidth: '200px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '130px',
      marginLeft: theme.spacing(0),
      fontSize: theme.typography.caption.fontSize,
    },
    '&:focus': {
      outline: 'none',
    },
  },
  fieldset: {
    border: 'none',
  },

  '.MuiTextField-root': {
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.border.main}`,
    borderRadius: theme.shape.borderRadius,
  },
}));

export const CalWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '8px',
  right: '0',
  zIndex: theme.zIndex.modal,
  background: theme.palette.background.paper,
  border: `solid 1px ${theme.palette.border.main}`,
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  width: '485px',
  [theme.breakpoints.down('lg')]: {
    top: '45px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '95%',
    minWidth: '250px',
    overflowY: 'scroll',
    height: '250px',
    top: '45px',
    left: '0',
    margin: '0 auto',
  },

  '.react-datepicker': {
    border: 'none',
    width: '100%',
    fontSize: theme.typography.body2.fontSize,
    background: theme.palette.background.paper,
    '.react-datepicker__navigation': {
      top: '10px',
      height: '28px',
      width: '28px',
      background: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius,
      '.react-datepicker__navigation-icon::before': {
        borderColor: theme.palette.common.white,
        borderWidth: '2px 2px 0 0',
        height: '10px',
        top: '7px',
        width: '10px',
        left: '-5px',
      },
    },
    '.react-datepicker__navigation--previous': {
      left: '15px',
    },
    '.react-datepicker__navigation--next': {
      right: '15px',
    },
    '.react-datepicker__month-container': {
      width: '50%',
      float: 'left',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      '.react-datepicker__header': {
        background: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.border.main}`,
        padding: theme.spacing(2, 0, 1.1),
        margin: theme.spacing(0, 0, 1.1, 0),
        [theme.breakpoints.down('sm')]: {
          backgroundColor: `${theme.palette.grey[100]}`,
        },
        '.react-datepicker__current-month': {
          fontWeight: theme.typography.fontWeightRegular,
          fontSize: theme.typography.body1.fontSize,
          padding: theme.spacing(0, 0, 1.5, 0),
          color: theme.palette.getContrastText(theme.palette.background.paper),
        },
        '.react-datepicker__day': {
          '&:hover': {
            backgroundColor: theme.palette.grey[100],
          },
        },
        '.react-datepicker__day-name': {
          color: theme.palette.grey[400],
        },
        '.react-datepicker__day--disabled': {
          color: theme.palette.grey[400],
        },
      },
      '.react-datepicker__week': {
        '.react-datepicker__day--disabled': {
          color: `${theme.palette.grey[400]}!important`,
        },
        '.react-datepicker__day': {
          color: theme.palette.getContrastText(theme.palette.background.paper),

          '&:hover': {
            color: theme.palette.common.black,
          },
        },
      },
      '.react-datepicker__month': {
        margin: `0 ${theme.spacing(0.5)}`,
        textAlign: 'center',
        '.react-datepicker__day--selected': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          borderRadius: theme.shape.borderRadius,
        },
        '.react-datepicker__day--in-range': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          borderRadius: theme.shape.borderRadius,
        },
        '.react-datepicker__day--keyboard-selected': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          borderRadius: theme.shape.borderRadius,
        },
      },
    },
  },
}));

export const HoursButtons = styled('div')(({ theme }) => ({
  padding: `${theme.spacing(1.8)} ${theme.spacing(1)}`,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0.6),
  },
  button: {
    margin: theme.spacing(0, 0.8),
    textTransform: 'capitalize',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(0, 0.6, 0.6, 0),
    },
  },
}));
