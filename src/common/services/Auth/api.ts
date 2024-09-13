import { jwtDecode } from 'jwt-decode';
import { axiosInstance } from '../../axios';
import { WebResponse } from '../../types/WebResponse';
import { JWTPayload, User } from './types';

export const loginUser = async (id: string, password: string) => {
  const response = await axiosInstance.post<WebResponse<{ token: string }>>(
    '/login',
    {
      id: id,
      password: password,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  );

  if (response.data.data?.token) {
    const decodedToken = jwtDecode<JWTPayload>(response.data.data?.token);

    const user: User = {
      token: response.data.data.token,
      role: decodedToken.roleID,
    };

    localStorage.setItem('user', JSON.stringify(user));

    return user;
  }

  throw new Error('login failed');
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');

  // console.log(userStr);

  if (userStr) {
    return JSON.parse(userStr) as User;
  }

  return null;
};

export const logout = () => {
  localStorage.removeItem('user');
};
