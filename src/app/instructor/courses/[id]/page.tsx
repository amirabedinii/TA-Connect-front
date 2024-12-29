"use client";

import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import { useCourse } from "@/features/course/hooks/useCourse";
import { useParams } from "next/navigation";
import { useState } from "react";
import TATable from "@/features/course/components/TATable";
import CourseRequestsTable from "@/features/course/components/CourseRequestsTable";


export default function InstructorCourseDetailsPage() {
  const params = useParams();
  const courseId = params.id as string;
  const [activeTab, setActiveTab] = useState(0);
  const { useGetCourseDetails, useGetCourseRequests, useUpdateRequestStatus } = useCourse();
  
  const { data: course, isLoading } = useGetCourseDetails(courseId);
  const { data: requests, isLoading: isLoadingRequests } = useGetCourseRequests(courseId);
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateRequestStatus();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleStatusUpdate = (requestId: number, status: 'accepted' | 'declined') => {
    updateStatus({ requestId, status });
  };

  if (isLoading || isLoadingRequests) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!course) return null;

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
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" fontWeight="bold">
              {course.name}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              نیمسال: {course.semester}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="درخواست‌ها" />
                <Tab label="دستیاران" />
              </Tabs>
            </Box>

            <Box sx={{ mt: 3 }}>
              {activeTab === 0 && (
                <CourseRequestsTable 
                  requests={requests?.results || []}
                  onStatusUpdate={handleStatusUpdate}
                  isUpdating={isUpdating}
                />
              )}
              {activeTab === 1 && (
                <TATable 
                  tas={course.accepted_students || []}
                  headTA={course.headTA?.student}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
} 