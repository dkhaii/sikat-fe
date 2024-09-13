import { useQuery } from '@tanstack/react-query';
import { getSteadyDayRosterPerDay } from './api';

export const useGetSteadyDayRosterPerDay = () => {
  return useQuery({
    queryKey: ['RosterSteadyDayPerDayResult'],
    queryFn: async () => {
      const response = await getSteadyDayRosterPerDay();
      return response;
    },
  });
};
