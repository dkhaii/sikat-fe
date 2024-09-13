import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../common/services/Auth/AuthContext';

type ProtectedRouteProps = {
  element: React.ReactElement;
};

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={'/'} state={{ from: location }} replace />;
  }

  return element;
};

export default ProtectedRoute;
