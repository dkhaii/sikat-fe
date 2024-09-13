import { axiosInstance } from '../../axios';
import { WebResponse } from '../../types/WebResponse';
import { authorization } from '../authorization';
import { UserAPP } from './types';

const URL_GROUP = '/auth/users';

export const createUserApp = async (payload: UserAPP) => {
  const response = await axiosInstance.post<WebResponse<{ user: UserAPP }>>(
    `${URL_GROUP}/create`,
    payload,
    { headers: { ...authorization(), 'Access-Control-Allow-Origin': '*' } }
  );

  return response.data.data?.user;
};
