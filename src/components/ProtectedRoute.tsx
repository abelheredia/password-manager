import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks';

export const ProtectedRoute = () => {
  const { profile } = useAuth();

  if (!profile.username || profile.exp < Date.now() / 1000) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
