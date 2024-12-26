import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Chip,
} from "@mui/material";
import { CourseRequest } from "../types/course.types";

interface CourseRequestsTableProps {
  requests: CourseRequest[];
  page: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
}

export default function CourseRequestsTable({
  requests,
  page,
  totalItems,
  onPageChange,
  pageSize,
  onPageSizeChange,
}: CourseRequestsTableProps) {
  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onPageSizeChange(parseInt(event.target.value, 10));
    onPageChange(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return 'warning';
      case 'APPROVED':
        return 'success';
      case 'REJECTED':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return 'در انتظار بررسی';
      case 'APPROVED':
        return 'تایید شده';
      case 'REJECTED':
        return 'رد شده';
      default:
        return status;
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>نام درس</TableCell>
              <TableCell>استاد</TableCell>
              <TableCell>نیمسال</TableCell>
              <TableCell>تاریخ درخواست</TableCell>
              <TableCell>وضعیت</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.courseName}</TableCell>
                <TableCell>{request.teacherName}</TableCell>
                <TableCell>{request.semester}</TableCell>
                <TableCell>
                  {new Date(request.requestDate).toLocaleDateString('fa-IR')}
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(request.status)}
                    color={getStatusColor(request.status)}
                  />
                </TableCell>
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
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="تعداد در هر صفحه"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} از ${count !== -1 ? count : `بیش از ${to}`}`
        }
      />
    </>
  );
} 