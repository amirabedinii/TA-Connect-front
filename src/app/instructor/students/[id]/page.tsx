"use client";

import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import { School, Description, CloudDownload, History } from "@mui/icons-material";
import { useUser } from "@/features/user/hooks/useUser";
import { useParams, useRouter } from "next/navigation";
import { Student } from "@/features/course/types/course.types";

export default function StudentProfilePage() {
  const params = useParams();
  const studentId = params.id as string;
  const { useGetStudentDetails } = useUser();
  const { data: student, isLoading } = useGetStudentDetails(studentId);

  const handleDownloadResume = () => {
    if (student?.resume_file) {
      window.open(`${process.env.NEXT_PUBLIC_API_BASE_URL}/faculty/students/${studentId}/download_file/`, '_blank');
    }
  };

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!student) return null;

  return (
    <Container component="main" maxWidth="lg">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" fontWeight="bold">
              {student.first_name} {student.last_name}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <School />
                </ListItemIcon>
                <ListItemText 
                  primary="شماره دانشجویی"
                  secondary={student.student_number}
                />
              </ListItem>
              <Divider />
              
              {student.biography && (
                <>
                  <ListItem>
                    <ListItemIcon>
                      <Description />
                    </ListItemIcon>
                    <ListItemText 
                      primary="بیوگرافی"
                      secondary={student.biography}
                    />
                  </ListItem>
                  <Divider />
                </>
              )}

              <ListItem>
                <ListItemIcon>
                  <CloudDownload />
                </ListItemIcon>
                <ListItemText 
                  primary="رزومه"
                  secondary={
                    <Button
                      variant="contained"
                      onClick={handleDownloadResume}
                      disabled={!student?.resume_file}
                      startIcon={<CloudDownload />}
                      sx={{ mt: 1 }}
                    >
                      دانلود رزومه
                    </Button>
                  }
                />
              </ListItem>
              <Divider />
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
} 