import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Course } from "../types/course.types";

interface RequestModalProps {
  course: Course | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export default function RequestModal({
  course,
  open,
  onClose,
  onConfirm,
  isLoading,
}: RequestModalProps) {
  if (!course) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>تایید درخواست</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            آیا از درخواست این درس اطمینان دارید؟
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            نام درس: {course.name}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            استاد: {`${course?.instructor?.first_name} ${course?.instructor?.last_name}`}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            نیمسال: {course.semester}
          </Typography>
          {/* <Typography color="text.secondary">
            شرایط: {course.condition}
          </Typography> */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          انصراف
        </Button>
        <Button onClick={onConfirm} variant="contained" disabled={isLoading}>
          {isLoading ? "در حال ثبت..." : "تایید"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
