import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authMessages } from '../constants/authMessages';

export default function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();
  if (loading) return <p>{authMessages.checkingSession}</p>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
