import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { STORAGE_THEME_MODE, THEME_DARK, THEME_LIGHT } from '../_mocks_/_settings_items_';
import { amber, green, grey, deepOrange } from '@mui/material/colors';

export const ColorModeContext = createContext({ toggleColorMode: () => { } });


export default function ThemeModeProvider({ children, themeMode }) {
    const [mode, setMode] = useState(themeMode);

    useEffect(() => {
        setMode(themeMode);
    }, [themeMode])

    useEffect(() => {
        document.documentElement.setAttribute(STORAGE_THEME_MODE, mode);
        window.sessionStorage.setItem(STORAGE_THEME_MODE, mode);
    }, [mode])

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === THEME_LIGHT ? THEME_DARK : THEME_LIGHT));
            },
        }),
        [],
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    background: {
                        default: 'var(--accents0)',
                        paper: 'var(--background)',
                        drawer: 'var(--accents1)',
                    },
                    ...(mode === 'light'
                        ? {
                            // palette values for light mode
                            primary: deepOrange,
                            divider: 'var(--primary)',
                            text: {
                                primary: grey[900],
                                secondary: grey[800],
                            },
                        }
                        : {
                            // palette values for dark mode
                            primary: deepOrange,
                            divider: 'var(--primary)',
                            text: {
                                primary: '#fff',
                                secondary: grey[500],
                            },
                        }),
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