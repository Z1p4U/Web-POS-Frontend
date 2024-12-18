import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { login, logout, register } from "../../services/auth/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  //   const isAuthenticated = true;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogin = useCallback(
    async (email, password) => {
      try {
        const response = await dispatch(login({ email, password })).unwrap();
        // console.log("Auth Response", response);
        return response;
      } catch (error) {
        console.error("Failed to login:", error);
        throw error.message;
      }
    },
    [dispatch]
  );

  const handleRegister = useCallback(
    async (
      name,
      role,
      username,
      password,
      selfRegister,
      primaryPhone,
      email,
      addressType
    ) => {
      try {
        const response = await dispatch(
          register({
            name,
            role,
            username,
            password,
            selfRegister,
            primaryPhone,
            email,
            addressType,
          })
        ).unwrap();
        return response;
      } catch (error) {
        console.error("Failed to register:", error);
      }
    },
    [dispatch]
  );

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logout(token)).unwrap();
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  }, [dispatch, token]);

  return {
    token,
    isAuthenticated,
    register: handleRegister,
    login: handleLogin,
    logout: handleLogout,
  };
};

export default useAuth;
