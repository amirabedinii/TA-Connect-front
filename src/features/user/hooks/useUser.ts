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
    mutationFn: async (userData) => {
      try {
        // Log what we're sending to the server
        console.log('Sending to server:');
        for (const pair of userData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }

        const response = await clientFetch.put<User>('/auth/users/me/', userData);
        return response;
      } catch (error: any) {
        console.error('Update profile error:', {
          error,
          response: error.response,
          data: error.response?.data
        });

        // Throw a structured error
        throw {
          message: error.response?.data?.detail || 
                  error.response?.data?.message || 
                  error.message || 
                  'خطا در بروزرسانی پروفایل',
          status: error.response?.status || 500,
          response: error.response
        };
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      showToast.success('پروفایل با موفقیت بروزرسانی شد');
    },
    onError: (error: UserError) => {
      console.error('Profile update failed:', error);
      showToast.error(error.message);
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
    window.open(`${process.env.NEXT_PUBLIC_API_BASE_URL}/faculty/students/${studentId}/download_file/`, '_blank');
  };

  return {
    useGetUserInfo,
    useUpdateUserInfo,
    useGetStudentDetails,
    downloadStudentResume, // Export the new function
  };
}; 