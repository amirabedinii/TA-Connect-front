import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Card,
  CardContent,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Course } from "../types/course.types";
import { useRouter } from "next/navigation";

interface InstructorCoursesTableProps {
  courses: Course[];
}

export default function InstructorCoursesTable({ courses }: InstructorCoursesTableProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const handleRowClick = (courseId: string) => {
    router.push(`/student/courses/${courseId}`);
  };

  if (isMobile) {
    return (
      <Stack spacing={2}>
        {courses.map((course) => (
          <Card
            key={course.id}
            sx={{
              width: "100%",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
            onClick={() => handleRowClick(course.id)}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {course.name}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                نیمسال: {course.semester}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>نام درس</TableCell>
            <TableCell>نیمسال</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => (
            <TableRow
              key={course.id}
              onClick={() => handleRowClick(course.id)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.semester}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 