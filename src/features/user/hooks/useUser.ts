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

  // Update the download function to include authentication
  const downloadStudentResume = async (studentId: string) => {
    try {
      // Get the access token from localStorage or wherever you store it
      const token = localStorage.getItem('access_token');
      
      // Create a fetch request with the authorization header
      const response = await clientFetch.get(`/faculty/students/${studentId}/download_file/`
      );

      // if (!response.ok) {
      //   throw new Error('Failed to download file');
      // }

      // Create a blob from the response and download it
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `resume_${studentId}.pdf`; // or get filename from response headers if available
      // document.body.appendChild(a);
      // a.click();
      // window.URL.revokeObjectURL(url);
      // document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      showToast.error('خطا در دانلود فایل');
      throw error;
    }
  };

  return {
    useGetUserInfo,
    useUpdateUserInfo,
    useGetStudentDetails,
    downloadStudentResume, // Export the new function
  };
}; 