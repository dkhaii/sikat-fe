import { useMutation } from '@tanstack/react-query';
import { CreateRotationRequest } from './types';
import { createRotation } from './api';

export const useCreateRotation = (
  empID: string,
  onSuccess: () => void,
  onError: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: async (payload: CreateRotationRequest) => {
      const response = await createRotation(empID, payload);
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
