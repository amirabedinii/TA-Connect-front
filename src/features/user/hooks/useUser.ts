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

  const useUpdateUserInfo = useMutation<User, UserError, FormData>({
    mutationFn: (userData) => clientFetch.put('/auth/users/me/', userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      showToast.success('پروفایل با موفقیت بروزرسانی شد');
    },
    onError: (error) => {
      console.error('Profile update error:', error);
      showToast.error(error.message || 'خطا در بروزرسانی پروفایل');
    },
  });

  const useGetStudentDetails = (studentId: string) =>
    useQuery<Student, Error, Student>({
      queryKey: ["student", studentId],
      queryFn: async () => {
        const response = await clientFetch.get<Student>(`/faculty/students/${studentId}/`);
        return response;
      },
      enabled: !!studentId,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    });

  // Add a new function for resume download
  const downloadStudentResume = async (studentId: string) => {
    window.open(`${process.env.NEXT_PUBLIC_API_BASE_URL}/faculty/students/${studentId}/download-resume/`, '_blank');
  };

  return {
    useGetUserInfo,
    useUpdateUserInfo,
    useGetStudentDetails,
    downloadStudentResume, // Export the new function
  };
}; 