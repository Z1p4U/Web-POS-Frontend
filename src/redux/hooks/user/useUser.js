import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAuth from "../auth/useAuth";
import {
  clearUserData,
  userList,
  userRegister,
  userProfile,
  editProfile,
  editUserProfile,
  ownProfile,
} from "../../services/user/userSlice";

const useUser = ({ page, per_page, noPagination = false } = {}) => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const [search, setSearch] = useState("");

  // Use granular selectors to avoid unnecessary re-renders
  const users = useSelector((state) => state.user?.users, shallowEqual);
  const userProfileData = useSelector(
    (state) => state.user?.userProfile,
    shallowEqual
  );
  const pageCount = useSelector((state) => state.user?.lastPage);
  const totalRecord = useSelector((state) => state.user?.totalRecord);

  useEffect(() => {
    if (token) {
      const pagination = noPagination ? undefined : { page, per_page };
      dispatch(userList({ token, pagination, search }));
      dispatch(ownProfile(token));
    } else {
      dispatch(clearUserData());
    }
  }, [token, page, per_page, noPagination, dispatch, search]);

  const handleRegisterUser = useCallback(
    async (userData) => {
      try {
        const response = await dispatch(userRegister({ userData, token }));
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to register user:", error);
      }
    },
    [dispatch, token]
  );

  const handleEditUserProfile = useCallback(
    async (id, userData) => {
      try {
        const response = await dispatch(
          editUserProfile({ id, userData, token })
        );
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to edit user profile:", error);
      }
    },
    [dispatch, token]
  );

  const handleEditProfile = useCallback(
    async (userData) => {
      try {
        const response = await dispatch(editProfile({ userData, token }));
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to edit profile:", error);
      }
    },
    [dispatch, token]
  );

  const handleFetchUserProfile = useCallback(
    async (id) => {
      try {
        const response = await dispatch(userProfile({ token, id }));
        return response?.payload;
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    },
    [dispatch, token]
  );

  const refetchUsers = useCallback(() => {
    if (token) {
      const pagination = noPagination ? undefined : { page, per_page };
      dispatch(userList({ token, pagination, search }));
    }
  }, [dispatch, token, search, page, per_page, noPagination]);

  const userData = useMemo(
    () => ({
      users,
      userProfileData,
      pageCount,
      totalRecord,
    }),
    [users, userProfileData, pageCount, totalRecord]
  );

  return {
    ...userData,
    search,
    setSearch,
    refetchUsers,
    handleRegisterUser,
    handleEditUserProfile,
    handleEditProfile,
    handleFetchUserProfile,
  };
};

export default useUser;
