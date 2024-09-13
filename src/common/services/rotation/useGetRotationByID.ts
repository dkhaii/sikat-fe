import { useQuery } from '@tanstack/react-query';
import { getRotationByID } from './api';

export const useGetRotationByID = (empID: string) => {
  return useQuery({
    queryKey: ['getRotationByIDResult'],
    queryFn: async () => {
      const response = await getRotationByID(empID);
      return response;
    },
  });
};
