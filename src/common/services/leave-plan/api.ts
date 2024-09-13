import { saveAs } from 'file-saver';
import { axiosInstance } from '../../axios';
import { WebResponse } from '../../types/WebResponse';
import { authorization } from '../authorization';
import { getFileNameFromResponse } from '../helper';
import { CreateLeavePlanRequest, LeavePlan } from './types';

const URL_GROUP = '/auth/leave-plan';

export const showLeavePlanPerYear = async () => {
  const response = await axiosInstance.get<
    WebResponse<{ leavePlanData: LeavePlan[] }>
  >(`${URL_GROUP}/show/per-year`, {
    headers: {
      ...authorization(),
      'Access-Control-Allow-Origin': '*',
    },
  });

  // console.log('showLeavePlanPerYear: ', response.data.data?.leavePlanData);

  return response.data.data?.leavePlanData || [];
};

export const createLeavePlan = async (payload: CreateLeavePlanRequest) => {
  const formData = new FormData();
  formData.append('employeeID', payload.employeeID.toString());
  formData.append('startDate', payload.startDate);
  formData.append('endDate', payload.endDate);
  formData.append('leaveStatusID', payload.leaveStatusID.toString());

  if (payload.formCuti) {
    formData.append('formCuti', payload.formCuti, payload.formCuti.name);
  }

  const headers = {
    ...authorization(),
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
  };

  const response = await axiosInstance.post<
    WebResponse<{ leavePlan: LeavePlan }>
  >(`${URL_GROUP}/book`, payload, { headers });

  // console.log('createLeavePlan: ', response.data.data?.leavePlan);

  return response.data.data?.leavePlan;
};

export const getLeavePlanByID = async (id: number) => {
  const response = await axiosInstance.get<
    WebResponse<{ leavePlan: LeavePlan }>
  >(`${URL_GROUP}/${id}`, { headers: authorization() });

  // console.log('getLeavePlanByID: ', response.data.data?.leavePlan);

  return response.data.data?.leavePlan;
};

export const getLeavePlanFileByID = async (
  folder: string,
  fileName: string
) => {
  const headers = {
    ...authorization(),
    'Content-Type': 'application/pdf',
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

export const downloadLeavePlanFile = async (
  folder: string,
  fileName: string
) => {
  const headers = {
    ...authorization(),
    'Content-Type': 'application/pdf',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    const response = await axiosInstance.get(
      `${URL_GROUP}/get-file-url/${folder}/${fileName}`,
      {
        headers,
        responseType: 'blob',
      }
    );

    const fileNameFromResponse = getFileNameFromResponse(response); // Mengambil nama file dari respons headers
    saveAs(response.data, fileNameFromResponse); // Menyimpan file menggunakan file-saver
  } catch (error) {
    console.error('Error downloading file:', error);
    // Handle error, misalnya dengan menampilkan pesan kepada pengguna
  }
};

export const approveLeavePlan = async (id: number) => {
  const response = await axiosInstance.patch<
    WebResponse<{ leavePlan: LeavePlan }>
  >(`${URL_GROUP}/approve/${id}`, undefined, {
    headers: {
      ...authorization(),
      'Access-Control-Allow-Origin': '*',
    },
  });

  // console.log(`approveLeavePlan: `, response.data.data?.leavePlan);

  return response.data.data?.leavePlan;
};

export const editLeavePlan = async (
  id: number,
  empID: string,
  payload: Partial<CreateLeavePlanRequest>
) => {
  const formData = new FormData();
  if (payload.startDate) {
    formData.append('startDate', payload.startDate);
  }

  if (payload.endDate) {
    formData.append('endDate', payload.endDate);
  }

  if (payload.leaveStatusID) {
    formData.append('leaveStatusID', payload.leaveStatusID.toString());
  }

  if (payload.formCuti) {
    formData.append('formCuti', payload.formCuti, payload.formCuti.name);
  }

  const headers = {
    ...authorization(),
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
  };

  const response = await axiosInstance.patch<
    WebResponse<{ leavePlan: LeavePlan }>
  >(`${URL_GROUP}/update/${id}/${empID}`, payload, { headers });

  // console.log('editLeavePlan: ', response.data.data?.leavePlan);

  return response.data.data?.leavePlan;
};

export const deleteLeavePlan = async (id: number) => {
  const response = await axiosInstance.delete<
    WebResponse<{ leavePlan: LeavePlan }>
  >(`${URL_GROUP}/remove/${id}`, {
    headers: {
      ...authorization(),
      'Access-Control-Allow-Origin': '*',
    },
  });

  // console.log('deleteCalendarHoliday: ', response);

  return response.data.data?.leavePlan;
};
