import { axiosInstance } from '../../axios';
import { WebResponse } from '../../types/WebResponse';
import { authorization } from '../authorization';
import { CalendarHoliday, CalendarHolidayRequest } from './types';

export const getCalendarHolidaysPerYear = async () => {
  const response = await axiosInstance.get<
    WebResponse<{ calendarHoliday: CalendarHoliday[] }>
  >('/calendar-holiday/show-per-year', {
    headers: {
      ...authorization(),
      'Access-Control-Allow-Origin': '*',
    },
  });

  return response.data.data?.calendarHoliday;
};

export const createCalendarHoliday = async (
  payload: CalendarHolidayRequest
) => {
  const response = await axiosInstance.post<
    WebResponse<{ calendarHoliday: CalendarHoliday }>
  >('/auth/calendar-holiday/create', payload, {
    headers: {
      ...authorization(),
      'Access-Control-Allow-Origin': '*',
    },
  });

  // console.log('createCalendarHoliday: ', response);

  return response.data.data?.calendarHoliday;
};

export const deleteCalendarHoliday = async (id: number) => {
  const response = await axiosInstance.delete<
    WebResponse<{ calendarHoliday: CalendarHoliday }>
  >(`/auth/calendar-holiday/delete-day/${id}`, {
    headers: {
      ...authorization(),
      'Access-Control-Allow-Origin': '*',
    },
  });

  // console.log('deleteCalendarHoliday: ', response);

  return response.data.data?.calendarHoliday;
};
