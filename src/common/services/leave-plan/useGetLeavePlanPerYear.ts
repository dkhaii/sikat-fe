import { useQuery } from '@tanstack/react-query';
import { showLeavePlanPerYear } from './api';

export const useGetLeavePlanPerYear = () => {
  return useQuery({
    queryKey: ['LeavePlanResult'],
    queryFn: async () => {
      const response = await showLeavePlanPerYear();
      return response;
    },
  });
};
