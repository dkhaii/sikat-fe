import { useQuery } from '@tanstack/react-query';
import { showDayShiftFingerData } from './api';

export const useGetDayShiftFingerData = () => {
  return useQuery({
    queryKey: ['GetDayShiftFingerDataResult'],
    queryFn: async () => {
      const response = await showDayShiftFingerData();
      return response;
    },
    refetchInterval: 10000,
  });
};
