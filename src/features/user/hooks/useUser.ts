import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientFetch } from '@/lib/api/clientApi';
import { showToast } from '@/lib/utils/utils';
import { User, UserError } from '../types/user.types';

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

  return {
    useGetUserInfo,
    useUpdateUserInfo,
  };
}; 