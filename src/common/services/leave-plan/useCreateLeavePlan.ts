// useCreateLeavePlan.ts

import { useMutation } from '@tanstack/react-query';
import { CreateLeavePlanRequest } from './types';
import { createLeavePlan } from './api';

export const useCreateLeavePlan = (
  onSuccess: () => void,
  onError: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const payload: CreateLeavePlanRequest = {
        employeeID: formData.get('employeeID') as string,
        startDate: formData.get('startDate') as string,
        endDate: formData.get('endDate') as string,
        leaveStatusID: formData.get('leaveStatusID') as string,
        formCuti: formData.get('formCuti') as File,
      };

      const response = await createLeavePlan(payload);
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
