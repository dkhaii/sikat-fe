import { useQuery } from '@tanstack/react-query';
import { handleFingerNightShift } from './api';

export const useHandleFingerNightShift = () => {
  return useQuery({
    queryKey: ['HandleFingerDayShiftResult'],
    queryFn: async () => {
      const response = await handleFingerNightShift();
      return response;
    },
  });
};
