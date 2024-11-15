"use client";

import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import theme, { cacheRtl } from "../styles/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouterCacheProvider options={{ key: "css" }}>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </CacheProvider>
      </AppRouterCacheProvider>
    </QueryClientProvider>
  );
} 