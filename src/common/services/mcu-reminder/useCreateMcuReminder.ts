import { useMutation } from '@tanstack/react-query';
import { McuReminderDto } from './types';
import { createMcuReminder } from './api';

export const useCreateMcuReminder = (
  onSuccess: () => void,
  onError: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: async (payload: McuReminderDto) => {
      const response = await createMcuReminder(payload);
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
