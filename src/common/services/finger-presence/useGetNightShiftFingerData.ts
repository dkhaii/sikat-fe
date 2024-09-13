import { useQuery } from '@tanstack/react-query';
import { showNightShiftFingerData } from './api';

export const useGetNightShiftFingerData = () => {
  return useQuery({
    queryKey: ['GetNightShiftFingerDataResult'],
    queryFn: async () => {
      const response = await showNightShiftFingerData();
      return response;
    },
    refetchInterval: 60000,
  });
};
