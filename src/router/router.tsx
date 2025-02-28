import { createBrowserRouter } from 'react-router-dom';

import { App } from '../App';
import { Passwords } from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'passwords',
        element: <Passwords />
      }
    ]
  }
]);
