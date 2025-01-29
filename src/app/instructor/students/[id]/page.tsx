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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { School, Description, CloudDownload, History } from "@mui/icons-material";
import { useUser } from "@/features/user/hooks/useUser";
import { useParams, useRouter } from "next/navigation";
import { Student } from "@/features/course/types/course.types";
import { showToast } from "@/lib/utils/utils";

export default function StudentProfilePage() {
  const params = useParams();
  const studentId = params.id as string;
  const { useGetStudentDetails, downloadStudentResume } = useUser();
  const { data: student, isLoading } = useGetStudentDetails(studentId);

  const handleDownloadResume = async () => {
    try {
      if (student?.resume_file && studentId) {
        await downloadStudentResume(studentId);
      }
    } catch (error) {
      console.error('Resume download error:', error);
      showToast.error("خطا در دانلود رزومه");
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

              {student?.accepted_requests && student.accepted_requests.length > 0 && (
                <ListItem>
                  <ListItemIcon>
                    <School />
                  </ListItemIcon>
                  <ListItemText 
                    primary="دروس دستیار آموزشی"
                    secondary={
                      <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>نام درس</TableCell>
                              <TableCell>نیمسال</TableCell>
                              <TableCell>استاد</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {student.accepted_requests.map((request) => (
                              <TableRow key={request.id}>
                                <TableCell>{request.course.name}</TableCell>
                                <TableCell>{request.course.semester}</TableCell>
                                <TableCell>
                                  {`${request.course.instructor.first_name} ${request.course.instructor.last_name}`}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    }
                  />
                </ListItem>
              )}
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
} 