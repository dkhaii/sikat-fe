import { useMutation } from '@tanstack/react-query';
import { approveLeavePlan } from './api';

export const useApproveLeavePlan = (
  onSuccess: () => void,
  onError: () => void
) => {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await approveLeavePlan(id);
      return response;
    },
    onSuccess,
    onError,
  });
};
