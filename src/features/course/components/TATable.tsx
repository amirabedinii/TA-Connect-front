import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import { Student } from "../types/course.types";

interface TATableProps {
  tas: Student[];
  headTA?: Student;
}

export default function TATable({ tas, headTA }: TATableProps) {
  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>نام</TableCell>
            <TableCell>نام خانوادگی</TableCell>
            <TableCell>شماره دانشجویی</TableCell>
            <TableCell>نقش</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tas.map((ta) => (
            <TableRow key={ta.id}>
              <TableCell>{ta.first_name}</TableCell>
              <TableCell>{ta.last_name}</TableCell>
              <TableCell>{ta.studentNumber}</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 