import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Student } from "../types/course.types";
import { StarOutline, Star } from "@mui/icons-material";

interface TATableProps {
  tas: Student[];
  headTA?: Student;
  isInstructor?: boolean;
  onHeadTAChange?: (studentId: number | null) => void;
}

export default function TATable({ 
  tas, 
  headTA, 
  isInstructor = false,
  onHeadTAChange 
}: TATableProps) {
  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>نام</TableCell>
            <TableCell>نام خانوادگی</TableCell>
            <TableCell>شماره دانشجویی</TableCell>
            <TableCell>نقش</TableCell>
            {isInstructor && <TableCell>عملیات</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {tas.map((ta) => (
            <TableRow key={ta.id}>
              <TableCell>{ta.first_name}</TableCell>
              <TableCell>{ta.last_name}</TableCell>
              <TableCell>{ta.student_number}</TableCell>
              <TableCell>
                {headTA?.id === ta.id ? (
                  <Chip 
                    label="سر دستیار" 
                    color="primary" 
                    size="small" 
                  />
                ) : (
                  <Chip 
                    label="دستیار" 
                    variant="outlined" 
                    size="small" 
                  />
                )}
              </TableCell>
              {isInstructor && (
                <TableCell>
                  <Tooltip title={headTA?.id === ta.id ? "حذف سر دستیار" : "انتخاب به عنوان سر دستیار"}>
                    <IconButton
                      onClick={() => onHeadTAChange?.(headTA?.id === ta.id ? null : ta.id)}
                      color={headTA?.id === ta.id ? "primary" : "default"}
                    >
                      {headTA?.id === ta.id ? <Star /> : <StarOutline />}
                    </IconButton>
                  </Tooltip>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 