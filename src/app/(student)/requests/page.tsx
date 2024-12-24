"use client";

import { Container, Typography, Paper } from "@mui/material";

export default function RequestsPage() {
  return (
    <Container component="main" maxWidth="lg">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 4,
          borderRadius: 2,
          background: (theme) => theme.palette.background.paper,
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
          درخواست‌های من
        </Typography>
        {/* Add your requests list component here */}
      </Paper>
    </Container>
  );
} 