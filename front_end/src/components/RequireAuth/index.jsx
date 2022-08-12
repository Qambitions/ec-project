import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";

const RequireAuth = ({ allowedRoles }) => {
  const authContext = useContext(AuthContext);
  const location = useLocation();
  return authContext.auth?.roles?.find((role) =>
    allowedRoles?.includes(role)
  ) ? (
    <Outlet />
  ) : authContext.auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/user/dang-nhap" state={{ from: location }} replace />
  );
};

export default RequireAuth;
