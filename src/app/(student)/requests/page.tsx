"use client";

import { Container, Typography, Paper, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useCourse } from "@/features/course/hooks/useCourse";
import CourseRequestsTable from "@/features/course/components/CourseRequestsTable";

export default function RequestsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { useGetCourseRequests } = useCourse();
  const { data, isLoading } = useGetCourseRequests(page, pageSize);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

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
        <Typography
          component="h1"
          variant="h4"
          sx={{ mb: 3, fontWeight: "bold" }}
        >
          درخواست‌های من
        </Typography>
        <CourseRequestsTable
          requests={data?.requests || []}
          page={page}
          totalItems={data?.totalItems || 0}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
      </Paper>
    </Container>
  );
} 