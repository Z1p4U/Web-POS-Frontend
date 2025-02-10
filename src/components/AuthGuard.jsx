import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useUserProfile from "../redux/hooks/user/useUserProfile";
import { useEffect } from "react";

const AuthGuard = ({ children }) => {
  const { isAdmin } = useUserProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate(-1);
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null; // Prevent rendering anything if user is redirected
  }

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
