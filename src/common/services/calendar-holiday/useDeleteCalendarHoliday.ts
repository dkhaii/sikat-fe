import { useMutation } from '@tanstack/react-query';
import { deleteCalendarHoliday } from './api';

export const useDeleteCalendarHoliday = (
  onSuccess: () => void,
  onError: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await deleteCalendarHoliday(id);
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
