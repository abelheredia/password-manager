import { createBrowserRouter } from 'react-router-dom';

import { App } from '../App';
import { AuthLayout } from '../layouts';
import { Passwords, Login } from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'passwords',
        element: <Passwords />
      },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: '',
            element: <Login />
          }
        ]
      }
    ]
  }
]);
