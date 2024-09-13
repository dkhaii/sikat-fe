import { useQuery } from '@tanstack/react-query';
import { getMcuReminder } from './api';

export const useGetMcuReminder = () => {
  return useQuery({
    queryKey: ['useGetMcuReminderResult'],
    queryFn: async () => {
      const response = await getMcuReminder();
      return response;
    },
  });
};
