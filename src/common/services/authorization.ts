import { User } from './Auth/types';

export const authorization = () => {
  const userStr = localStorage.getItem('user');

  if (userStr) {
    const user: User = JSON.parse(userStr);

    if (user && user.token) {
      return {
        Authorization: `Bearer ${user.token}`,
      };
    }

    return {
      Authorization: '',
    };
  }

  return {
    Authorization: '',
  };
};

export const authorizationValue = () => {
  const userStr = localStorage.getItem('user');

  if (userStr) {
    const user: User = JSON.parse(userStr);

    if (user && user.token) {
      return {
        Authorization: `Bearer ${user.token}`,
      };
    }

    return {
      Authorization: '',
    };
  }

  return {
    Authorization: '',
  };
};
