"use client";

import { Box, Button, Container, TextField, Typography, Link, Paper, Stack } from '@mui/material';
import NextLink from 'next/link';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { showToast } from '@/lib/utils/utils';

const signupSchema = z.object({
  firstName: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد'),
  lastName: z.string().min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد'),
  email: z.string().email('ایمیل نامعتبر است'),
  password: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
  username: z.string().min(1, 'نام کاربری الزامی است'),
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
        onSuccess: () => {
          router.push('/login');
        },
        onError: (error) => {
          setError('root', {
            message: error.message || 'خطا در ثبت‌نام',
          });
        },
      });
    } catch (err) {
      showToast.error('خطا در ثبت‌نام');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
          background: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
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
          sx={{ mt: 1, width: '100%' }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="firstName"
                label="نام"
                InputProps={{ sx: { borderRadius: 2 } }}
                dir="rtl"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                {...register('firstName')}
              />
              <TextField
                required
                fullWidth
                id="lastName"
                label="نام خانوادگی"
                autoComplete="family-name"
                InputProps={{ sx: { borderRadius: 2 } }}
                dir="rtl"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                {...register('lastName')}
              />
            </Stack>
            <TextField
              required
              fullWidth
              id="email"
              label="ایمیل"
              autoComplete="email"
              InputProps={{ sx: { borderRadius: 2 } }}
              dir="rtl"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email')}
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
              {...register('password')}
            />
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
              {...register('username')}
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
              fontSize: '1.1rem',
              fontWeight: 'bold',
            }}
          >
            {isSubmitting ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link 
              component={NextLink} 
              href="/login" 
              variant="body1"
              sx={{ 
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
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
