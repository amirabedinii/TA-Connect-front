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
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useUser } from "@/features/user/hooks/useUser";
import { Person, School, Description } from "@mui/icons-material";

export default function StudentProfilePage() {
  const params = useParams();
  const studentId = params.id as string;
  const { useGetStudentDetails } = useUser();
  const { data: student, isLoading, error } = useGetStudentDetails(studentId);

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !student) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Typography color="error">
          خطا در بارگذاری اطلاعات دانشجو
        </Typography>
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
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
} 