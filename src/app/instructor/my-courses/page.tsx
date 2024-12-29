/*
Code Review Comments:

Strengths:
- Minimal and clean component structure
- Effective use of Material-UI components

Improvements:
- Add implementation details
- Include proper loading states
- Add error handling
- Define types for props
- Implement data fetching logic
*/


"use client";

import { Container, Typography, Paper, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useCourse } from "@/features/course/hooks/useCourse";
import InstructorMyCourseTable from "@/features/course/components/InstructorMyCourseTable";

export default function MyCoursesPage() {
  const [page, setPage] = useState(1);

  const { useGetInstructorMyCourses } = useCourse();
  const { data, isLoading } = useGetInstructorMyCourses(page, 10);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
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
        <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
          دروس من
        </Typography>
        <InstructorMyCourseTable
          courses={data?.results || []}
          page={page}
          totalItems={data?.count || 0}
          onPageChange={handlePageChange}
          pageSize={10}
          onPageSizeChange={() => {}}
        />
      </Paper>
    </Container>
  );
} 