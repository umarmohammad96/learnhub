import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useStore } from '../context/LearnHubContext.jsx';

export default function ProtectedRoute() {
  const { user } = useStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
