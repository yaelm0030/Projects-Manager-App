import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF'
    },
    primary: {
      main: '#f68934',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#f2c09e'
    },
    text: {
      primary: '#072134',
      secondary: '#616161'
    }
  },
  typography: {
    fontFamily: "'Inter', 'Public Sans', sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    body1: { fontWeight: 300 },
    body2: { fontWeight: 300 }
  },
  spacing: 8,
  shape: {
    borderRadius: 12
  },
  components: {
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: 'none',
          borderRadius: 8,
          backgroundColor: '#f4f4f4'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          textTransform: 'none',
          borderRadius: 8,
          transition: 'background-color 0.3s, transform 0.2s',
          '&:hover': {
            boxShadow: 'none',
            transform: 'translateY(-1px)'
          }
        },
        containedPrimary: {
          backgroundColor: '#072134',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#f68934'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { height: 8, borderRadius: 4, backgroundColor: '#e0e0e0' },
        bar:  { borderRadius: 4 }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          fontWeight: 500,
          backgroundColor: '#E0E4E7',
          color: '#212121'
        },
        colorPrimary: {
          backgroundColor: '#f68934',
          color: '#fff'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          height: 70,
          backgroundColor: '#072134',
          color: '#FFFFFF',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
        },
      },
    }
  }
});

export default theme;
