import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import { Request, RequestStatus } from "../types/course.types";

interface CourseRequestsTableProps {
  requests: Request[];
  onStatusUpdate: (requestId: number, status: 'accepted' | 'declined') => void;
  isUpdating: boolean;
}

export default function CourseRequestsTable({
  requests,
  onStatusUpdate,
  isUpdating,
}: CourseRequestsTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>نام دانشجو</TableCell>
            <TableCell>شماره دانشجویی</TableCell>
            <TableCell>نمره درس</TableCell>
            <TableCell>تاریخ درخواست</TableCell>
            <TableCell>وضعیت</TableCell>
            <TableCell>عملیات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                {request.student.first_name} {request.student.last_name}
              </TableCell>
              <TableCell>{request.student.student_number}</TableCell>
              <TableCell>{request.score}</TableCell>
              <TableCell>
                {new Date(request.date).toLocaleDateString("fa-IR")}
              </TableCell>
              <TableCell>
                <Chip
                  label={
                    request.status === RequestStatus.PENDING
                      ? "در انتظار بررسی"
                      : request.status === RequestStatus.ACCEPTED
                      ? "پذیرفته شده"
                      : "رد شده"
                  }
                  color={
                    request.status === RequestStatus.PENDING
                      ? "warning"
                      : request.status === RequestStatus.ACCEPTED
                      ? "success"
                      : "error"
                  }
                  size="small"
                />
              </TableCell>
              <TableCell>
                {request.status === RequestStatus.PENDING && (
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => onStatusUpdate(request.id, 'accepted')}
                      disabled={isUpdating}
                    >
                      قبول
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => onStatusUpdate(request.id, 'declined')}
                      disabled={isUpdating}
                    >
                      رد
                    </Button>
                  </Stack>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 