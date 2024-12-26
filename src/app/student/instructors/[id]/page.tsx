"use client";

import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { useCourse } from "@/features/course/hooks/useCourse";
import { useParams } from "next/navigation";
import { CircularProgress } from "@mui/material";
import {
  Email,
  // Person,
  Badge,
  Science,
  ContactPhone,
} from "@mui/icons-material";
import InstructorCoursesTable from "@/features/course/components/InstructorCoursesTable";

export default function InstructorDetailsPage() {
  const params = useParams();
  const instructorId = params.id as string;
  const { useGetInstructorDetails, useGetInstructorCourses } = useCourse();
  const { data, isLoading } = useGetInstructorDetails(instructorId);
  const { data: coursesData, isLoading: isLoadingCourses } =
    useGetInstructorCourses(instructorId);

  if (isLoading || isLoadingCourses) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  const instructor = data;

  if (!instructor) return null;

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
          {/* Header */}
          <Grid item xs={12}>
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              {instructor.first_name} {instructor.last_name}
            </Typography>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <ContactPhone />
                </ListItemIcon>
                <ListItemText
                  primary="روش‌های ارتباطی"
                  secondary={
                    <Box
                      sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}
                    >
                      <Chip
                        key={instructor?.way_of_communication}
                        label={instructor?.way_of_communication}
                        size="small"
                      />
                    </Box>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemIcon>
                  <Science />
                </ListItemIcon>
                <ListItemText
                  primary="زمینه‌های تحقیقاتی"
                  secondary={
                    <Typography component="div" variant="body2">
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                          mt: 1,
                        }}
                      >
                        {instructor?.research_fields
                          ?.split(" ")
                          .map((field) => (
                            <Chip
                              key={field}
                              label={field}
                              size="small"
                              color="primary"
                            />
                          ))}
                      </Box>
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Grid>

          {/* Courses Section */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              gutterBottom
              fontWeight="bold"
              color="primary"
            >
              دروس استاد
            </Typography>
            {coursesData?.results && (
              <InstructorCoursesTable courses={coursesData.results} />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
