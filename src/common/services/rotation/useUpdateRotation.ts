import { useMutation } from '@tanstack/react-query';
import { CreateRotationRequest } from './types';
import { updateRotation } from './api';

export const useUpdateRotation = (
  empID: string,
  onSuccess: () => void,
  onError: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: async (paylaod: Partial<CreateRotationRequest>) => {
      const response = await updateRotation(empID, paylaod);
      return response;
    },
    onSuccess: () => {
      onSuccess();
    },
    onError: (error) => {
      onError(error);
    },
  });
};
