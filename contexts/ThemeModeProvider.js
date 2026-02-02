import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { DEFAULT_THEME, GENERAL_FONT_FAMILY, STORAGE_THEME_MODE, THEME_DARK, THEME_LIGHT } from '../_mocks_/_settings_items_';
export const ColorModeContext = createContext({ toggleColorMode: () => { } });


export default function ThemeModeProvider({ children, themeMode }) {
    const [mode, setMode] = useState(DEFAULT_THEME);

    useEffect(() => {
        setMode(themeMode);
        console.log("Init theme", themeMode)
    }, [themeMode])

    useEffect(() => {
        document.documentElement.setAttribute(STORAGE_THEME_MODE, mode);
        //window.localStorage.setItem(STORAGE_THEME_MODE, mode);
        console.log("Change theme", mode)
    }, [mode])

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    window.localStorage.setItem(STORAGE_THEME_MODE, prevMode === THEME_LIGHT ? THEME_DARK : THEME_LIGHT);
                    return(prevMode === THEME_LIGHT ? THEME_DARK : THEME_LIGHT);
                });
                
            },
        }),
        [],
    );

    const theme = useMemo(
        () =>
            createTheme({
                typography: {
                    button: {
                      //fontSize: '1rem',
                      //fontFamily: GENERAL_FONT_FAMILY,
                    },
                    tooltip: {
                        //fontSize: '1rem',
                        fontFamily: GENERAL_FONT_FAMILY,
                      },
                  },
                components: {
                    MuiTypography: {
                        styleOverrides: {
                            root: {
                              fontFamily: "Roboto",
                              color: '#f0f0eb',
                            },
                          },
                    },
                    MuiTooltip: {
                        styleOverrides: {
                            // Name of the slot
                            root: {
                              // Some CSS
                              fontFamily: "Coolvetica",
                            },
                          },
                    }
                  },
                palette: {
                    mode: 'dark',
                    primary: {
                        main: '#ffd700',
                        light: '#ffdf33',
                        dark: '#e6c200',
                        contrastText: '#0a0a0a',
                    },
                    background: {
                        default: '#0a0a0a',
                        menu: 'rgba(10, 10, 10, 0.92)',
                        paper: 'rgba(10, 10, 10, 0.92)',
                        card: 'rgba(10, 10, 10, 0.92)',
                        drawer: 'rgba(10, 10, 10, 0.92)',
                    },
                    divider: '#ffd700',
                    text: {
                        primary: '#f0f0eb',
                        secondary: '#9a9a9a',
                    },
                },
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}