import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../api/authContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, token } = useAuth(); // assuming token is also stored
  const location = useLocation();

  const pathRole = location.pathname.split('/')[1]; // e.g., 'students' or 'admins'

  // ❗ Extract role from pathname if user object has no role
  const userRole = pathRole === 'students' ? 'students' : 'admins';

  // Redirect if not logged in
  if (!user || !token) {
    const loginPath = `/${pathRole}/login`;
    return <Navigate to={loginPath} replace />;
  }

  // Check if current path role matches allowedRoles
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  // ✅ Access allowed
  return children;
};

export default ProtectedRoute;
