import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
  TablePagination,
} from "@mui/material";
import { Course } from "../types/course.types";
import { useRouter } from "next/navigation";

interface InstructorMyCourseTableProps {
  courses: Course[];
  page: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
  pageSize: number;
  onPageSizeChange: (newPageSize: number) => void;
}

export default function InstructorMyCourseTable({
  courses,
  page,
  totalItems,
  onPageChange,
  pageSize,
  onPageSizeChange,
}: InstructorMyCourseTableProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onPageSizeChange(parseInt(event.target.value, 10));
    onPageChange(1);
  };

  const handleRowClick = (courseId: number) => {
    router.push(`/instructor/courses/${courseId}`);
  };

  if (isMobile) {
    return (
      <>
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
                <Typography color="text.secondary">
                  شرط معدل: {course.condition || "تعیین نشده"}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
        <TablePagination
          component="div"
          count={totalItems}
          page={page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10]}
          labelRowsPerPage="تعداد در هر صفحه"
        />
      </>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>نام درس</TableCell>
              <TableCell>نیمسال</TableCell>
              <TableCell>شرط معدل</TableCell>
              <TableCell>تعداد دستیاران</TableCell>
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
                <TableCell>{course.condition || "تعیین نشده"}</TableCell>
                <TableCell>{course.accepted_students?.length || 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalItems}
        page={page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10]}
        labelRowsPerPage="تعداد در هر صفحه"
      />
    </>
  );
} 