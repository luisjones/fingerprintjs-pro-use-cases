import { createTheme } from '@mui/material/styles';
import { StyledEngineProvider, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { useUserPreferences } from './api/personalization/use-user-preferences';
import { useMemo } from 'react';

export function ThemeProvider({ children }) {
  const { hasDarkMode } = useUserPreferences();

  const theme = useMemo(() => {
    const secondary = 'rgba(0, 0, 0, 0.87)';

    return createTheme({
      palette: {
        header: hasDarkMode ? secondary : '#f2f2f7',
        primary: {
          main: '#FF5D22',
        },
        secondary: {
          main: secondary,
        },
        mode: hasDarkMode ? 'dark' : 'light',
      },
      components: {
        MuiTextField: {
          defaultProps: {
            variant: 'outlined',
          },
        },
      },
    });
  }, [hasDarkMode]);

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </StyledEngineProvider>
  );
}
