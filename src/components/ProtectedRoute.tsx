import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Spin } from 'antd';

export const ProtectedRoute = () => {
  const { profile, isInitializing, handleLogout } = useAuth();
  const location = useLocation();

  if (isInitializing) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '100vh',
          alignItems: 'center'
        }}
      >
        <Spin size="large" tip="Cargando sesión..." />
      </div>
    );
  }

  const isExpired = profile.user?.exp
    ? profile.user.exp * 1000 < Date.now()
    : true;

  if (!profile.token || isExpired) {
    handleLogout();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
