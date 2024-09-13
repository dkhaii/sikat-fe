import { useQuery } from '@tanstack/react-query';
import { showAllRoster } from './api';

export const useGetAllRoster = () => {
  return useQuery({
    queryKey: ['RosterResult'],
    queryFn: async () => {
      const response = await showAllRoster();
      return response;
    },
  });
};
