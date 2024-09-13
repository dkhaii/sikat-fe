import { useMutation } from '@tanstack/react-query';
import { AddNewEmployeeRequest } from './types';
import { editEmployee } from './api';

export const useEditEmployee = (
  id: string,
  onSuccess: () => void,
  onError: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const payload: Partial<AddNewEmployeeRequest> = {
        name: formData.get('name') as string,
        profilePicture: formData.get('profilePicture') as File,
        dateOfBirth: formData.get('dateOfBirth') as string,
        dateOfHire: formData.get('dateOfHire') as string,
        positionID: formData.get('positionID') as string,
        crewID: formData.get('crewID') as string,
        pitID: formData.get('pitID') as string,
        baseID: formData.get('baseID') as string,
      };

      const response = await editEmployee(id, payload);
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
