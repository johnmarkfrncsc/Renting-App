import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
};

export default PrivateRoute;
