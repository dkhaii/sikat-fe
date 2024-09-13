import { useQuery } from '@tanstack/react-query';
import { getLeavePlanByID } from './api';

export const useGetLeavePlanByID = (id: number) => {
  return useQuery({
    queryKey: ['LeavePlanByIDResult'],
    queryFn: async () => {
      const response = await getLeavePlanByID(id);
      return response;
    },
  });
};
