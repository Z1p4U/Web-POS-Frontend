import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useCallback, useEffect, useMemo } from "react";
import useAuth from "../auth/useAuth";
import {
  showSetting,
  updateSetting,
  clearSettingData,
} from "../../services/setting/settingSlice";

const useSetting = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();

  const selectSetting = useMemo(() => (state) => state?.setting, []);
  const settingResponse = useSelector(selectSetting, shallowEqual);

  const setting = settingResponse?.setting;
  const status = settingResponse?.status;
  const error = settingResponse?.error;

  useEffect(() => {
    if (token) {
      dispatch(showSetting(token));
    } else {
      dispatch(clearSettingData());
    }
  }, [dispatch, token]);

  const handleUpdateSetting = useCallback(
    async (updatedSetting) => {
      try {
        const response = await dispatch(
          updateSetting({
            setting: updatedSetting,
            token,
          })
        );
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to update setting:", error);
        throw error;
      }
    },
    [dispatch, token]
  );

  const refetchSetting = useCallback(() => {
    if (token) {
      dispatch(showSetting(token));
    }
  }, [dispatch, token]);

  return {
    setting,
    status,
    error,
    refetchSetting,
    handleUpdateSetting,
  };
};

export default useSetting;
