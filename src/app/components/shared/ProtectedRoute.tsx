import { Navigate } from 'react-router';
import { useAuth } from '../../../context/AuthContext';
import type { UserType } from '../../../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserType;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, userType } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/candidate/login" replace />;
  }

  if (requiredRole && userType !== requiredRole) {
    const redirect = userType === 'RECRUITER' ? '/recruiter/dashboard' : '/candidate/matches';
    return <Navigate to={redirect} replace />;
  }

  return <>{children}</>;
}
