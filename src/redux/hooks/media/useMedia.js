import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAuth from "../auth/useAuth";
import {
  clearPhotoData,
  fetchPhotoList,
  photoCreate,
  photoDelete,
} from "../../services/media/mediaSlice";

const useMedia = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const [pagination, setPagination] = useState({ page: 1, per_page: 10 });

  const selectPhotos = useMemo(() => (state) => state?.media, []);

  const photoResponse = useSelector(selectPhotos, shallowEqual); // Ensures that it only triggers re-renders if the reference changes

  const photos = photoResponse?.photos;
  const pageCount = photoResponse?.lastPage;

  useEffect(() => {
    if (token) {
      dispatch(fetchPhotoList({ token, pagination }));
    } else {
      dispatch(clearPhotoData());
    }
  }, [token, pagination, dispatch]);

  const handleCreatePhoto = useCallback(
    async (photos) => {
      try {
        const response = await dispatch(
          photoCreate({
            photos,
            token,
          })
        );
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to add photos:", error);
      }
    },
    [dispatch, token]
  );

  const handleDeletePhoto = useCallback(
    async (id) => {
      try {
        const response = await dispatch(
          photoDelete({
            id,
            token,
          })
        );
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to delete photos:", error);
      }
    },
    [dispatch, token]
  );
  return {
    photos,
    handleCreatePhoto,
    handleDeletePhoto,
    pagination,
    setPagination,
    pageCount,
  };
};

export default useMedia;
