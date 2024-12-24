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
  Person,
  Badge,
  Science,
  ContactPhone,
} from "@mui/icons-material";

export default function InstructorDetailsPage() {
  const params = useParams();
  const instructorId = params.id as string;
  const { useGetInstructorDetails } = useCourse();
  const { data, isLoading } = useGetInstructorDetails(instructorId);

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  const instructor = data?.instructor;

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
                  <Badge />
                </ListItemIcon>
                <ListItemText
                  primary="کد پرسنلی"
                  secondary={instructor.staff_id}
                />
              </ListItem>
              <Divider variant="inset" component="li" />

              <ListItem>
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText primary="ایمیل" secondary={instructor.email} />
              </ListItem>
              <Divider variant="inset" component="li" />

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
                      {instructor?.way_of_communication?.map((way) => (
                        <Chip key={way} label={way} size="small" />
                      ))}
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
                    <Box
                      component="span"
                      sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}
                    >
                      {instructor?.research_fields?.map((field) => (
                        <Chip
                          key={field}
                          label={field}
                          size="small"
                          color="primary"
                        />
                      ))}
                    </Box>
                  }
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
