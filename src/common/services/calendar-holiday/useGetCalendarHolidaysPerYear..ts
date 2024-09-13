import { useQuery } from '@tanstack/react-query';
import { getCalendarHolidaysPerYear } from './api';

export const useGetCalendarHolidayPerYear = () => {
  return useQuery({
    queryKey: ['CalendarHolidayResult'],
    queryFn: async () => {
      const response = await getCalendarHolidaysPerYear();
      return response;
    },
  });
};
