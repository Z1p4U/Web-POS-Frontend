import { shallowEqual, useDispatch, useSelector } from "react-redux";
import useAuth from "../auth/useAuth";
import { useEffect } from "react";
import { clearUserData, ownProfile } from "../../services/user/userSlice";

const useUserProfile = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();

  const profile = useSelector((state) => state.user?.ownProfile, shallowEqual);
  const isAdmin = useSelector((state) => state.user?.isAdmin);

  useEffect(() => {
    if (token) {
      dispatch(ownProfile(token));
    } else {
      dispatch(clearUserData());
    }
  }, [token, dispatch]);

  return { profile, isAdmin };
};

export default useUserProfile;
