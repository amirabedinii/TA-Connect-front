import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import { Course } from "../types/course.types";
import { useState } from "react";

interface RequestModalProps {
  course: Course | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (score: number) => void;
  isLoading: boolean;
}

export default function RequestModal({
  course,
  open,
  onClose,
  onConfirm,
  isLoading,
}: RequestModalProps) {
  const [score, setScore] = useState<string>("");
  const [error, setError] = useState<string>("");

  if (!course) return null;

  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setScore(value);
    
    const numValue = Number(value);
    if (value && (isNaN(numValue) || numValue < 0 || numValue > 20)) {
      setError("نمره باید بین 0 تا 20 باشد");
    } else {
      setError("");
    }
  };

  const handleConfirm = () => {
    const numScore = Number(score);
    if (!score || isNaN(numScore) || numScore < 0 || numScore > 20) {
      setError("لطفا نمره معتبر وارد کنید");
      return;
    }
    onConfirm(numScore);
  };

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
          <TextField
            margin="normal"
            required
            fullWidth
            label="نمره درس"
            type="number"
            value={score}
            onChange={handleScoreChange}
            error={!!error}
            helperText={error}
            inputProps={{ 
              min: 0,
              max: 20,
              step: "any"
            }}
            sx={{ mt: 2 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          انصراف
        </Button>
        <Button 
          onClick={handleConfirm} 
          variant="contained" 
          disabled={isLoading || !!error || !score}
        >
          {isLoading ? "در حال ثبت..." : "تایید"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
