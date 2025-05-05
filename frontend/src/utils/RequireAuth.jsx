
// import { Navigate, Outlet } from 'react-router-dom';

// const RequireAuth = ({ allowedRoles }) => {
//   const token = localStorage.getItem('token');
//   const role = localStorage.getItem('role');

//   if (!token) return <Navigate to="/" />;
//   if (!allowedRoles.includes(role)) return <Navigate to="/user-home" />;

//   return <Outlet />;
// };

// export default RequireAuth;

import { Navigate, Outlet, useLocation } from 'react-router-dom';

const roleHomeRoutes = {
  user: '/user-home',
  service_provider: '/service-provider-home',
  admin: '/admin-home'
};

const RequireAuth = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Admin can go anywhere
    if (role === 'admin') return <Outlet />;

    // Redirect other roles to their correct home
    return <Navigate to={roleHomeRoutes[role] || '/'} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
