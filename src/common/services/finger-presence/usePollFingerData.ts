import { useMutation } from '@tanstack/react-query';
import { pollFingerData } from './api';

export const usePollFingerData = (
  onSuccess: () => void,
  onError: () => void
) => {
  return useMutation({
    mutationFn: async () => {
      const response = await pollFingerData();
      return response;
    },
    onSuccess,
    onError,
  });
};
