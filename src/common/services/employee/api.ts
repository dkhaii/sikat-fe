import { axiosInstance } from '../../axios';
import { WebResponse } from '../../types/WebResponse';
import { authorization } from '../authorization';
import { AddNewEmployeeRequest, Employee } from './types';

const URL_GROUP = '/auth/employees';

export const getAllEmployees = async () => {
  const response = await axiosInstance.get<
    WebResponse<{ employee: Employee[] }>
  >(`${URL_GROUP}`, {
    headers: {
      ...authorization(),
      'Access-Control-Allow-Origin': '*',
    },
  });

  console.log('api response all employees: ', response);

  return response.data.data?.employee;
};

export const findEmployeeByName = async (name: string) => {
  const response = await axiosInstance.get<
    WebResponse<{ employee: Employee[] }>
  >(`${URL_GROUP}/find?name=${name}`, {
    headers: {
      ...authorization(),
      'Access-Control-Allow-Origin': '*',
    },
  });

  return response.data.data?.employee;
};

export const addNewEmployee = async (
  empPayload: AddNewEmployeeRequest,
  effectiveDate: string
) => {
  const formData = new FormData();

  formData.append('id', empPayload.id);
  formData.append('name', empPayload.name);
  formData.append('dateOfBirth', empPayload.dateOfBirth);
  formData.append('dateOfHire', empPayload.dateOfHire);
  formData.append('positionID', empPayload.positionID);

  if (empPayload.crewID) {
    formData.append('crewID', empPayload.crewID);
  }

  if (empPayload.pitID) {
    formData.append('pitID', empPayload.pitID);
  }

  if (empPayload.baseID) {
    formData.append('baseID', empPayload.baseID);
  }

  if (empPayload.profilePicture) {
    formData.append(
      'profilePicture',
      empPayload.profilePicture,
      empPayload.profilePicture.name
    );
  }

  formData.append('effectiveDate', effectiveDate);

  // console.log('add new employee API: ', formData);

  const headers = {
    ...authorization(),
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
  };

  const response = await axiosInstance.post<
    WebResponse<{ employee: Employee }>
  >(`${URL_GROUP}/add`, formData, {
    headers,
  });

  // console.log('response add new employee: ', response);

  return response.data.data?.employee;
};

export const editEmployee = async (
  id: string,
  payload: Partial<AddNewEmployeeRequest>
) => {
  const formData = new FormData();

  if (payload.name) {
    formData.append('name', payload.name);
  }

  if (payload.profilePicture) {
    formData.append('dateOfBirth', payload.profilePicture);
  }

  if (payload.dateOfHire) {
    formData.append('dateOfHire', payload.dateOfHire);
  }

  if (payload.positionID) {
    formData.append('positionID', payload.positionID);
  }

  if (payload.crewID) {
    formData.append('crewID', payload.crewID);
  }

  if (payload.pitID) {
    formData.append('crewID', payload.pitID);
  }

  if (payload.baseID) {
    formData.append('crewID', payload.baseID);
  }

  const headers = {
    ...authorization(),
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
  };

  const response = await axiosInstance.patch<
    WebResponse<{ employee: Employee }>
  >(`${URL_GROUP}/update/${id}`, payload, {
    headers,
  });

  return response.data.data?.employee;
};

export const findOneEmployeeByID = async (id: string) => {
  const response = await axiosInstance.get<WebResponse<{ employee: Employee }>>(
    `${URL_GROUP}/find/${id}`,
    {
      headers: {
        ...authorization(),
        'Access-Control-Allow-Origin': '*',
      },
    }
  );

  return response.data.data?.employee;
};

export const getProfilePictureUrl = async (
  folder: string,
  fileName: string
) => {
  const headers = {
    ...authorization(),
    'Content-Type': 'image/jpeg',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    const response = await axiosInstance.get<WebResponse<{ url: string }>>(
      `${URL_GROUP}/get-file-url/${folder}/${fileName}`,
      { headers }
    );

    return response.data.data?.url;
  } catch (error) {
    // console.error('Error getting file URL:', error);
    throw new Error('Failed to get file URL');
  }
};
