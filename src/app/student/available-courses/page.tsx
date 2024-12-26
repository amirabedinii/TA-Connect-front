"use client";

import { Container, Typography, Paper, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useCourse } from "@/features/course/hooks/useCourse";
import CourseTable from "@/features/course/components/CourseTable";
import RequestModal from "@/features/course/components/RequestModal";
import { Course } from "@/features/course/types/course.types";

export default function AvailableCoursesPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { useGetAvailableCourses, useRequestCourse } = useCourse();
  const { data, isLoading, error } = useGetAvailableCourses(page, pageSize);
  const { mutate: requestCourse, isPending: isRequesting } = useRequestCourse();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  console.log('Available Courses Data:', data);
  console.log('Loading State:', isLoading);
  console.log('Error:', error);

  const handleRequestClick = (course: Course) => {
    setSelectedCourse(course);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  const handleConfirmRequest = (score: number) => {
    if (selectedCourse) {
      requestCourse(
        { 
          courseId: selectedCourse.id,
          score: score 
        },
        {
          onSuccess: () => {
            setSelectedCourse(null);
          },
        }
      );
    }
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
          دروس قابل درخواست
        </Typography>
        <CourseTable
          courses={data?.courses || []}
          onRequestClick={handleRequestClick}
          page={page}
          totalItems={data?.totalItems || 0}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
      </Paper>

      <RequestModal
        course={selectedCourse}
        open={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onConfirm={handleConfirmRequest}
        isLoading={isRequesting}
      />
    </Container>
  );
} 