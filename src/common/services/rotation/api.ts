import { axiosInstance } from '../../axios';
import { WebResponse } from '../../types/WebResponse';
import { authorization } from '../authorization';
import { CreateRotationRequest, Rotation } from './types';

const URL_GROUP = '/auth/rotation';

export const createRotation = async (
  empID: string,
  payload: CreateRotationRequest
) => {
  const response = await axiosInstance.post<
    WebResponse<{ rotation: Rotation }>
  >(`${URL_GROUP}/set/${empID}`, payload, {
    headers: {
      ...authorization(),
      'Access-Control-Allow-Origin': '*',
    },
  });

  // console.log('createRotation: ', response);

  return response.data.data?.rotation;
};

export const checkExistingRotation = async (empID: string) => {
  const response = await axiosInstance.get<
    WebResponse<{ existingRotation: boolean }>
  >(`${URL_GROUP}/check-existing/${empID}`, {
    headers: {
      ...authorization(),
      'Access-Control-Allow-Origin': '*',
    },
  });

  // console.log('checkExisting: ', response);

  return response.data.data?.existingRotation;
};

export const getRotationByID = async (empID: string) => {
  const response = await axiosInstance.get<WebResponse<{ rotation: Rotation }>>(
    `${URL_GROUP}/find-one/${empID}`,
    {
      headers: {
        ...authorization(),
        'Access-Control-Allow-Origin': '*',
      },
    }
  );

  // console.log('getRotationByID: ', response);

  return response.data.data?.rotation;
};

export const updateRotation = async (
  empID: string,
  payload: Partial<CreateRotationRequest>
) => {
  const response = await axiosInstance.patch<
    WebResponse<{ rotation: Rotation }>
  >(`${URL_GROUP}/update/${empID}`, payload, {
    headers: {
      ...authorization(),
      'Access-Control-Allow-Origin': '*',
    },
  });

  // console.log('updateRotation: ', response);

  return response;
};
