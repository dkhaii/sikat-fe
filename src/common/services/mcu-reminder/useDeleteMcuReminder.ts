import { useMutation } from '@tanstack/react-query';
import { deleteMcuReminder } from './api';

export const useDeleteMcuReminder = (
  onSuccess: () => void,
  onError: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: async (mcuID: number) => {
      const response = await deleteMcuReminder(mcuID);
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
