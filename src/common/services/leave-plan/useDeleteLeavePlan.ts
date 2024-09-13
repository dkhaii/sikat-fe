import { useMutation } from '@tanstack/react-query';
import { deleteLeavePlan } from './api';

export const useDeleteLeavePlan = (
  onSuccess: () => void,
  onError: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await deleteLeavePlan(id);
      return response;
    },
    onSuccess: () => {
      onSuccess();
    },
    onError: (error) => {
      onError(error);
    },
  });
};
