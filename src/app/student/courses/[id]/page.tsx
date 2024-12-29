/*
Code Review Comments:

Strengths:
- Effective use of TypeScript with proper type safety
- Clean component structure and separation of concerns
- Good use of Material-UI for styling
- Responsive design with loading states

Improvements:
- Add an error boundary for better error management
- Extract styled components into separate files
- Enhance loading states for nested components
- Implement retry logic for failed data fetches
*/


"use client";

import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  // List,
  // ListItem,
  // ListItemText,
  // Divider,
  Button,
  // useTheme,
  // useMediaQuery,
  Link,
} from "@mui/material";
import { useCourse } from "@/features/course/hooks/useCourse";
import { useParams, useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { PersonOutline, CalendarToday } from "@mui/icons-material";
import TATable from "@/features/course/components/TATable";

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const courseId = params.id as string;
  const { useGetCourseDetails } = useCourse();
  const { data: courseData, isLoading: isLoadingCourse } = useGetCourseDetails(courseId);


  if (isLoadingCourse) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  const course = courseData;

  if (!course) return null;

  const handleInstructorClick = () => {
    router.push(`/student/instructors/${course.instructor.id}`);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: { xs: 2, md: 4 },
          borderRadius: 2,
          background: (theme) => theme.palette.background.paper,
        }}
      >
        <Grid container spacing={4}>
          {/* Course Header */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
              <Typography variant="h4" component="h1" fontWeight="bold">
                {course.name}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.push(`/student/available-courses`)}
                sx={{ 
                  borderRadius: 2,
                  minWidth: 150,
                  py: 1
                }}
              >
               مشاهده بقیه درس ها 
              </Button>
            </Box>
          </Grid>

          {/* Course Info */}
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                جزئیات درس
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PersonOutline color="action" />
                  <Typography>
                    استاد:{" "}
                    <Link
                      component="span"
                      onClick={handleInstructorClick}
                      sx={{
                        cursor: "pointer",
                        color: "primary.main",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {course.instructor.first_name} {course.instructor.last_name}
                    </Link>
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarToday color="action" />
                  <Typography>نیمسال: {course.semester}</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
              دستیاران آموزشی
            </Typography>
            {isLoadingCourse ? (
              <CircularProgress />
            ) : (
              <TATable tas={course.accepted_students|| []} />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
} 