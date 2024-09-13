import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './home-page/HomePage.tsx';
// import ErrorPage from './components/common/error-page/ErrorPage.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import EmployeePage from './auth/employee-page/EmployeePage.tsx';
import { queryClient } from './common/query-client.ts';
import LeavePlanPage from './auth/leaveplan-page/LeavePlanPage.tsx';
import ProtectedRoute from './components/auth/ProtectedRoute.tsx';
import { AuthProvider } from './common/services/Auth/AuthContext.tsx';
import RosterPage from './roster-page/RosterPage.tsx';
import SettingsPage from './auth/settings-page/SettingsPage.tsx';
import ProtectedRouteSupt from './components/ProtectedRouteSupt.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    // errorElement: <ErrorPage />,
  },
  {
    path: '/roster-calendar',
    element: <RosterPage />,
  },
  {
    path: '/employees',
    element: (
      <ProtectedRoute
        element={<ProtectedRouteSupt element={<EmployeePage />} />}
      />
    ),
  },
  {
    path: '/leave-plans',
    element: <ProtectedRoute element={<LeavePlanPage />} />,
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute
        element={<ProtectedRouteSupt element={<SettingsPage />} />}
      />
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
