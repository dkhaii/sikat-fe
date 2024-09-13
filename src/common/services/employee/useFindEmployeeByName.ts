import { useQuery } from '@tanstack/react-query';
import { findEmployeeByName } from './api';

export const useFindEmployeeByName = (name: string) => {
  return useQuery({
    queryKey: ['employeeFindByNameResult'],
    queryFn: async () => {
      const response = await findEmployeeByName(name);
      return response;
    },
    enabled: false,
  });
};
