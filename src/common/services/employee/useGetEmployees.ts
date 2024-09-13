import { useQuery } from '@tanstack/react-query';
import { getAllEmployees } from './api';

export const useGetEmployees = () => {
  return useQuery({
    queryKey: ['employeeResult'],
    queryFn: async () => {
      const response = await getAllEmployees();
      return response;
    },
  });
};
