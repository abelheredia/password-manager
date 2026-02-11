import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Spin } from 'antd';

export const App = () => {
  return (
    <main>
      <Suspense fallback={<Spin size="large" />}>
        <Outlet />
      </Suspense>
    </main>
  );
};
