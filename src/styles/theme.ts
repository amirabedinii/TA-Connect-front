"use client";
import { createTheme } from "@mui/material/styles";
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';

// Create rtl cache
export const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: 'rtl',
  // palette: {
  //   primary: {
  //     main: '#2e7d32', // Dark green
  //     light: '#4caf50', // Medium green
  //     dark: '#1b5e20', // Darker green
  //   },
  //   secondary: {
  //     main: '#66bb6a', // Light green
  //     light: '#81c784',
  //     dark: '#388e3c',
  //   },
  //   error: {
  //     main: '#d32f2f',
  //   },
  //   warning: {
  //     main: '#ed6c02',
  //   },
  //   info: {
  //     main: '#0288d1',
  //   },
  //   success: {
  //     main: '#2e7d32',
  //   },
  //   background: {
  //     default: '#ffffff',
  //     paper: '#f5f5f5',
  //   },
  //   text: {
  //     primary: '#1a1a1a',
  //     secondary: '#666666',
  //   },
  // },
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
  },
});

export default theme;
