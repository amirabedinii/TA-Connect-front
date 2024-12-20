"use client";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Paper,
  Stack,
} from "@mui/material";
import NextLink from "next/link";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showToast } from "@/lib/utils/utils";

const signupSchema = z.object({
  first_name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  last_name: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
  username: z.string().min(1, "نام کاربری الزامی است"),
  student_number: z.string().min(1, "شماره دانشجویی الزامی است"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
  password_confirmation: z.string().min(6, "تکرار رمز عبور باید حداقل ۶ کاراکتر باشد")
}).refine((data) => data.password === data.password_confirmation, {
  message: "رمز عبور و تکرار آن باید یکسان باشند",
  path: ["password_confirmation"],
});

type SignUpFormData = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const { useSignUp } = useAuth();
  const { mutate, isPending } = useSignUp();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      mutate(data, {
        onSuccess: (data) => {
          router.push("/login");
          showToast.success("برای ادامه دادن وارد حساب کاربری خود شوید");
        },
        onError: (error) => {
          setError("root", {
            message: error.message || "خطا در ثبت‌نام",
          });
        },
      });
    } catch (err) {
      showToast.error("خطا در ثبت‌نام");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
          ثبت‌نام
        </Typography>

        {errors.root && (
          <Typography color="error" sx={{ mb: 2 }}>
            {errors.root.message}
          </Typography>
        )}

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1, width: "100%" }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="first_name"
                label="نام"
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
            <TextField
              required
              fullWidth
              id="student_number"
              label="شماره دانشجویی"
              InputProps={{ sx: { borderRadius: 2 } }}
              dir="rtl"
              error={!!errors.student_number}
              helperText={errors.student_number?.message}
              {...register("student_number")}
            />
            <TextField
              required
              fullWidth
              label="رمز عبور"
              type="password"
              id="password"
              autoComplete="new-password"
              InputProps={{ sx: { borderRadius: 2 } }}
              dir="rtl"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
            />
            <TextField
              required
              fullWidth
              label="تکرار رمز عبور"
              type="password"
              id="password_confirmation"
              autoComplete="new-password"
              InputProps={{ sx: { borderRadius: 2 } }}
              dir="rtl"
              error={!!errors.password_confirmation}
              helperText={errors.password_confirmation?.message}
              {...register("password_confirmation")}
            />
          </Stack>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
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
            {isSubmitting ? "در حال ثبت‌نام..." : "ثبت‌نام"}
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <Link
              component={NextLink}
              href="/login"
              variant="body1"
              sx={{
                textDecoration: "none",
                color: (theme) => theme.palette.primary.main,
                "&:hover": {
                  textDecoration: "underline",
                  color: (theme) => theme.palette.primary.light,
                },
              }}
            >
              قبلاً ثبت‌نام کرده‌اید؟ وارد شوید
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
