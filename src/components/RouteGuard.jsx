import { Navigate } from "react-router-dom";
import useAuth from "../redux/hooks/auth/useAuth";
import PropTypes from "prop-types";

const RouteGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ message: "Session Expired" }} />;
  }

  return children;
};

RouteGuard.propTypes = {
  children: PropTypes.object,
};

export default RouteGuard;
