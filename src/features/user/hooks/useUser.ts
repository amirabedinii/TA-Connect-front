import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientFetch } from '@/lib/api/clientApi';
import { showToast } from '@/lib/utils/utils';
import { User, UserError } from '../types/user.types';
import { Student } from '@/features/course/types/course.types';

export const useUser = () => {
  const queryClient = useQueryClient();

  const useGetUserInfo = () => useQuery<User, UserError>({
    queryKey: ['profile'],
    queryFn: () => clientFetch.get('/auth/users/me/'),
  });

  const useUpdateUserInfo = useMutation<User, UserError, Partial<User>>({
    mutationFn: (userData) => clientFetch.put('/auth/users/me/', userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      showToast.success('پروفایل با موفقیت بروزرسانی شد');
    },
    // onError: (error) => {
    //   showToast.error(error.message || 'خطا در بروزرسانی پروفایل');
    // },
  });

  const useGetStudentDetails = (studentId: string) =>
    useQuery<Student, Error, Student>({
      queryKey: ["student", studentId],
      queryFn: async () => {
        const response = await clientFetch.get<Student>(`/user/profile/student/${studentId}/`);
        return response;
      },
      enabled: !!studentId,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    });

  return {
    useGetUserInfo,
    useUpdateUserInfo,
    useGetStudentDetails,
  };
}; 