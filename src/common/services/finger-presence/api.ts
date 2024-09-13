import { axiosInstance } from '../../axios';
import { WebResponse } from '../../types/WebResponse';
import { FingerData, FingerPresence } from './types';

const URL_GROUP = '/finger-presence';

export const pollFingerData = async () => {
  const response = await axiosInstance.post<WebResponse<void>>(
    `${URL_GROUP}/poll-finger-data`,
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  );

  // console.log('pollFingerData: ', response);

  return response.data;
};

export const handleFingerDayShift = async () => {
  const response = await axiosInstance.post<
    WebResponse<{
      createdFingerDayShift: FingerPresence[];
      removedFingerDayShift: FingerPresence[];
    }>
  >(
    `${URL_GROUP}/finger-day-shift`,
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  );

  // console.log('handleFingerDayShift: ', response);

  return response.data.data;
};

export const handleFingerNightShift = async () => {
  const response = await axiosInstance.post<
    WebResponse<{
      createdFingerNightShift: FingerPresence[];
      removedFingerNightShift: FingerPresence[];
    }>
  >(
    `${URL_GROUP}/finger-night-shift`,
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  );

  // console.log('handleFingerNightShift: ', response);

  return response.data.data;
};

export const showDayShiftFingerData = async () => {
  const response = await axiosInstance.get<
    WebResponse<{ dayShiftFingerData: FingerData[] }>
  >(`${URL_GROUP}/get-finger-day-shift`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });

  // console.log('showDayShiftFingerData: ', response);

  return response.data.data?.dayShiftFingerData;
};

export const showNightShiftFingerData = async () => {
  const response = await axiosInstance.get<
    WebResponse<{ nightShiftFingerData: FingerData[] }>
  >(`${URL_GROUP}/get-finger-night-shift`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });

  // console.log('showNightShiftFingerData: ', response);

  return response.data.data?.nightShiftFingerData;
};
