import { useMutation } from '@tanstack/react-query';
import { UserAPP } from './types';
import { createUserApp } from './api';

export const useCreateUserApp = (
  onSuccess: () => void,
  onError: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: async (payload: UserAPP) => {
      const response = await createUserApp(payload);
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
