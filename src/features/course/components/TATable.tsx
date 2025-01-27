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
import React, { useState } from "react";
import { MilitaryTech, MilitaryTechOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";


interface TATableProps {
  tas: Student[];
  headTA?: Student;
  isInstructor?: boolean;
  onHeadTAChange?: (studentId: number | null) => void;
}

export default function TATable({ 
  tas, 
  headTA: initialHeadTA,
  isInstructor = false,
  onHeadTAChange 
}: TATableProps) {
  const router = useRouter();
  const [headTA, setHeadTA] = useState<Student | undefined>(initialHeadTA);
  const handleHeadTAChange = (newHeadTAId: number | null) => {
    const newHeadTA = tas.find((ta) => ta.id === newHeadTAId) || undefined;
    setHeadTA(newHeadTA);
    onHeadTAChange?.(newHeadTAId); // فراخوانی تابع ارسال شده از والدین
  }; 

  const handleStudentClick = (e: React.MouseEvent, studentId: number) => {
    e.stopPropagation(); // Prevent row click event
    router.push(`/instructor/students/${studentId}`);
  };

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
              <TableCell 
                onClick={(e) => handleStudentClick(e, ta.id)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: 'primary.main'
                  }
                }}
              >
                {ta.first_name} {ta.last_name}
              </TableCell>
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
                      onClick={() => handleHeadTAChange(headTA?.id === ta.id ? null : ta.id)}
                      color={headTA?.id === ta.id ? "primary" : "default"}
                    >
                      {headTA?.id === ta.id ? <MilitaryTech /> : <MilitaryTechOutlined />}  
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