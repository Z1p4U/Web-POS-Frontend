import { BiTrash } from "react-icons/bi";
import Loader from "../ui/loader/Loader";
import PropTypes from "prop-types";
import { Pagination } from "@mui/material";

const MediaList = ({
  photos,
  pagination,
  handlePaginate,
  pageCount,
  handleDelete,
}) => {
  return (
    <>
      {photos?.length == 0 ? (
        <div className=" h-1/2 flex justify-center items-center">
          <h1 className=" text-primary text-lg lg:text-2xl font-bold">
            Please Upload A Photo!
          </h1>
        </div>
      ) : (
        <div className=" my-20 ">
          {!photos ? (
            <div className=" my-10 h-1/2">
              <Loader />
            </div>
          ) : (
            <div className=" mb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {photos?.map((image) => {
                return (
                  <div
                    key={image?.id}
                    className="img_div w-[120px] md:w-[140px] lg:w-[180px] xl:w-[200px] rounded-md hover:opacity-80 duration-300 cursor-pointer aspect-square mx-auto"
                  >
                    <img
                      src={image?.url}
                      className=" w-full h-full rounded-md object-cover"
                    />
                    <div className="img_icon flex gap-2">
                      <div
                        onClick={() => handleDelete(image?.id)}
                        className="h-8 w-10 flex justify-center items-center bg-primary rounded-md"
                      >
                        <BiTrash className=" max-sm:text-[14px] text-[18px] text-white hover:text-red-500" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className=" flex justify-end pr-10">
            <Pagination
              count={pageCount}
              shape="rounded"
              size="large"
              page={pagination.first}
              onChange={handlePaginate}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MediaList;

MediaList.propTypes = {
  photos: PropTypes.any.isRequired,
  pagination: PropTypes.any,
  pageCount: PropTypes.any,
  handlePaginate: PropTypes.any,
  handleDelete: PropTypes.any,
};
