"use client";

import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useUser } from "@/features/user/hooks/useUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { CloudUpload, Delete } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { showToast } from "@/lib/utils/utils";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const profileSchema = z.object({
  first_name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  last_name: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
  username: z.string().min(1, "نام کاربری الزامی است"),
  student_number: z.string().optional(),
  biography: z.string().optional(),
  way_of_communication: z.string().optional(),
  research_fields: z.string().optional(),
  staff_id: z.string().optional(),
  resume_file: z.any().optional(),
}).refine((data) => {
  if (data.resume_file && data.resume_file.length > 0) {
    const file = data.resume_file[0];
    return file.type === "application/pdf" && file.size <= 1024 * 1024;
  }
  return true;
}, {
  message: "فایل باید PDF و حداکثر 1 مگابایت باشد",
  path: ["resume_file"],
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { useGetUserInfo, useUpdateUserInfo } = useUser();
  const { data: user, isLoading } = useGetUserInfo();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateUserInfo;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const [resumeFileName, setResumeFileName] = useState<string>("");

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        showToast.error("فقط فایل PDF مجاز است");
        return;
      }
      if (file.size > 1024 * 1024) {
        showToast.error("حجم فایل باید کمتر از 1 مگابایت باشد");
        return;
      }
      setResumeFileName(file.name);
      setValue("resume_file", file);
    }
  };

  const handleRemoveResume = async () => {
    try {
      await fetch("/api/students/remove-resume", {
        method: "POST",
      });
      setResumeFileName("");
      setValue("resume_file", null);
      showToast.success("رزومه با موفقیت حذف شد");
    } catch (error) {
      showToast.error("خطا در حذف رزومه");
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        student_number: user.student_number,
        biography: user.biography,
        way_of_communication: user.way_of_communication,
        research_fields: user.research_fields,
        staff_id: user.staff_id,
      });
    }
  }, [user, reset]);

  const validateFormData = (formData: FormData): boolean => {
    const resumeFile = formData.get('resume_file');
    if (resumeFile instanceof File) {
      if (resumeFile.size > 1024 * 1024) {
        showToast.error('حجم فایل باید کمتر از 1 مگابایت باشد');
        return false;
      }
      if (resumeFile.type !== 'application/pdf') {
        showToast.error('فقط فایل PDF مجاز است');
        return false;
      }
    }
    return true;
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const formData = new FormData();
      
      // Handle basic fields
      (Object.keys(data) as Array<keyof ProfileFormData>).forEach((key) => {
        if (key === "resume_file") {
          if (data[key] instanceof File) {
            formData.append("resume_file", data[key] as File);
          }
        } else if (data[key]) {
          formData.append(key, String(data[key]));
        }
      });

      // Log the FormData contents for debugging
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      if (!validateFormData(formData)) {
        return;
      }

      updateProfile(formData);
    } catch (error) {
      console.error('Form submission error:', error);
      showToast.error('خطا در ارسال فرم');
    }
  };

  if (isLoading) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          background: (theme) => theme.palette.background.paper,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ mb: 3, fontWeight: "bold" }}
        >
          پروفایل کاربری
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1, width: "100%" }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                required
                fullWidth
                id="first_name"
                label="نام"
                autoComplete="given-name"
                InputProps={{ sx: { borderRadius: 2 } }}
                dir="rtl"
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
                {...register("first_name")}
              />
              <TextField
                required
                fullWidth
                id="last_name"
                label="نام خانوادگی"
                autoComplete="family-name"
                InputProps={{ sx: { borderRadius: 2 } }}
                dir="rtl"
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
                {...register("last_name")}
              />
            </Stack>

            <TextField
              required
              fullWidth
              id="username"
              label="نام کاربری"
              autoComplete="username"
              InputProps={{ sx: { borderRadius: 2 } }}
              dir="rtl"
              error={!!errors.username}
              helperText={errors.username?.message}
              {...register("username")}
            />

            {user?.role === "student" && (
              <TextField
                fullWidth
                id="student_number"
                label="شماره دانشجویی"
                InputProps={{ sx: { borderRadius: 2 } }}
                dir="rtl"
                error={!!errors.student_number}
                helperText={errors.student_number?.message}
                {...register("student_number")}
              />
            )}
            {user?.role === "student" && (
              <TextField
                fullWidth
                id="biography"
                label="بیوگرافی"
                multiline
                rows={4}
                InputProps={{ sx: { borderRadius: 2 } }}
                dir="rtl"
                error={!!errors.biography}
                helperText={errors.biography?.message}
                {...register("biography")}
              />
            )}

            {user?.role === "instructor" && (
              <>
                <TextField
                  fullWidth
                  id="staff_id"
                  label="شماره پرسنلی"
                  InputProps={{
                    sx: { borderRadius: 2 },
                    readOnly: true,
                  }}
                  dir="rtl"
                  error={!!errors.staff_id}
                  helperText={errors.staff_id?.message}
                  {...register("staff_id")}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.action.disabledBackground,
                  }}
                />
                <TextField
                  fullWidth
                  id="way_of_communication"
                  label="روش‌های ارتباطی"
                  multiline
                  rows={2}
                  InputProps={{ sx: { borderRadius: 2 } }}
                  dir="rtl"
                  error={!!errors.way_of_communication}
                  helperText={errors.way_of_communication?.message}
                  {...register("way_of_communication")}
                  placeholder="لطفا روش‌های ارتباطی خود را وارد کنید (مثال: ایمیل، تلگرام، واتس‌اپ)"
                />
                <TextField
                  fullWidth
                  id="research_fields"
                  label="زمینه‌های تحقیقاتی"
                  multiline
                  rows={3}
                  InputProps={{ sx: { borderRadius: 2 } }}
                  dir="rtl"
                  error={!!errors.research_fields}
                  helperText={errors.research_fields?.message}
                  {...register("research_fields")}
                  placeholder="لطفا زمینه‌های تحقیقاتی خود را وارد کنید (با کاما جدا کنید)"
                />
              </>
            )}

            {user?.role === "student" && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  رزومه
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUpload />}
                    sx={{ borderRadius: 2 }}
                  >
                    آپلود رزومه
                    <VisuallyHiddenInput
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                  </Button>
                  {resumeFileName && (
                    <>
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {resumeFileName}
                      </Typography>
                      <IconButton onClick={handleRemoveResume} color="error">
                        <Delete />
                      </IconButton>
                    </>
                  )}
                </Stack>
                {errors.resume_file && (
                  <Typography color="error" variant="caption">
                    {errors.resume_file?.message?.toString()}
                  </Typography>
                )}
              </Box>
            )}
          </Stack>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isUpdating}
            sx={{
              mt: 3,
              mb: 2,
              borderRadius: 2,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: "bold",
              backgroundColor: (theme) => theme.palette.primary.main,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.dark,
              },
              "&:disabled": {
                backgroundColor: (theme) => theme.palette.action.disabled,
              },
            }}
          >
            {isUpdating ? "در حال بروزرسانی..." : "بروزرسانی پروفایل"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
