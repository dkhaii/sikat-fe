import { useMutation } from '@tanstack/react-query';
import { CreateLeavePlanRequest } from './types';
import { editLeavePlan } from './api';

export const useEditLeavePlan = (
  id: number,
  empID: string,
  onSuccess: () => void,
  onError: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const payload: Partial<CreateLeavePlanRequest> = {
        startDate: formData.get('startDate') as string,
        endDate: formData.get('endDate') as string,
        leaveStatusID: formData.get('leaveStatusID') as string,
        formCuti: formData.get('formCuti') as File,
      };

      const response = await editLeavePlan(id, empID, payload);
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
