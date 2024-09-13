import { axiosInstance } from '../../axios';
import { WebResponse } from '../../types/WebResponse';
import { ShiftRoster, ShiftRosterSteadyDay } from './types';

const URL_GROUP = '/shift-roster';

export const showAllRoster = async () => {
  const response = await axiosInstance.get<
    WebResponse<{ shiftRoster: ShiftRoster[] }>
  >(`${URL_GROUP}`, {
    headers: { 'Access-Control-Allow-Origin': '*' },
  });

  // console.log(response.data.data?.shiftRoster);

  return response.data.data?.shiftRoster;
};

export const getRosterPerDay = async () => {
  const response = await axiosInstance.get<
    WebResponse<{ shiftRoster: ShiftRoster[] }>
  >(`${URL_GROUP}/get-roster-perday`, {
    headers: { 'Access-Control-Allow-Origin': '*' },
  });

  // console.log(response.data.data?.shiftRoster);

  return response.data.data?.shiftRoster;
};

export const getSteadyDayRosterPerDay = async () => {
  const response = await axiosInstance.get<
    WebResponse<{ shiftRoster: ShiftRosterSteadyDay[] }>
  >(`${URL_GROUP}/get-stdroster-perday`, {
    headers: { 'Access-Control-Allow-Origin': '*' },
  });

  // console.log(response.data.data?.shiftRoster);

  return response.data.data?.shiftRoster;
};

export const findRosterPerDay = async (date: string, crewID: number) => {
  console.log('findRosterPerDay: ', date);
  console.log('findRosterPerDay: ', crewID);

  const response = await axiosInstance.get<
    WebResponse<{ shiftRoster: ShiftRoster }>
  >(`${URL_GROUP}/find-roster-perday/${date}/${crewID}`, {
    headers: { 'Access-Control-Allow-Origin': '*' },
  });

  // console.log(response.data.data?.shiftRoster);

  return response.data.data?.shiftRoster;
};

export const findSteadyDayRosterPerDay = async (date: string) => {
  console.log('findRosterPerDay: ', date);

  const response = await axiosInstance.get<
    WebResponse<{ shiftRoster: ShiftRosterSteadyDay }>
  >(`${URL_GROUP}/find-roster-perday-steady-day/${date}`, {
    headers: { 'Access-Control-Allow-Origin': '*' },
  });

  // console.log(response.data.data?.shiftRoster);

  return response.data.data?.shiftRoster;
};
