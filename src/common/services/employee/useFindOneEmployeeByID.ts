import { useQuery } from '@tanstack/react-query';
import { findOneEmployeeByID } from './api';

export const useFindOneEmployeeByID = (id: string) => {
  return useQuery({
    queryKey: ['employeeFindOneByIDResult'],
    queryFn: async () => {
      const response = await findOneEmployeeByID(id);
      return response;
    },
  });
};
