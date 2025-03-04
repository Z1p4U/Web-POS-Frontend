import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAuth from "../auth/useAuth";
import {
  clearPhotoData,
  fetchPhotoList,
  insertImage,
  photoCreate,
  photoDelete,
} from "../../services/media/mediaSlice";

const useMedia = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const [pagination, setPagination] = useState({ page: 1, per_page: 10 });

  const selectPhotos = useMemo(() => (state) => state.media, []);
  const photoResponse = useSelector(selectPhotos, shallowEqual);

  const photos = photoResponse?.photos;
  const pageCount = photoResponse?.lastPage;
  const totalRecord = photoResponse?.totalRecord;

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
        const response = await dispatch(photoCreate({ photos, token }));
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
        const response = await dispatch(photoDelete({ id, token }));
        return response?.payload?.message;
      } catch (error) {
        console.error("Failed to delete photos:", error);
      }
    },
    [dispatch, token]
  );

  const handleImageInsert = useCallback(
    (path, modalOpen, editModalOpen, selectedImage) => {
      dispatch(insertImage({ path, modalOpen, editModalOpen, selectedImage }));
    },
    [dispatch]
  );

  const handlePaginate = (e, value) => {
    setPagination({ page: value, per_page: 10 });
  };

  return {
    photos,
    pageCount,
    pagination,
    totalRecord,
    setPagination,
    handlePaginate,
    handleCreatePhoto,
    handleDeletePhoto,
    handleImageInsert,
  };
};

export default useMedia;
