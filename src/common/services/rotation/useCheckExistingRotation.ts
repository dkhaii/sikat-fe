import { useQuery } from '@tanstack/react-query';
import { checkExistingRotation } from './api';

export const useCheckExistingRotation = (empID: string) => {
  return useQuery({
    queryKey: ['checkExistingRotationResult'],
    queryFn: async () => {
      const response = await checkExistingRotation(empID);
      return response;
    },
  });
};
