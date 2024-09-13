import { useQuery } from '@tanstack/react-query';
import { getRosterPerDay } from './api';

export const useGetRosterPerDay = () => {
  return useQuery({
    queryKey: ['RosterPerDayResult'],
    queryFn: async () => {
      const response = await getRosterPerDay();
      return response;
    },
  });
};
