import { createTheme, Theme, alpha } from '@mui/material/styles';

// Wspólne opcje dla obu motywów
const commonOptions = {
  typography: {
    fontFamily: 'Inter, "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0.0075em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.01071em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  transitions: {
    // Szybsze animacje dla płynniejszego UX
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      // Ulepszone funkcje easing dla bardziej naturalnych animacji
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
};

// Definicja kolorów dla jasnego motywu
const lightPalette = {
  primary: {
    main: '#00838F',  // Głęboki turkus jako kolor główny
    light: '#4FB3BF',
    dark: '#005662',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#FFB300',  // Ciepły amber jako kolor pomocniczy
    light: '#FFE54C',
    dark: '#C68400',
    contrastText: '#212121',
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#9E9E9E',
  },
  background: {
    default: '#FAFAFA',
    paper: '#FFFFFF',
  },
  divider: '#E0E0E0',
  error: {
    main: '#D32F2F',
    light: '#EF5350',
    dark: '#C62828',
  },
  warning: {
    main: '#FFA000',
    light: '#FFB74D',
    dark: '#F57C00',
  },
  info: {
    main: '#0288D1',
    light: '#4FC3F7',
    dark: '#01579B',
  },
  success: {
    main: '#388E3C',
    light: '#66BB6A',
    dark: '#1B5E20',
  },
};

// Definicja kolorów dla ciemnego motywu
const darkPalette = {
  primary: {
    main: '#26C6DA',  // Jaśniejszy turkus dla ciemnego tła
    light: '#80DEEA',
    dark: '#00838F',
    contrastText: '#000000',
  },
  secondary: {
    main: '#FFD54F',  // Jaśniejszy amber dla ciemnego tła
    light: '#FFECB3',
    dark: '#FFA000',
    contrastText: '#000000',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B0BEC5',
    disabled: '#78909C',
  },
  background: {
    default: '#121212',
    paper: '#1E1E1E',
  },
  divider: '#424242',
  error: {
    main: '#F44336',
    light: '#E57373',
    dark: '#D32F2F',
  },
  warning: {
    main: '#FFC107',
    light: '#FFE082',
    dark: '#FFA000',
  },
  info: {
    main: '#29B6F6',
    light: '#81D4FA',
    dark: '#0288D1',
  },
  success: {
    main: '#66BB6A',
    light: '#A5D6A7',
    dark: '#388E3C',
  },
};

// Wspólne komponenty niestandardowe dla obu motywów
const getComponents = (mode: 'light' | 'dark') => {
  const isDark = mode === 'dark';
  
  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'background-color 0.3s ease, color 0.3s ease',
          scrollBehavior: 'smooth',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          fontWeight: 500,
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: 'none',
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: isDark 
              ? '0px 4px 8px rgba(0, 0, 0, 0.6)' 
              : '0px 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: isDark 
            ? '0px 4px 12px rgba(0, 0, 0, 0.2)' 
            : '0px 4px 12px rgba(0, 0, 0, 0.05)',
          borderRadius: 12,
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: isDark 
              ? '0px 8px 16px rgba(0, 0, 0, 0.3)'
              : '0px 8px 16px rgba(0, 0, 0, 0.1)',
          }
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
          '&:last-child': {
            paddingBottom: 24,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${isDark ? '#424242' : '#E0E0E0'}`,
          padding: '16px 24px',
          transition: 'background-color 0.2s ease',
        },
        head: {
          fontWeight: 600,
          backgroundColor: isDark ? '#1E1E1E' : '#FAFAFA',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: isDark 
              ? 'rgba(38, 198, 218, 0.08)'
              : 'rgba(0, 131, 143, 0.04)',
            transition: 'background-color 0.2s ease',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 500,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          }
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
          boxShadow: isDark 
            ? '0px 0px 20px rgba(0, 0, 0, 0.3)'
            : '0px 0px 20px rgba(0, 0, 0, 0.05)',
          transition: 'box-shadow 0.3s ease',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: isDark 
            ? '0px 0px 20px rgba(0, 0, 0, 0.3)'
            : '0px 0px 20px rgba(0, 0, 0, 0.05)',
          transition: 'box-shadow 0.3s ease',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: 'all 0.2s ease',
            '&.Mui-focused fieldset': {
              borderWidth: 1,
            },
            '&:hover fieldset': {
              borderColor: isDark ? '#26C6DA' : '#00838F',
            }
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: isDark 
            ? '0px 4px 12px rgba(0, 0, 0, 0.3)'
            : '0px 4px 12px rgba(0, 0, 0, 0.05)',
          borderRadius: 12,
          transition: 'box-shadow 0.3s ease',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateX(4px)',
          }
        }
      }
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          '& .MuiStepLabel-iconContainer': {
            transition: 'transform 0.3s ease',
          },
          '& .MuiStepLabel-root.Mui-active .MuiStepLabel-iconContainer': {
            transform: 'scale(1.2)',
          }
        }
      }
    },
    MuiFab: {
      styleOverrides: {
        root: {
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: isDark 
              ? '0px 8px 16px rgba(0, 0, 0, 0.5)'
              : '0px 8px 16px rgba(0, 0, 0, 0.2)',
          }
        }
      }
    }
  };
};

// Tworzenie motywów
export const lightTheme = createTheme({
  ...commonOptions,
  palette: lightPalette,
  components: getComponents('light'),
});

export const darkTheme = createTheme({
  ...commonOptions,
  palette: darkPalette,
  components: getComponents('dark'),
});

// Eksportowanie domyślnego motywu (jasny)
export default lightTheme;