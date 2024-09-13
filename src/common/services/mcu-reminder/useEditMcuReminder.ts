import { useMutation } from '@tanstack/react-query';
import { editMcuReminder } from './api';

export const useEditMcuReminder = (
  mcuID: number,
  onSuccess: () => void,
  onError: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: async (payload: { date: string }) => {
      const response = await editMcuReminder(mcuID, payload.date);
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
