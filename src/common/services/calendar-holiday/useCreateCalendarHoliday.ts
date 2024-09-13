import { useMutation } from '@tanstack/react-query';
import { CalendarHolidayRequest } from './types';
import { createCalendarHoliday } from './api';

export const useCreateCalendarHoliday = (
  onSuccess: () => void,
  onError: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: async (payload: CalendarHolidayRequest) => {
      const response = await createCalendarHoliday(payload);
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
