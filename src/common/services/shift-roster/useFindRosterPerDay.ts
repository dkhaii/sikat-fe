import { useQuery } from '@tanstack/react-query';
import { findRosterPerDay } from './api';

export const useFindRosterPerDay = (date: string, crewID: number) => {
  return useQuery({
    queryKey: ['FindRosterPerDayResult'],
    queryFn: async () => {
      // console.log('useFindRosterPerDay: ', date);

      const response = await findRosterPerDay(date, crewID);
      return response;
    },
    enabled: !!date && !!crewID,
  });
};
