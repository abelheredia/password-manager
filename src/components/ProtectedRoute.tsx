import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks';

export const ProtectedRoute = () => {
  const { profile } = useAuth();

  if (!profile.token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
