import { axiosInstance } from '../../axios';
import { WebResponse } from '../../types/WebResponse';
import { authorization } from '../authorization';
import { McuReminder, McuReminderDto } from './types';

// const URL_GROUP = '/auth/mcu-reminder';

export const createMcuReminder = async (payload: McuReminderDto) => {
  const response = await axiosInstance.post<
    WebResponse<{ mcuReminder: McuReminder }>
  >(`auth/mcu-reminder/create`, payload, {
    headers: {
      ...authorization(),
      'Access-Control-Allow-Origin': '*',
    },
  });

  // console.log('createMcuReminder: ', response.data.data?.mcuReminder);

  return response.data.data?.mcuReminder;
};

export const getMcuReminder = async () => {
  const response = await axiosInstance.get<
    WebResponse<{ mcuReminder: McuReminder[] }>
  >(`mcu-reminder/get-reminder`, {
    headers: {
      ...authorization(),
      'Access-Control-Allow-Origin': '*',
    },
  });

  // console.log('getMcuReminder: ', response.data.data?.mcuReminder);

  return response.data.data?.mcuReminder;
};

export const editMcuReminder = async (mcuID: number, date: string) => {
  const response = await axiosInstance.patch<
    WebResponse<{ mcuReminder: McuReminder }>
  >(`auth/mcu-reminder/update/${mcuID}`, date, {
    headers: { ...authorization(), 'Access-Control-Allow-Origin': '*' },
  });

  // console.log('editMcuReminder', response.data.data?.mcuReminder);

  return response.data.data?.mcuReminder;
};

export const deleteMcuReminder = async (mcuID: number) => {
  const response = await axiosInstance.delete<
    WebResponse<{ mcuReminder: McuReminder }>
  >(`auth/mcu-reminder/delete/${mcuID}`, {
    headers: { ...authorization(), 'Access-Control-Allow-Origin': '*' },
  });

  // console.log('deleteMcuReminder: ', response.data.data?.mcuReminder);

  return response.data.data?.mcuReminder;
};
