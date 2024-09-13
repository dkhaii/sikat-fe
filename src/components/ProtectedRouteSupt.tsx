import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../common/services/Auth/AuthContext';

type ProtectedRouteProps = {
  element: React.ReactElement;
};

const ProtectedRouteSupt = ({ element }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user?.role === 1) {
    return element;
  }

  return <Navigate to={'/'} state={{ from: location }} replace />;
};

export default ProtectedRouteSupt;
