import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Chip,
  Stack,
} from "@mui/material";
import { Request, RequestStatus } from "../types/course.types";

interface RequestsTableProps {
  requests: Request[];
  page: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
  pageSize: number;
  onPageSizeChange: (newPageSize: number) => void;
}

const getStatusColor = (status: RequestStatus) => {
  switch (status) {
    case RequestStatus.ACCEPTED:
      return "success";
    case RequestStatus.DECLINED:
      return "error";
    case RequestStatus.PENDING:
      return "warning";
    default:
      return "default";
  }
};

const getStatusLabel = (status: RequestStatus) => {
  switch (status) {
    case RequestStatus.ACCEPTED:
      return "پذیرفته شده";
    case RequestStatus.DECLINED:
      return "رد شده";
    case RequestStatus.PENDING:
      return "در انتظار بررسی";
    default:
      return status;
  }
};

export default function RequestsTable({
  requests,
  page,
  totalItems,
  onPageChange,
  pageSize,
  onPageSizeChange,
}: RequestsTableProps) {
  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onPageSizeChange(parseInt(event.target.value, 10));
  };

  return (
    <Stack spacing={2}>
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
                <TableCell>{request.course.name}</TableCell>
                <TableCell>
                  {request.course.instructor.first_name}{" "}
                  {request.course.instructor.last_name}
                </TableCell>
                <TableCell>{request.course.semester}</TableCell>
                <TableCell>
                  {new Date(request.date).toLocaleDateString("fa-IR")}
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(request.status)}
                    color={getStatusColor(request.status)}
                    size="small"
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
        rowsPerPageOptions={[10]}
        labelRowsPerPage="تعداد در هر صفحه"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} از ${count !== -1 ? count : `بیش از ${to}`}`
        }
      />
    </Stack>
  );
}
