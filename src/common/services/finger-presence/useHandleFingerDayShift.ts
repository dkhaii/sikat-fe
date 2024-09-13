import { useQuery } from '@tanstack/react-query';
import { handleFingerDayShift } from './api';

export const useHandleFingerDayShift = () => {
  return useQuery({
    queryKey: ['HandleFingerDayShiftResult'],
    queryFn: async () => {
      const response = await handleFingerDayShift();
      return response;
    },
  });
};
