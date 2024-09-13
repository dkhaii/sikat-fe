import { useMutation } from '@tanstack/react-query';
import { AddNewEmployeeRequest } from './types';
import { addNewEmployee } from './api';

export const useAddEmployee = (
  onSuccess: () => void,
  onError: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const empPayload: AddNewEmployeeRequest = {
        id: formData.get('id') as string,
        name: formData.get('name') as string,
        profilePicture: formData.get('profilePicture') as File,
        dateOfBirth: formData.get('dateOfBirth') as string,
        dateOfHire: formData.get('dateOfHire') as string,
        positionID: formData.get('positionID') as string,
        crewID: formData.get('crewID') as string,
        pitID: formData.get('pitID') as string,
        baseID: formData.get('baseID') as string,
      };

      const effectiveDate = formData.get('effectiveDate') as string;

      // console.log('ini payload hook add employee: ', empPayload);
      // console.log('ini payload hook effective date: ', effectiveDate);

      const response = await addNewEmployee(empPayload, effectiveDate);
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
