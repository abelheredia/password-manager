import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App } from '../App';
import { ROUTES } from '../constants';

const Passwords = lazy(() =>
  import('../pages').then((module) => ({ default: module.Passwords }))
);
const Login = lazy(() =>
  import('../pages').then((module) => ({ default: module.Login }))
);
const Register = lazy(() =>
  import('../pages').then((module) => ({ default: module.Register }))
);
const ForgotPassword = lazy(() =>
  import('../pages').then((module) => ({ default: module.ForgotPassword }))
);
const ProtectedRoute = lazy(() =>
  import('../components').then((module) => ({ default: module.ProtectedRoute }))
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.LOGIN} replace />
      },
      {
        path: ROUTES.LOGIN,
        element: <Login />
      },
      {
        path: ROUTES.REGISTER,
        element: <Register />
      },
      {
        path: ROUTES.FORGOT_PASSWORD,
        element: <ForgotPassword />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'passwords',
            element: <Passwords />
          }
        ]
      }
    ]
  }
]);
