"use client";
import { createTheme } from "@mui/material/styles";
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { darkColors } from './colors';

// Create rtl cache
export const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'dark',
    primary: darkColors.primary,
    secondary: darkColors.secondary,
    error: darkColors.error,
    warning: darkColors.warning,
    info: darkColors.info,
    success: darkColors.success,
    background: darkColors.background,
    text: darkColors.text,
  },
  typography: {
    fontFamily: 'Vazirmatn, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: darkColors.background.paper,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.09)',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: darkColors.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: darkColors.primary.main,
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(255, 255, 255, 0.13)',
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.13)',
            },
          },
        },
      },
    },
  },
});

export default theme;
